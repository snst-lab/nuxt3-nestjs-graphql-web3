import { Injectable, UseGuards } from '@nestjs/common';
import { parseUnits, isAddress } from 'ethers/lib/utils';
import { constants } from '@constants';
import { runtimeTools } from '@tools/runtime';
import { PrismaService } from '.';
import { EtherAdminGuard, EtherUserGuard } from '@/guards';

const { gasLimit } = constants.web3.number;
const { toNumber, useContract, useToken } = runtimeTools.web3;

const ballot = useContract('Ballot');
const ballotToken = useToken('Token');

@Injectable()
export class ContractBallotService {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(EtherAdminGuard)
  async airdrop(voterAddress: string, _amount: number) {
    if (isAddress(voterAddress) && _amount > 0) {
      const amount = parseUnits(_amount.toString(), ballotToken().decimals);
      await ballotToken('admin').abi.approve(ballot().address, amount);
      await ballotToken('admin').abi.transfer(voterAddress, amount, {
        gasLimit,
      });
    }
  }

  @UseGuards(EtherUserGuard)
  async vote(voterAddress: string, projectId: number, _amount: number) {
    if (isAddress(voterAddress) && _amount > 0) {
      const amount = parseUnits(_amount.toString(), ballotToken().decimals);
      await ballotToken(voterAddress).abi.approve(ballot().address, amount);
      await ballot(voterAddress).abi.vote(projectId, amount, {
        gasLimit,
      });
      const data = await this.prisma.voter.findFirst({
        where: {
          project_id: projectId,
        },
      });
      await this.prisma.voter.update({
        where: {
          id: data?.id ?? 0,
        },
        data: {
          pending_airdrop: data?.pending_airdrop + _amount,
        },
      });
      const project = await this.prisma.project.findFirst({
        where: {
          project_id: projectId,
        },
      });
      await this.prisma.project.update({
        where: {
          project_id: projectId,
        },
        data: {
          voted_amount: project.voted_amount + _amount,
        },
      });
    }
  }

  @UseGuards(EtherUserGuard)
  async unvote(voterAddress: string, projectId: number, _amount: number) {
    if (isAddress(voterAddress) && _amount > 0) {
      const amount = parseUnits(_amount.toString(), ballotToken().decimals);
      await ballot(voterAddress).abi.unvote(projectId, amount, {
        gasLimit,
      });
    }
  }

  async getTokenBalance(voterAddress: string): Promise<number> {
    if (isAddress(voterAddress)) {
      const amount = await ballotToken(voterAddress).abi.balanceOf(
        voterAddress,
      );
      return Number(amount.toString()) / 10 ** ballotToken().decimals;
    }
    return 0;
  }

  async getVotedAmountByProjectId(projectId: number): Promise<number> {
    if (projectId == 0) {
      return 0;
    }
    const amount = await ballot().abi.getVotedAmountByProjectId(projectId);
    return Number(amount.toString()) / 10 ** ballotToken().decimals;
  }

  async getVoterListByProjectId(projectId: number): Promise<Json[]> {
    if (projectId == 0) {
      return [];
    }
    const voterList = await ballot('admin').abi.getVoterListByProjectId(
      projectId,
    );
    const result = [];
    if (voterList.length > 0) {
      for (let i = voterList.length - 1; i >= 0; i--) {
        const evm_address = voterList[0][i];
        const votedAmount = voterList[1][i]
          ? Number(voterList[1][i].toString()) / 10 ** ballotToken().decimals
          : 0;
        result.push({
          evm_address,
          votedAmount,
        });
      }
    }
    return result;
  }

  async getPendingReconcile(voterAddress: string) {
    if (isAddress(voterAddress)) {
      const amount = await ballot(
        'admin',
      ).abi.getPendingReconcileByVoterAddress(voterAddress);
      return Number(amount.toString()) / 10 ** ballotToken().decimals;
    }
    return 0;
  }

  @UseGuards(EtherAdminGuard)
  async reconcile(voterAddress: string) {
    const amount = await ballot(
      'admin',
    ).abi.getPendingReconcileByVoterAddress();

    if (isAddress(voterAddress) && toNumber(amount) > 0) {
      await ballotToken('admin').abi.approve(ballot().address, amount);
      await ballot('admin').abi.reconcile(voterAddress, amount, {
        gasLimit,
      });
    }
  }

  @UseGuards(EtherAdminGuard)
  async bulkReconcile() {
    const pendingReconcileList = await ballot(
      'admin',
    ).abi.getPendingReconcileList();
    const voterList = pendingReconcileList[0];

    if (voterList.length > 0) {
      for (let i = voterList.length - 1; i >= 0; i--) {
        const voter = pendingReconcileList[0][i];
        const amount = pendingReconcileList[1][i];

        if (isAddress(voter) && toNumber(amount) > 0) {
          await ballotToken('admin').abi.approve(ballot().address, amount);
          await ballot('admin').abi.reconcile(voter, amount, {
            gasLimit,
          });
        }
      }
    }
  }
}
