import { Injectable } from '@nestjs/common';
import { parseUnits, isAddress } from 'ethers/lib/utils';
import { constants } from '@constants';
import { runtimeTools } from '@tools/runtime';

const { gasLimit } = constants.web3.number;
const { toNumber, useContract, useToken } = runtimeTools.web3;

const ballot = useContract('Ballot');
const ballotToken = useToken('Token');

@Injectable()
export class ContractBallotService {
  async airdrop(voterAddress: string, _amount: number) {
    if (isAddress(voterAddress) && _amount > 0) {
      const amount = parseUnits(_amount.toString(), ballotToken().decimals);
      await ballotToken('admin').abi.approve(ballot().address, amount);
      await ballotToken('admin').abi.transfer(voterAddress, amount, {
        gasLimit,
      });
    }
  }

  async vote(voterAddress: string, projectId: number, _amount: number) {
    if (isAddress(voterAddress) && _amount > 0) {
      const amount = parseUnits(_amount.toString(), ballotToken().decimals);
      await ballotToken(voterAddress).abi.approve(ballot().address, amount);
      await ballot(voterAddress).abi.vote(projectId, amount, {
        gasLimit,
      });
    }
  }

  async unvote(voterAddress: string, projectId: number, _amount: number) {
    if (isAddress(voterAddress) && _amount > 0) {
      const amount = parseUnits(_amount.toString(), ballotToken().decimals);
      await ballot(voterAddress).abi.unvote(projectId, amount, {
        gasLimit,
      });
    }
  }

  async getTokenBalance(voterAddress: string) {
    if (isAddress(voterAddress)) {
      const amount = await ballotToken(voterAddress).abi.balanceOf(
        voterAddress,
      );
      return Number(amount.toString()) / 10 ** ballotToken().decimals;
    }
    return 0;
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
