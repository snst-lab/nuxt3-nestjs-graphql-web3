import { Injectable, Logger } from '@nestjs/common';
import { JiraService, PrismaService } from '@/services';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { ServiceId, FetchBoadsResponse } from '@/models';
import { ProjectCreateInput } from '@generated/project/project-create.input';
import { Project } from '@generated/project/project.model';
import { Sprint } from '@generated/sprint/sprint.model';
import { SprintCreateInput } from '@generated/sprint/sprint-create.input';
import { SprintUpdateInput } from '@generated/sprint/sprint-update.input';

//// 実装時はこちらのコメントを解除すると、typescriptで実装できる。実行時は下のrequireを使用する
//import Enumerable from 'linq';
// commonjs 3系の場合 import は未対応
// eslint-disable-next-line
const Enumerable = require('linq');

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
    const boads = await this.jiraService.fetchBoads();
    const projects = await this.insertProject(boads);
    const sprints = await this.insertSprints(boads);

    // TODO デバッグのためだけに一度だけで止める
    const job = this.schedulerRegistry.getCronJob('runAtOnce');
    job.stop();
  }

  private async insertProject(boads: FetchBoadsResponse): Promise<Project[]> {
    // boads から project を抽出する
    const projects = Enumerable.from(boads.values)
      .groupBy(
        (x) =>
          JSON.stringify({
            projectId: x.location.projectId,
            name: x.location.displayName,
          }),
        null,
        (key) => {
          return {
            key: JSON.parse(key) as { projectId: number; name: string },
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
        this.logger.debug(`skip project_id:${foundProject.project_id}`);
        projectEntities.push(foundProject);
        continue;
      }

      const insertRow: ProjectCreateInput = {
        service_id: ServiceId.Jira,
        project_code: project.key.projectId,
        name: project.key.name,
      };

      const response = await this.prisma.project.create({
        data: insertRow,
      });

      this.logger.debug(`insert project_id:${response.project_id}`);

      projectEntities.push(response);
    }
    return projectEntities;
  }

  private async insertSprints(boads: FetchBoadsResponse): Promise<Sprint[]> {
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
          this.logger.debug(`update sprint_id:${foundResponse.sprint_id}`);
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

        this.logger.debug(`insert sprint_id:${response.sprint_id}`);
      }
    }

    return sprints;
  }
}
