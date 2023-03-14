import { Injectable, Logger } from '@nestjs/common';
import {
  ContractBallotService,
  JiraService,
  PrismaService,
  VoterService,
} from '@/services';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import {
  ServiceId,
  FetchBoardsResponse,
  FetchIssuesResponse,
  TicketStatus,
} from '@/models';
import { ProjectCreateInput } from '@generated/project/project-create.input';
import { Project } from '@generated/project/project.model';
import { Project_detail } from '@generated/project-detail/project-detail.model';
import { Sprint } from '@generated/sprint/sprint.model';
import { SprintCreateInput } from '@generated/sprint/sprint-create.input';
import { SprintUpdateInput } from '@generated/sprint/sprint-update.input';
import { ProjectUpdateInput } from '@/@generated/prisma-nestjs-graphql/project/project-update.input';
import { Project_detailCreateInput } from '@/@generated/prisma-nestjs-graphql/project-detail/project-detail-create.input';
import { TicketCreateInput } from '@generated/ticket/ticket-create.input';
import { TicketUpdateInput } from '@generated/ticket/ticket-update.input';
import { Contributor } from '@generated/contributor/contributor.model';
import { ContributorCreateInput } from '@generated/contributor/contributor-create.input';
import { ContributorUpdateInput } from '@generated/contributor/contributor-update.input';
import { constants } from '@constants';
//// 実装時はこちらのコメントを解除すると、typescriptで実装できる。実行時は下のrequireを使用する
// import Enumerable from 'linq';
import { Project_detailUpdateInput } from '@/@generated/prisma-nestjs-graphql/project-detail/project-detail-update.input';
// commonjs 3系の場合 import は未対応
// eslint-disable-next-line
const Enumerable = require('linq');

const convertNullableNumber = (value: number | null): number | null =>
  value === undefined ? null : value;

const convertTicketStatus = (value: number | null): number => {
  switch (value) {
    case 3:
      return TicketStatus.TaskCompleted;
    default:
      return TicketStatus.Working;
  }
};

@Injectable()
export class JiraImportTask {
  private readonly logger = new Logger(JiraImportTask.name);

  constructor(
    private readonly jiraService: JiraService,
    private readonly contractBallotService: ContractBallotService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prisma: PrismaService,
    private readonly voterService: VoterService,
  ) {}

  // TODO 最終的にスケジューリング設定する
  @Cron('*/60 * * * * *', { name: 'runAtOnce' })
  // @Cron('* */60 * * * *')
  async importFromJira() {
    try {
      const boards = await this.jiraService.fetchBoards();
      const projects = await this.upsertProject(boards);
      await this.upsertProjectDetails(projects);
      const sprints = await this.upsertSprints(boards);
      await this.upsertIssues(boards, projects, sprints);
      await this.voterService.updateVoters();
      await this.updateProjectEtc();
    } catch (error) {
      this.logger.debug(error);
    }

    // TODO デバッグのためだけに一度だけで止める
    const job = this.schedulerRegistry.getCronJob('runAtOnce');
    job.stop();
  }

  private async upsertProject(boards: FetchBoardsResponse): Promise<Project[]> {
    // boards から project を抽出する
    const projects = Enumerable.from(boards.values)
      .groupBy(
        (x) =>
          JSON.stringify({
            projectId: x.location.projectId,
            name: x.location.displayName,
            avatarURI: x.location.avatarURI,
          }),
        null,
        (key) => {
          return {
            key: JSON.parse(key) as {
              projectId: number;
              name: string;
              avatarURI: string;
            },
          };
        },
      )
      .toArray();

    // project_id 採番済みのデータを戻り値として返すために変数設定
    const projectEntities = [];
    // project テーブルに存在しない場合にInsertする
    for (const project of projects) {
      const foundProject = await this.prisma.project.findFirst({
        where: {
          AND: [
            { service_id: ServiceId.Jira },
            { project_code: project.key.projectId },
          ],
        },
      });

      const projectSample = constants.api.projectSample.filter(
        (x) => x.project_code === project.key.projectId,
      )[0];

      if (foundProject) {
        const updateRow: ProjectUpdateInput = {
          name: { set: project.key.name },
          avatar_uri: { set: project.key.avatarURI },
          contributor_count: { set: 0 },
          description: {
            set: projectSample.description,
          },
        };

        const updateResponse = await this.prisma.project.update({
          where: {
            project_id: foundProject.project_id,
          },
          data: updateRow,
        });
        this.logger.debug(
          `update project project_id:${updateResponse.project_id}`,
        );
        projectEntities.push(updateResponse);
        continue;
      }

      const insertRow: ProjectCreateInput = {
        service_id: ServiceId.Jira,
        project_code: project.key.projectId,
        name: project.key.name,
        avatar_uri: project.key.avatarURI,
        contributor_count: 0,
        description: projectSample.description,
      };

      const response = await this.prisma.project.create({
        data: insertRow,
      });

      this.logger.debug(`insert project project_id:${response.project_id}`);

      projectEntities.push(response);
    }
    return projectEntities;
  }

