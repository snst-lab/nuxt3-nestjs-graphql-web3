import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseEther } from "ethers/lib/utils";
import dayjs from "dayjs";
import { constants } from "@constants";
import { tools } from "@tools";
import { runtimeTools } from "@tools/runtime";

const { gasLimit, maxUint256 } = constants.web3.number;
const { useWallet, useContract, useToken, showBalance, getBalance } =
  runtimeTools.web3;

describe("Defi on Astar with multi-transaction", async () => {
  const wallet = useWallet();

  const router = await useContract("PancakeRouter");
  const masterChef = await useContract("MasterChef");
  const tokenWASTR = await useToken("WASTR");
  const tokenCeUSDC = await useToken("ceUSDC");
  const tokenBAI = await useToken("BAI");
  const lpCeUSDCBAI = await useToken("ARSW-LP-ceUSDC-BAI");
  const tokenARSW = await useToken("ARSW");

  const poolId = 14;
  const baseToken = tokenCeUSDC;

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
    await showBalance("user", baseToken);
  });

  await beforeAll(async () => {
    await router().abi.swapExactETHForTokens(
      0,
      [tokenWASTR().address, baseToken().address],
      wallet.address,
      dayjs().add(1, "hour").unix(),
      {
        value: parseEther("1"),
        gasLimit,
      }
    );
  });

  await test("Swap ceUSDC to BAI", async () => {
    const balance = await getBalance("user", baseToken);

    await router().abi.swapExactTokensForTokens(
      balance.div(2),
      0,
      [baseToken().address, tokenBAI().address],
      wallet.address,
      dayjs().add(1, "hour").unix(),
      { gasLimit }
    );
    expect(await showBalance("user", baseToken)).gt(0);
    expect(await showBalance("user", tokenBAI)).gt(0);
  });

  await test("Add Liquidity to get LP token", async () => {
    baseToken().abi.approve(router().address, maxUint256);
    tokenBAI().abi.approve(router().address, maxUint256);

    await router().abi.addLiquidity(
      baseToken().address,
      tokenBAI().address,
      await getBalance("user", baseToken),
      await getBalance("user", tokenBAI),
      0,
      0,
      wallet.address,
      dayjs().add(1, "hour").unix(),
      { gasLimit }
    );

    expect(await showBalance("user", lpCeUSDCBAI)).gt(0);
  });

  await test("Liquidity Mining to Harverst", async () => {
    lpCeUSDCBAI().abi.approve(masterChef().address, maxUint256);
    await masterChef().abi.deposit(
      poolId,
      await getBalance("user", lpCeUSDCBAI),
      wallet.address,
      { gasLimit }
    );
    await tools.sleep(3000);
    await masterChef().abi.harvest(poolId, wallet.address, {
      gasLimit,
    });

    expect(await showBalance("user", lpCeUSDCBAI)).eq(0);
    expect(await showBalance("user", tokenARSW)).gt(0);
  });

  await test("Get reward as ceUSDC", async () => {
    tokenARSW().abi.approve(router().address, maxUint256);
    await router().abi.swapExactTokensForTokens(
      await getBalance("user", tokenARSW),
      1,
      [tokenARSW().address, baseToken().address],
      wallet.address,
      dayjs().add(1, "hour").unix(),
      { gasLimit }
    );
    expect(await showBalance("user", baseToken)).gt(0);
  });
});
