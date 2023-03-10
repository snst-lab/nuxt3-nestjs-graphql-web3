import { ContractBallotService, PrismaService } from '@/services';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { constants } from '@constants';

@Injectable()
export class VoterTask {
  private readonly logger = new Logger(VoterTask.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly contractBallotService: ContractBallotService,
  ) {}

  @Cron('*/10 * * * * *', { name: 'update voter' })
  async updataVoter() {
    const voters = await this.prisma.voter.findMany();
    voters.forEach(async (e) => {
      const token_balance = await this.contractBallotService.getTokenBalance(
        e.evm_address,
      );
      const pending_reconcile =
        await this.contractBallotService.getPendingReconcile(e.evm_address);
      await this.prisma.voter.update({
        where: {
          id: e.id,
        },
        data: {
          token_balance,
          pending_reconcile,
        },
      });
    });
    this.logger.debug('Voter updated');
  }
}
