import { ContractBallotService, PrismaService } from '@/services';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { constants } from '@constants';

const { user, user2 } = constants.web3.accounts;

@Injectable()
export class InitializeTask {
  private readonly logger = new Logger(InitializeTask.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly contractBallotService: ContractBallotService,
  ) {}

  // @Cron('* * * * * *', { name: 'registerVoter' })
  async upsertVoter() {
    const existUser = await this.prisma.voter.findFirst({
      where: {
        evm_address: user.address,
      },
    });
    if (!existUser) {
      await this.prisma.voter.create({
        data: {
          name: 'TQM推進部',
          evm_address: user.address,
          secret: user.secret,
          max_voteable: 50000,
          pending_airdrop: 50000,
        },
      });
    } else {
      await this.prisma.voter.update({
        where: {
          id: existUser.id,
        },
        data: {
          name: 'TQM推進部',
          evm_address: user.address,
          secret: user.secret,
          max_voteable: 50000,
          pending_airdrop: 50000,
        },
      });
    }
    const existUser2 = await this.prisma.voter.findFirst({
      where: {
        evm_address: user2.address,
      },
    });
    if (!existUser2) {
      await this.prisma.voter.create({
        data: {
          name: '事業開発部',
          evm_address: user2.address,
          secret: user2.secret,
          max_voteable: 30000,
          pending_airdrop: 30000,
        },
      });
    } else {
      await this.prisma.voter.update({
        where: {
          id: existUser2.id,
        },
        data: {
          name: '事業開発部',
          evm_address: user2.address,
          secret: user2.secret,
          max_voteable: 30000,
          pending_airdrop: 30000,
        },
      });
    }
    this.logger.debug('Voter migrated');
    const job = this.schedulerRegistry.getCronJob('registerVoter');
    job.stop();
  }
}