  private async upsertProjectDetails(
    projects: Project[],
  ): Promise<Project_detail[]> {
    // project テーブルから初期レコードを追加する

    const details: Project_detail[] = [];
    for (const project of projects) {
      const foundProjectDetail = await this.prisma.project_detail.findFirst({
        where: { project_id: project.project_id },
      });

      // 初期値でインサートするだけなので存在した場合は何もしない
      if (foundProjectDetail) {
        this.logger.debug(
          `skip project_detail project_id:${project.project_id}`,
        );

        continue;
      }

      const insertRow: Project_detailCreateInput = {
        project_id: project.project_id,
        service_id: project.service_id,
        project_code: project.project_code,
      };

      const response = await this.prisma.project_detail.create({
        data: insertRow,
      });

      this.logger.debug(
        `insert project_detail project_id:${insertRow.project_id}`,
      );

      details.push(response);

      return details;
    }
  }

  private async upsertSprints(boards: FetchBoardsResponse): Promise<Sprint[]> {
    const sprints: Sprint[] = [];
    for (const board of boards.values) {
      const sprintsOnBoad = await this.jiraService.fetchSprints(board.id);
      for (const sp of sprintsOnBoad.values) {
        const foundResponse = await this.prisma.sprint.findFirst({
          where: {
            AND: [{ service_id: ServiceId.Jira }, { sprint_code: sp.id }],
          },
        });

        if (foundResponse) {
          const updateRow: SprintUpdateInput = {
            sprint_name: { set: sp.name },
            start_date: { set: !sp.startDate ? null : sp.startDate },
            end_date: { set: !sp.endDate ? null : sp.endDate },
          };
          const updateResponse = await this.prisma.sprint.update({
            where: { sprint_id: foundResponse.sprint_id },
            data: updateRow,
          });

          sprints.push(updateResponse);
          this.logger.debug(
            `update sprint sprint_id:${foundResponse.sprint_id}`,
          );
          continue;
        }

        const insertRow: SprintCreateInput = {
          sprint_code: sp.id,
          sprint_name: sp.name,
          start_date: sp.startDate,
          end_date: sp.endDate,
          service_id: ServiceId.Jira,
        };

        const response = await this.prisma.sprint.create({ data: insertRow });
        sprints.push(response);

        this.logger.debug(`insert sprint sprint_id:${response.sprint_id}`);
      }
    }

    return sprints;
  }

