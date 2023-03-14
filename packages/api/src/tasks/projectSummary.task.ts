import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { ContractFundService, PrismaService } from '@/services';
import { Project } from '@generated/project/project.model';
import { Sprint } from '@generated/sprint/sprint.model';
import { ProjectUpdateInput } from '@/@generated/prisma-nestjs-graphql/project/project-update.input';
import { Project_ledger } from '@prisma/client';
import { Project_ledgerCreateInput } from '@/@generated/prisma-nestjs-graphql/project-ledger/project-ledger-create.input';
import { Target } from '@/models';
import { Project_summary_by_sprintUpdateInput } from '@/@generated/prisma-nestjs-graphql/project-summary-by-sprint/project-summary-by-sprint-update.input';
import { Project_summary_by_sprintCreateInput } from '@/@generated/prisma-nestjs-graphql/project-summary-by-sprint/project-summary-by-sprint-create.input';
// import Enumerable from 'linq';
import { Project_detailUpdateInput } from '@/@generated/prisma-nestjs-graphql/project-detail/project-detail-update.input';

// eslint-disable-next-line
const Enumerable = require('linq');

@Injectable()
export class ProjectSummaryTask {
  private readonly logger = new Logger(ProjectSummaryTask.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prisma: PrismaService,
    private readonly contractFundService: ContractFundService,
  ) {}

  // TODO 30秒に1回実行するように修正する
  // @Cron('* * * * * *', { name: 'runAtOnce' })
  @Cron('*/60 * * * * *')
  async runAtOnce() {
    try {
      //プロジェクト、スプリント全件取得
      const projects = await this.prisma.project.findMany(null);
      //今回分の収益を登録
      await this.updateVoter(projects);
      // これまでの履歴を含めて取得しなおす
      const projectLedgers = await this.prisma.project_ledger.findMany(null);
      const sprints = await this.prisma.sprint.findMany(null);
      // 集計のメイン処理
      await this.createProjectSummary(projects, projectLedgers, sprints);
    } catch (error) {
      this.logger.debug(error);
    }

    this.logger.debug('ProjectSummaryTask End');

    // const job = this.schedulerRegistry.getCronJob('runAtOnce');
    // job.stop();
  }

  private async updateVoter(projects: Project[]): Promise<void> {
    // // project 毎に SmartContract 実行してプロジェクト出納履歴に追加する
    for (const project of projects) {
      // const income = await this.contractFundService.harvest(project.project_id);
      // console.log('Income', income);

      // // 単位は使用しないので空にしておく
      // const insertRow: Project_ledgerCreateInput = {
      //   project_id: project.project_id,
      //   target: Target.Token,
      //   unit: '',
      //   income: income >= 0 ? income : 0,
      //   expense: income < 0 ? -income : 0,
      // };

      // const response = await this.prisma.project_ledger.create({
      //   data: insertRow,
      // });

      const response = await this.prisma.project_ledger.findMany({
        where: {
          project_id: project.project_id,
        },
      });
      const sum = response.map((e) => e.income).reduce((a, b) => a + b, 0);

      const existVoter = await this.prisma.voter.findFirst({
        where: {
          project_id: project.project_id,
        },
      });

      if (!existVoter) {
        this.logger.debug(
          `skip update existVoter project_id: ${project.project_id}`,
        );
        continue;
      }
      await this.prisma.voter.update({
        where: {
          id: existVoter.id,
        },
        data: {
          reward: sum,
        },
      });

      this.logger.debug(
        `insert project_ledger project_id: ${project.project_id}`,
      );
    }
  }

  private async createProjectSummary(
    projects: Project[],
    projectLedgers: Project_ledger[],
    sprints: Sprint[],
  ) {
    // HACK 実装スピード優先のため効率悪いlinqは許容

    // プロジェクトのスプリント毎に集計しなおす
    for (const project of projects) {
      // sprint はサービス内で一意(プロジェクトまたいで使用可能)
      const targetSprints = Enumerable.from(sprints)
        .where((x) => x.service_id == project.service_id)
        .toArray();

      // sprint毎に集計する
      for (const targetSprint of targetSprints) {
        if (!(targetSprint.start_date && targetSprint.end_date)) {
          continue;
        }

        const amount = Enumerable.from(projectLedgers)
          .where(
            (x) =>
              x.created_at >= targetSprint.start_date &&
              x.created_at <= targetSprint.end_date &&
              x.project_id == project.project_id,
          )
          .sum((x) => x.income - x.expense);

        // サマリテーブルのupsert
        await this.upsertProjectLedger(
          project.project_id,
          targetSprint.sprint_id,
          amount,
        );
      }

      // プロジェクト毎の累計報酬
      const amount = Enumerable.from(projectLedgers)
        .where((x) => x.project_id === project.project_id)
        .sum((x) => x.income - x.expense);

      await this.updateProjectDetail(project.project_id, amount);
    }
  }

  private async upsertProjectLedger(
    projectId: number,
    sprintId: number,
    amount: number,
  ) {
    const foundSummary = await this.prisma.project_summary_by_sprint.findFirst({
      where: { AND: [{ project_id: projectId }, { sprint_id: sprintId }] },
    });

    // 更新
    if (foundSummary) {
      const updateRow: Project_summary_by_sprintUpdateInput = {
        project_amount: { set: amount },
      };

      await this.prisma.project_summary_by_sprint.update({
        where: {
          index: foundSummary.index,
        },
        data: updateRow,
      });

      this.logger.debug(
        `update project_amount project_id:${projectId} sprint_id:${sprintId}`,
      );

      return;
    }

    // 新規作成
    const insertRow: Project_summary_by_sprintCreateInput = {
      project_id: projectId,
      sprint_id: sprintId,
      project_amount: amount,
    };

    await this.prisma.project_summary_by_sprint.create({ data: insertRow });

    this.logger.debug(
      `insert project_summary project_id: ${projectId}, sprint_id: ${sprintId}`,
    );
  }

  private async updateProjectDetail(projectId: number, amount: number) {
    const foundProjectDetail = await this.prisma.project_detail.findFirst({
      where: { project_id: projectId },
    });

    // 通常は存在しないことはありえないが、発生したらスキップ
    if (!foundProjectDetail) {
      this.logger.debug(`skip update Project_detail project_id: ${projectId}`);
      return;
    }

    const updateProjectDetail: Project_detailUpdateInput = {
      sum_project_amount: { set: amount },
    };

    await this.prisma.project_detail.update({
      where: { index: foundProjectDetail.index },
      data: updateProjectDetail,
    });

    this.logger.debug(`update Project_detail project_id: ${projectId}`);
  }
}
