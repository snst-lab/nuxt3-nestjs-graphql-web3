import { Injectable, Logger } from '@nestjs/common';
import { JiraService } from '@/services';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TestTask {
  private readonly logger = new Logger(TestTask.name);

  constructor(
    private readonly jiraService: JiraService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('* * * * * *', { name: 'runAtOnce' })
  async runAtOnce() {
    this.logger.debug('Called when every minutes');
    console.log(await this.jiraService.fetchBoads());
    const job = this.schedulerRegistry.getCronJob('runAtOnce');
    job.stop();
  }
}
