import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseEther } from "ethers/lib/utils";
import dayjs from "dayjs";
import { constants } from "@constants";
import { tools } from "@tools";
import { runtimeTools } from "@tools/runtime";

const { gasLimit, maxUint256 } = constants.web3.number;
const { useWallet, useContract, showBalance, getBalance } = runtimeTools.web3;

describe("Defi on Astar with multi-transaction", async () => {
  const wallet = useWallet();

  const router = await useContract({
    name: "PancakeRouter",
  });
  const masterChef = await useContract({
    name: "MasterChef",
  });
  const tokenWASTR = await useContract({
    type: "token",
    name: "WASTR",
  });
  const tokenCeUSDC = await useContract({
    type: "token",
    name: "ceUSDC",
  });
  const tokenBAI = await useContract({
    type: "token",
    name: "BAI",
  });
  const lpCeUSDCBAI = await useContract({
    type: "token",
    name: "ARSW-LP-ceUSDC-BAI",
  });
  const tokenARSW = await useContract({
    type: "token",
    name: "ARSW",
  });

  const poolId = 14;
  const baseToken = tokenCeUSDC;

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
    await showBalance(baseToken);
  });

  await beforeAll(async () => {
    await router.swapExactETHForTokens(
      0,
      [tokenWASTR.address, baseToken.address],
      wallet.address,
      dayjs().add(1, "hour").unix(),
      {
        value: parseEther("10"),
        gasLimit,
      }
    );
  });

  await test("Swap ceUSDC to BAI", async () => {
    const balance = await getBalance(baseToken);

    await router.swapExactTokensForTokens(
      balance.div(2),
      0,
      [baseToken.address, tokenBAI.address],
      wallet.address,
      dayjs().add(1, "hour").unix(),
      {
        gasLimit,
      }
    );
    expect(await showBalance(baseToken)).gt(0);
    expect(await showBalance(tokenBAI)).gt(0);
  });

  await test("Add Liquidity to get LP token", async () => {
    baseToken.abi.approve(router.address, maxUint256);
    tokenBAI.abi.approve(router.address, maxUint256);

    await router.addLiquidity(
      baseToken.address,
      tokenBAI.address,
      await getBalance(baseToken),
      await getBalance(tokenBAI),
      0,
      0,
      wallet.address,
      dayjs().add(1, "hour").unix(),
      {
        gasLimit,
      }
    );

    expect(await showBalance(lpCeUSDCBAI)).gt(0);
  });

  await test("Liquidity Mining to Harverst", async () => {
    lpCeUSDCBAI.abi.approve(masterChef.address, maxUint256);
    await masterChef.deposit(
      poolId,
      await getBalance(lpCeUSDCBAI),
      wallet.address,
      {
        gasLimit,
      }
    );
    await tools.sleep(3000);
    await masterChef.harvest(poolId, wallet.address, {
      gasLimit,
    });

    expect(await showBalance(lpCeUSDCBAI)).eq(0);
    expect(await showBalance(tokenARSW)).gt(0);
  });

  await test("Get reward as ceUSDC", async () => {
    tokenARSW.abi.approve(router.address, maxUint256);
    await router.swapExactTokensForTokens(
      await getBalance(tokenARSW),
      1,
      [tokenARSW.address, baseToken.address],
      wallet.address,
      dayjs().add(1, "hour").unix(),
      {
        gasLimit,
      }
    );
    expect(await showBalance(baseToken)).gt(0);
  });
});
