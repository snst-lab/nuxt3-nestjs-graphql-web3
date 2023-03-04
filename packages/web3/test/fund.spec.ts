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

  const fund = useContract("Fund");
  const ballot = useContract("Ballot");
  const ballotToken = useToken("Token");
  const router = useContract("PancakeRouter");
  const masterChef = useContract("MasterChef");
  const tokenWASTR = useToken("WASTR");
  const tokenCeUSDC = useToken("ceUSDC");
  const tokenBAI = useToken("BAI");
  const lpCeUSDCBAI = useToken("ARSW-LP-ceUSDC-BAI");
  const tokenARSW = useToken("ARSW");

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
    await router("admin").swapExactETHForTokens(
      0,
      [tokenWASTR().address, baseToken().address],
      admin.address,
      dayjs().add(1, "hour").unix(),
      {
        value: parseEther("1"),
        gasLimit,
      }
    );
  });

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
    await showContractBalance(fund, baseToken);
    await showContractBalance(fund, tokenBAI);
    expect(await showBalance("admin", lpCeUSDCBAI)).gt(0);
  });

  await test("[Batch] Liquidity Mining to Harverst", async () => {
    lpCeUSDCBAI("admin").abi.approve(masterChef().address, maxUint256);
    await masterChef("admin").deposit(
      poolId,
      await getBalance("admin", lpCeUSDCBAI),
      admin.address,
      { gasLimit }
    );
    await tools.sleep(2000);
    await masterChef("admin").harvest(poolId, admin.address, {
      gasLimit,
    });
    expect(await showBalance("admin", tokenARSW)).gt(0);

    const baseTokenBalanceBefore = await showContractBalance(fund, baseToken);
    await tokenARSW("admin").abi.approve(router().address, maxUint256);
    await baseToken("admin").abi.approve(fund().address, maxUint256);
    await router("admin").swapExactTokensForTokens(
      await getBalance("admin", tokenARSW),
      1,
      [tokenARSW().address, baseToken().address],
      fund().address,
      dayjs().add(1, "hour").unix(),
      { gasLimit }
    );
    const baseTokenBalanceAfter = await showContractBalance(fund, baseToken);

    expect(baseTokenBalanceAfter).gt(baseTokenBalanceBefore);
  });

  await test("[Batch] Claim Reward to provide", async () => {
    const amount = parseUnits("100", ballotToken().decimals);
    await ballotToken().abi.approve(ballot().address, amount);
    await ballot().vote(projectId, amount, { gasLimit });
    const estimated = await fund("admin").estimateIncome(projectId, {
      gasLimit,
    });
    console.log(
      "Estimated Income of projectId=" + projectId,
      toNumber(estimated) / 10 ** baseToken().decimals
    );
    const baseTokenBalanceBefore = await getBalance("admin", baseToken);
    await fund("admin").claim(projectId, { gasLimit });
    const baseTokenBalanceAfter = await getBalance("admin", baseToken);
    const realized =
      toNumber(baseTokenBalanceAfter.sub(baseTokenBalanceBefore)) /
      10 ** baseToken().decimals;
    console.log("Realized Income of projectId=" + projectId, realized);

    expect(realized).gt(0);
  });
});
