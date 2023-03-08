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
  async vote(projectId: number, _amount: number) {
    const amount = parseUnits(_amount.toString(), ballotToken().decimals);
    await ballotToken().abi.approve(ballot().address, amount);
    await ballot().abi.vote(projectId, amount, { gasLimit });
  }

  async unvote(projectId: number, _amount: number) {
    await ballot().abi.unvote(projectId, _amount, { gasLimit });
  }
  /**
   * １日１回実行
   * 審査機関が投票を取り下げた場合に、取り下げた数量に応じて事務局から投票権トークンを再配布する
   */
  async airdrop() {
    const pendingAirdropList = await ballot().abi.getPendingAirdropList();
    const supporterList = pendingAirdropList[0];

    if (supporterList.length > 0) {
      for (let i = supporterList.length - 1; i >= 0; i--) {
        const supporter = pendingAirdropList[0][i];
        const amount = pendingAirdropList[1][i];

        if (isAddress(supporter) && toNumber(amount) > 0) {
          await ballotToken('admin').abi.approve(ballot().address, amount);
          await ballot('admin').abi.airdrop(supporter, amount, {
            gasLimit,
          });
        }
      }
    }
  }
}
