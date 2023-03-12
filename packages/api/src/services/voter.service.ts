import { Injectable } from '@nestjs/common';
import { Args, ArgsType, Field } from '@nestjs/graphql';
import { ContractBallotService, PrismaService } from '@/services';
import { ethers } from 'ethers';
import * as crypto from 'crypto';
import { constants } from '@constants';

const { provider, accounts } = constants.web3;

@Injectable()
export class VoterService {
  constructor(
    private readonly contractBallotService: ContractBallotService,
    private readonly prisma: PrismaService,
  ) {}

  async updateVoters(): Promise<string> {
    const projects = await this.prisma.project.findMany();
    if (projects.length === 0) {
      return;
    }
    const totalBalance = await this.contractBallotService.getTokenBalance(
      accounts.admin.address,
    );

    if (totalBalance < 100) {
      return;
    }
    const shareBalance = Math.floor(totalBalance / 2 / projects.length);
    await this.prisma.voter.deleteMany();

    projects.forEach(async (project, index) => {
      // const secret = '0x' + crypto.randomBytes(32).toString('hex');
      // const wallet = new ethers.Wallet(secret, provider);
      let wallet = { address: '', secret: '' };
      if (index % 2 === 0) wallet = accounts.user;
      else wallet = accounts.user2;

      await this.prisma.voter.create({
        data: {
          project_id: project.project_id,
          name: project.name,
          evm_address: wallet.address,
          secret: wallet.secret,
          max_voteable: shareBalance,
          pending_airdrop: shareBalance,
          mock_follow_project_id:
            project.project_id > 1 ? project.project_id - 1 : 5,
        },
      });
    });
  }
}
