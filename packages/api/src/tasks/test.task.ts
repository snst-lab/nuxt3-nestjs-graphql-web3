import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TestService } from '@/services';

@Injectable()
export class TestTask {
  private readonly logger = new Logger(TestTask.name);

  constructor(private readonly testService: TestService) {}

  @Cron('*/1 * * * *')
  async executeEveryMinutes() {
    this.logger.debug('Called when every minutes');
    console.log(await this.testService.fetch({ payload: '123' }));
  }
}
