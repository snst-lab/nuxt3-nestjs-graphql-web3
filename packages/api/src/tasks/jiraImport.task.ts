import { Injectable, Logger } from '@nestjs/common';
import { JiraService, PrismaService } from '@/services';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { ServiceId, FetchBoadsResponse, FetchIssuesResponse } from '@/models';
import { ProjectCreateInput } from '@generated/project/project-create.input';
import { Project } from '@generated/project/project.model';
import { Sprint } from '@generated/sprint/sprint.model';
import { SprintCreateInput } from '@generated/sprint/sprint-create.input';
import { SprintUpdateInput } from '@generated/sprint/sprint-update.input';
import { ProjectUpdateInput } from '@/@generated/prisma-nestjs-graphql/project/project-update.input';
import { IssueCreateInput } from '@generated/issue/issue-create.input';
import { IssueUpdateInput } from '@generated/issue/issue-update.input';
import { Contributor } from '@generated/contributor/contributor.model';
import { ContributorCreateInput } from '@generated/contributor/contributor-create.input';
import { ContributorUpdateInput } from '@generated/contributor/contributor-update.input';

//// 実装時はこちらのコメントを解除すると、typescriptで実装できる。実行時は下のrequireを使用する
// import Enumerable from 'linq';
// commonjs 3系の場合 import は未対応
// eslint-disable-next-line
const Enumerable = require('linq');

const convertNullableNumber = (value: number | null): number | null =>
  value === undefined ? null : value;

@Injectable()
export class JiraImportTask {
  private readonly logger = new Logger(JiraImportTask.name);

  constructor(
    private readonly jiraService: JiraService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prisma: PrismaService,
  ) {}

  // TODO 最終的にスケジューリング設定する
  @Cron('* * * * * *', { name: 'runAtOnce' })
  async importFromJira() {
    try {
      const boads = await this.jiraService.fetchBoads();
      const projects = await this.upsertProject(boads);
      const sprints = await this.upsertSprints(boads);
      await this.upsertIssues(boads, projects, sprints);
    } catch (error) {
      this.logger.debug(error);
    }

    // TODO デバッグのためだけに一度だけで止める
    const job = this.schedulerRegistry.getCronJob('runAtOnce');
    job.stop();
  }

  private async upsertProject(boads: FetchBoadsResponse): Promise<Project[]> {
    // boads から project を抽出する
    const projects = Enumerable.from(boads.values)
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

      if (foundProject) {
        const updateRow: ProjectUpdateInput = {
          name: { set: project.key.name },
          avatar_uri: { set: project.key.avatarURI },
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
      };

      const response = await this.prisma.project.create({
        data: insertRow,
      });

      this.logger.debug(`insert project project_id:${response.project_id}`);

      projectEntities.push(response);
    }
    return projectEntities;
  }

  private async upsertSprints(boads: FetchBoadsResponse): Promise<Sprint[]> {
    const sprints: Sprint[] = [];
    for (const boad of boads.values) {
      const sprintsOnBoad = await this.jiraService.fetchSprints(boad.id);
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
    boads: FetchBoadsResponse,
    projects: Project[],
    sprints: Sprint[],
  ) {
    // Jira から Issue を取得する
    const issuesResponseFromJiraAll: FetchIssuesResponse[] = [];
    for (const boad of boads.values) {
      for (const sprint of sprints) {
        const issuesResponseFromJira = await this.jiraService.fetchIssues(
          boad.id,
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
      const foundIssue = await this.prisma.issue.findFirst({
        where: {
          issue_code: parseInt(issue.id),
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

      // とれないことはないはずだが、とりあえずチェック
      if (!projectId) {
        this.logger.debug(`skip issue issue_code:${issue.id} `);
        continue;
      }

      // update
      if (foundIssue) {
        const updateRow: IssueUpdateInput = {
          contributor_id: { set: convertNullableNumber(contributorId) },
          sprint_id: { set: convertNullableNumber(sprintId) },
          status: { set: issue.fields.status.statusCategory.id },
        };

        const updateResponse = await this.prisma.issue.update({
          where: { issue_id: foundIssue.issue_id },
          data: updateRow,
        });

        this.logger.debug(`update issue issue_id:${updateResponse.issue_id}`);

        continue;
      }

      // insert
      const insertRow: IssueCreateInput = {
        issue_code: parseInt(issue.id),
        project_id: projectId,
        contributor_id: convertNullableNumber(contributorId),
        sprint_id: convertNullableNumber(sprintId),
        status: issue.fields.status.statusCategory.id,
      };

      const insertResponse = await this.prisma.issue.create({
        data: insertRow,
      });

      this.logger.debug(`insert issue issue_id:${insertResponse.issue_id}`);
    }
  }
}
