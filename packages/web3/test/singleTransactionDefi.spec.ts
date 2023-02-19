import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseUnits, parseEther } from "ethers/lib/utils";
import dayjs from "dayjs";
import { constants } from "@constants";
import { tools } from "@tools";
import { useContract } from "@evm";

const { gasLimit, maxUint256 } = constants.web3.number;
const {
  useWallet,
  provider,
  watch,
  showBalance,
  getBalance,
  showContractBalance,
  getContractBalance,
} = tools.web3;

describe("Defi on Astar with single-transaction", async () => {
  const wallet = useWallet();

  const app = await useContract({
    name: "AstarApp",
  });
  const appWithAdmin = await useContract({
    name: "AstarApp",
    userType: "admin",
  });
  const router = await useContract({
    name: "PancakeRouter",
    userType: "admin",
  });
  const masterChef = await useContract({
    name: "MasterChef",
    userType: "admin",
  });
  const tokenWASTR = await useContract({
    type: "token",
    name: "WASTR",
    userType: "admin",
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
    userType: "admin",
  });
  const tokenARSW = await useContract({
    type: "token",
    name: "ARSW",
    userType: "admin",
  });
  const projectId = 1;
  const poolId = 14;
  const baseToken = tokenCeUSDC;

  await watch(app, "Log", (string, number) => {
    console.log(string, number);
  });

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
        value: parseEther("100"),
        gasLimit,
      }
    );
    await appWithAdmin.setRouter(router.address);
    await appWithAdmin.setBaseToken(baseToken.address);
  });

  await test("[User Action] Swap and Pool Liquidity", async () => {
    await app.invest(
      projectId,
      [baseToken.address, tokenBAI.address],
      parseUnits("10", baseToken.decimals),
      {
        gasLimit,
      }
    );
    expect(await showBalance(lpCeUSDCBAI, "admin")).gt(0);
  });

  await test("[Batch] Liquidity Mining to Harverst", async () => {
    const admin = useWallet("admin");

    lpCeUSDCBAI.abi.approve(masterChef.address, maxUint256);
    await masterChef.deposit(
      poolId,
      await getBalance(lpCeUSDCBAI, "admin"),
      admin.address,
      { gasLimit }
    );
    await tools.sleep(3000);
    await masterChef.harvest(poolId, admin.address, {
      gasLimit,
    });
    expect(await showBalance(tokenARSW, "admin")).gt(0);

    await tokenARSW.abi.approve(router.address, maxUint256);
    await router.swapExactTokensForTokens(
      await getBalance(tokenARSW, "admin"),
      1,
      [tokenARSW.address, baseToken.address],
      admin.address,
      dayjs().add(1, "hour").unix(),
      { gasLimit }
    );
    expect(await showBalance(baseToken, "admin")).gt(0);

    await baseToken.abi.approve(app.address, maxUint256);
    await baseToken.abi.transfer(
      app.address,
      await getBalance(baseToken, "admin"),
      { gasLimit }
    );
    expect(await showContractBalance(baseToken, app)).gt(0);
  });

  await test("[User Action] Claim Reward", async () => {
    await appWithAdmin.setProjectManager(projectId, wallet.address);
    const claimableCredit = await app.getCreditsBalance(projectId);
    await app.claim(projectId, claimableCredit, { gasLimit });

    expect(await showBalance(baseToken)).gt(0);
  });
});
