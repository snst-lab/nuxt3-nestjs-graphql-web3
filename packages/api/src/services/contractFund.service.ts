import { Injectable } from '@nestjs/common';
import { parseUnits } from 'ethers/lib/utils';
import * as dayjs from 'dayjs';
import { constants } from '@constants';
import { runtimeTools } from '@tools/runtime';

const { gasLimit, maxUint256 } = constants.web3.number;
const { toNumber, useWallet, useContract, useToken, getBalance } =
  runtimeTools.web3;

const admin = useWallet('admin');

const fund = useContract('Fund');
const router = useContract('PancakeRouter');
const masterChef = useContract('MasterChef');
const tokenCeUSDC = useToken('ceUSDC');
const tokenBAI = useToken('BAI');
const lpCeUSDCBAI = useToken('ARSW-LP-ceUSDC-BAI');
const tokenARSW = useToken('ARSW');

const poolId = 14;
const baseToken = tokenCeUSDC;
const lpToken = lpCeUSDCBAI;

@Injectable()
export class ContractFundService {
  async deposit(amount: number) {
    const parsedAmount = parseUnits(amount.toString(), baseToken().decimals);
    await baseToken('admin').abi.approve(fund().address, parsedAmount);
    await fund('admin').abi.deposit(
      [baseToken().address, tokenBAI().address],
      [baseToken().address, baseToken().address],
      parsedAmount,
      {
        gasLimit,
      },
    );
  }

  async startMining() {
    lpToken('admin').abi.approve(masterChef().address, maxUint256);
    await masterChef('admin').abi.deposit(
      poolId,
      await getBalance('admin', lpToken),
      admin.address,
      { gasLimit },
    );
  }

  async harvest(projectId: number): Promise<number> {
    await masterChef('admin').abi.harvest(poolId, admin.address, {
      gasLimit,
    });
    await tokenARSW('admin').abi.approve(router().address, maxUint256);
    await baseToken('admin').abi.approve(fund().address, maxUint256);
    await router('admin').abi.swapExactTokensForTokens(
      await getBalance('admin', tokenARSW),
      1,
      [tokenARSW().address, baseToken().address],
      fund().address,
      dayjs().add(1, 'hour').unix(),
      { gasLimit },
    );
    const baseTokenBalanceBefore = await getBalance('admin', baseToken);
    await fund('admin').abi.claim(projectId, { gasLimit });
    const baseTokenBalanceAfter = await getBalance('admin', baseToken);
    const income =
      toNumber(baseTokenBalanceAfter.sub(baseTokenBalanceBefore)) /
      10 ** baseToken().decimals;
    return income;
  }

  async harvestAll(): Promise<number> {
    const baseTokenBalanceBefore = await getBalance('admin', baseToken);
    await masterChef('admin').abi.harvest(poolId, admin.address, {
      gasLimit,
    });
    await tokenARSW('admin').abi.approve(router().address, maxUint256);
    await router('admin').abi.swapExactTokensForTokens(
      await getBalance('admin', tokenARSW),
      1,
      [tokenARSW().address, baseToken().address],
      admin.address,
      dayjs().add(1, 'hour').unix(),
      { gasLimit },
    );
    const baseTokenBalanceAfter = await getBalance('admin', baseToken);
    const income =
      toNumber(baseTokenBalanceAfter.sub(baseTokenBalanceBefore)) /
      10 ** baseToken().decimals;
    return income;
  }

  async transferReward(voter: string, amount: number) {
    try {
      const parsedAmount = parseUnits(amount.toString(), baseToken().decimals);
      await baseToken('admin').abi.approve(voter, maxUint256);
      await baseToken('admin').abi.transfer(voter, parsedAmount);

      return true;
    } catch {
      return false;
    }
  }
}
