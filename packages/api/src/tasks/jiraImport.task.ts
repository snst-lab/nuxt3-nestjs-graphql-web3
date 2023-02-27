import { Injectable, Logger } from '@nestjs/common';
import { JiraService } from '@/services';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class JiraImportTask {
  private readonly logger = new Logger(JiraImportTask.name);

  constructor(
    private readonly jiraService: JiraService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  // TODO 最終的にスケジューリング設定する
  @Cron('* * * * * *', { name: 'runAtOnce' })
  async importFromJira() {
    console.log(await this.jiraService.fetchBoads());
    console.log(await this.jiraService.fetchSprints(1));
    console.log(await this.jiraService.fetchIssues(1, 5));
    // TODO デバッグのためだけに一度だけで止める
    const job = this.schedulerRegistry.getCronJob('runAtOnce');
    job.stop();
  }
}
