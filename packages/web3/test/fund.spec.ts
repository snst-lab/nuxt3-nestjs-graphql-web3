import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseUnits, parseEther } from "ethers/lib/utils";
import dayjs from "dayjs";
import { constants } from "@constants";
import { tools } from "@tools";
import { runtimeTools } from "@tools/runtime";

const { gasLimit, maxUint256 } = constants.web3.number;
const {
  toNumber,
  useWallet,
  useContract,
  useToken,
  watch,
  showBalance,
  getBalance,
  showContractBalance,
  getContractBalance,
} = runtimeTools.web3;

describe("[Test] Fund.sol", async () => {
  const admin = useWallet("admin");
  const user = useWallet();

  const fund = await useContract("Fund");
  const ballot = await useContract("Ballot");
  const ballotToken = await useToken("Token");
  const router = await useContract("PancakeRouter");
  const masterChef = await useContract("MasterChef");
  const tokenCeUSDC = await useToken("ceUSDC");
  const tokenBAI = await useToken("BAI");
  const lpCeUSDCBAI = await useToken("ARSW-LP-ceUSDC-BAI");
  const tokenARSW = await useToken("ARSW");

  const projectId = 1;
  const poolId = 14;
  const baseToken = tokenCeUSDC;

  await watch(fund, "Log", (string, number) => {
    console.log(string, number);
  });

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
  });

  await beforeAll(async () => {});

  await test("[Admin Action] Swap and Pool Liquidity", async () => {
    const amount = parseUnits("1", baseToken().decimals);
    await baseToken("admin").abi.approve(fund().address, amount);
    await fund("admin").deposit(
      [baseToken().address, tokenBAI().address],
      [baseToken().address, baseToken().address],
      amount,
      {
        gasLimit,
      }
    );
    await showContractBalance(baseToken, fund());
    await showContractBalance(tokenBAI, fund());
    expect(await showBalance(lpCeUSDCBAI, "admin")).gt(0);
  });

  await test("[Batch] Liquidity Mining to Harverst", async () => {
    lpCeUSDCBAI("admin").abi.approve(masterChef().address, maxUint256);
    await masterChef("admin").deposit(
      poolId,
      await getBalance(lpCeUSDCBAI, "admin"),
      admin.address,
      { gasLimit }
    );
    await tools.sleep(1000);
    await masterChef("admin").harvest(poolId, admin.address, {
      gasLimit,
    });
    expect(await showBalance(tokenARSW, "admin")).gt(0);

    const baseTokenBalanceBefore = await getBalance(baseToken, "admin");
    await tokenARSW("admin").abi.approve(router().address, maxUint256);
    await router("admin").swapExactTokensForTokens(
      await getBalance(tokenARSW, "admin"),
      1,
      [tokenARSW().address, baseToken().address],
      admin.address,
      dayjs().add(1, "hour").unix(),
      { gasLimit }
    );
    const baseTokenBalanceAfter = await getBalance(baseToken, "admin");
    const income = baseTokenBalanceAfter.sub(baseTokenBalanceBefore);
    expect(toNumber(income)).gt(0);

    await baseToken("admin").abi.approve(fund().address, income);
    await baseToken("admin").abi.transfer(fund().address, income, {
      gasLimit,
    });
    expect(await showContractBalance(baseToken, fund())).gt(0);
  });

  await test("[Batch] Claim Reward to provide", async () => {
    const income = [];
    const amount = parseUnits("1", ballotToken().decimals);
    await ballotToken().abi.approve(ballot().address, amount);
    await ballot().vote(projectId, amount, { gasLimit });
    const estimated = await fund().estimateIncome(projectId);
    console.log(
      "Estimated Income of projectId=" + projectId,
      toNumber(estimated)
    );
    const baseTokenBalanceBefore = await getBalance(baseToken, "admin");
    await fund("admin").claim(projectId, { gasLimit });
    const baseTokenBalanceAfter = await getBalance(baseToken, "admin");
    income[projectId] = toNumber(
      baseTokenBalanceAfter.sub(baseTokenBalanceBefore)
    );
    console.log("Realized Income of projectId=" + projectId, income[projectId]);

    expect(income[projectId]).gt(0);
  });
});