  private async upsertIssues(
    boards: FetchBoardsResponse,
    projects: Project[],
    sprints: Sprint[],
  ) {
    // Jira から Issue を取得する
    const issuesResponseFromJiraAll: FetchIssuesResponse[] = [];
    for (const board of boards.values) {
      for (const sprint of sprints) {
        const issuesResponseFromJira = await this.jiraService.fetchIssues(
          board.id,
          sprint.sprint_code,
        );

        // 存在しない可能性があるので、その場合はスキップ
        if (!issuesResponseFromJira) {
          continue;
        }

        issuesResponseFromJiraAll.push(issuesResponseFromJira);
      }
    }

    // Issue を一つのリストにまとめなおす
    const issuesFromJira = Enumerable.from(issuesResponseFromJiraAll)
      .selectMany((x) => x.issues)
      .toArray();

    // 先に contributor から upsert しないと issue の contributor_id が確定しない
    // 未割当は無視して、accountIdでグループ化
    const contributorsFromJira = Enumerable.from(issuesFromJira)
      .where((x) => x.fields.assignee?.accountId !== null)
      .select((x) => {
        return {
          accountId: x.fields.assignee?.accountId,
          displayName: x.fields.assignee?.displayName,
          projectCode: x.fields.project.id,
        };
      })
      .groupBy(
        (x) => JSON.stringify(x),
        null,
        (key) => key,
      )
      .select(
        (x) =>
          JSON.parse(x) as {
            accountId: string;
            displayName: string;
            projectCode: number;
          },
      )
      .toArray();

    const contributors: Contributor[] = [];
    for (const contributorFromJira of contributorsFromJira) {
      const foundContributor = await this.prisma.contributor.findFirst({
        where: {
          contributor_code: contributorFromJira.accountId,
        },
      });

      const projectId = Enumerable.from(projects)
        .where((x) => x.project_code == contributorFromJira.projectCode)
        .select((x) => x.project_id)
        .firstOrDefault();

      // projectId は必ず取得できるはずだが念のためチェックしてスキップ
      if (!projectId) {
        this.logger.debug(
          `skip contributor contributor_code:${contributorFromJira.accountId}`,
        );
        continue;
      }

      // update
      if (foundContributor) {
        // 更新すべき項目がnullの場合は更新しない
        if (!contributorFromJira.displayName) {
          this.logger.debug(
            `skip contributor contributor_id:${contributorFromJira}`,
          );
          continue;
        }

        const updateRow: ContributorUpdateInput = {
          contributor_name: {
            set: contributorFromJira.displayName,
          },
        };

        const updateResponse = await this.prisma.contributor.update({
          where: {
            contributor_id: foundContributor.contributor_id,
          },
          data: updateRow,
        });

        this.logger.debug(
          `update contributor contributor_id:${updateResponse.contributor_id}`,
        );

        contributors.push(updateResponse);

        continue;
      }

      // insert
      const insertRow: ContributorCreateInput = {
        contributor_code: contributorFromJira.accountId,
        contributor_name: contributorFromJira.displayName,
        project_id: projectId,
      };

      const insertResponse = await this.prisma.contributor.create({
        data: insertRow,
      });

      this.logger.debug(
        `insert contributor contributor_id:${insertResponse.contributor_id}`,
      );

      contributors.push(insertResponse);
    }

    // project, contributor と紐づけながら issue upsert
    for (const issue of issuesFromJira) {
      const foundTickets = await this.prisma.ticket.findFirst({
        where: {
          ticket_code: parseInt(issue.id),
        },
      });

      // 外部キーの取得
      const projectId = Enumerable.from(projects)
        .where((x) => x.project_code === parseInt(issue.fields.project.id))
        .select((x) => x.project_id)
        .firstOrDefault();

      const contributorId = Enumerable.from(contributors)
        .where((x) => x.contributor_code === issue.fields.assignee?.accountId)
        .select((x) => x.contributor_id)
        .firstOrDefault();

      const sprintId = Enumerable.from(sprints)
        .where((x) => x.sprint_code == issue.fields.sprint?.id)
        .select((x) => x.sprint_id)
        .firstOrDefault();

      // タイミングによってはプロジェクトIDがとれないのでチェック
      if (!projectId) {
        this.logger.debug(`skip issue issue_code:${issue.id} `);
        continue;
      }

      // update
      if (foundTickets) {
        const updateRow: TicketUpdateInput = {
          contributor_id: { set: convertNullableNumber(contributorId) },
          sprint_id: { set: convertNullableNumber(sprintId) },
          status: {
            set: convertTicketStatus(issue.fields.status.statusCategory.id),
          },
        };

        const updateResponse = await this.prisma.ticket.update({
          where: { ticket_id: foundTickets.ticket_id },
          data: updateRow,
        });

        this.logger.debug(
          `update ticket ticket_id:${updateResponse.ticket_id}`,
        );

        continue;
      }

      // insert
      const insertRow: TicketCreateInput = {
        ticket_code: parseInt(issue.id),
        project_id: projectId,
        contributor_id: convertNullableNumber(contributorId),
        sprint_id: convertNullableNumber(sprintId),
        status: issue.fields.status.statusCategory.id,
      };

      const insertResponse = await this.prisma.ticket.create({
        data: insertRow,
      });

      this.logger.debug(`insert ticket ticket_id:${insertResponse.ticket_id}`);
    }
  }

  private async updateProjectEtc() {
    const projects = await this.prisma.project.findMany(null);
    const tickets = await this.prisma.ticket.findMany(null);

    for (const project of projects) {
      const ticketsByProject = Enumerable.from(tickets)
        .where((x) => x.project_id == project.project_id)
        .toArray();

      // 貢献者数の計算
      const contributorCount = Enumerable.from(ticketsByProject)
        .distinct((x) => x.contributor_id)
        .count();

      const updateProjectRow: ProjectUpdateInput = {
        contributor_count: { set: contributorCount },
      };

      await this.prisma.project.update({
        where: {
          project_id: project.project_id,
        },
        data: updateProjectRow,
      });

      // プロジェクト詳細のチケット数
      const closedCount = Enumerable.from(ticketsByProject).count(
        (x) => x.status !== TicketStatus.Working,
      );
      const updateProjectDetail: Project_detailUpdateInput = {
        ticket_count_total: { set: ticketsByProject.length },
        ticket_count_closed: { set: closedCount },
      };

      const foundProjectDetail = await this.prisma.project_detail.findFirst({
        where: {
          project_id: project.project_id,
        },
      });

      // 必ず存在するはずだが、存在しない場合はスキップ
      if (!foundProjectDetail) {
        this.logger.debug(
          `skip update Project_detail project_id: ${project.project_id}`,
        );
        continue;
      }

      await this.prisma.project_detail.update({
        where: {
          index: foundProjectDetail.index,
        },
        data: updateProjectDetail,
      });
    }
  }
}
