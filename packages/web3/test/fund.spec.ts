import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseUnits, parseEther } from "ethers/lib/utils";
import dayjs from "dayjs";
import { constants } from "@constants";
import { tools } from "@tools";
import { runtimeTools } from "@tools/runtime";

const { gasLimit, maxUint256 } = constants.web3.number;
const {
  useWallet,
  useContract,
  watch,
  showBalance,
  getBalance,
  showContractBalance,
  getContractBalance,
} = runtimeTools.web3;

describe("Defi on Astar with single-transaction", async () => {
  const admin = useWallet("admin");
  const user = useWallet();

  const fund = await useContract({
    name: "Fund",
  });
  const fundWithAdmin = await useContract({
    name: "Fund",
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

  await watch(fund, "Log", (string, number) => {
    console.log(string, number);
  });

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
  });

  await beforeAll(async () => {
    await router.swapExactETHForTokens(
      0,
      [tokenWASTR.address, baseToken.address],
      user.address,
      dayjs().add(1, "hour").unix(),
      {
        value: parseEther("100"),
        gasLimit,
      }
    );
  });

  await test("[User Action] Swap and Pool Liquidity", async () => {
    const amount = parseUnits("1", baseToken.decimals);
    await baseToken.abi.approve(fund.address, amount);
    await fund.deposit(
      projectId,
      [baseToken.address, tokenBAI.address],
      [baseToken.address, baseToken.address],
      amount,
      {
        gasLimit,
      }
    );
    await showContractBalance(baseToken, fund);
    await showContractBalance(tokenBAI, fund);
    expect(await showBalance(lpCeUSDCBAI, "admin")).gt(0);
  });

  await test("[Batch] Liquidity Mining to Harverst", async () => {
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

    await baseToken.abi.approve(fund.address, maxUint256);
    await baseToken.abi.transfer(
      fund.address,
      await getBalance(baseToken, "admin"),
      { gasLimit }
    );
    expect(await showContractBalance(baseToken, fund)).gt(0);
  });

  await test("[Batch] Claim Reward to provide", async () => {
    await fund.claim(projectId, { gasLimit });
    const claimableBalance = await fund.estimateReward(projectId);
    console.log("estimated Reward", claimableBalance.toString());
    expect(await showBalance(baseToken, "admin")).gt(0);
  });

  await test("[Only Test] Inquiry supporters list", async () => {
    const [address, credit] = await fundWithAdmin.getSupporterListByProjectId(
      projectId
    );
    expect(address[0]).eq(user.address);
    expect(Number(credit[0].toString())).gt(0);
  });
});
