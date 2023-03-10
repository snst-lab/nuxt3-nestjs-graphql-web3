import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseUnits, parseEther } from "ethers/lib/utils";
import dayjs from "dayjs";
import { constants } from "@constants";
import { tools } from "@tools";
import { runtimeTools } from "@tools/runtime";
import { execSync } from "child_process";

const { gasLimit, maxUint256 } = constants.web3.number;
const {
  toNumber,
  useWallet,
  useContract,
  useToken,
  watchContractEvent,
  showBalance,
  getBalance,
  showContractBalance,
  getContractBalance,
} = runtimeTools.web3;

describe("Initial Configurations", async () => {
  const admin = useWallet("admin");
  const user = useWallet("user");
  const user2 = useWallet("user2");

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

  const poolId = 14;
  const baseToken = tokenCeUSDC;
  const lpToken = lpCeUSDCBAI;

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
  });

  await test("Swap to get base token", async () => {
    await router("admin").abi.swapExactETHForTokens(
      100000,
      [tokenWASTR().address, baseToken().address],
      admin.address,
      dayjs().add(1, "hour").unix(),
      {
        value: parseEther("5000000"),
        gasLimit,
      }
    );
    await showBalance("admin", baseToken);
  });

  await test("Mint ballot token", async () => {
    const amount = await showBalance("admin", baseToken);
    await ballotToken("admin").abi.mint(
      admin.address,
      parseUnits(amount.toString(), ballotToken().decimals),
      { gasLimit }
    );
    await showBalance("admin", ballotToken);
  });

  await test("Deposit base token to Defi", async () => {
    const amount = await showBalance("admin", baseToken);
    await baseToken("admin").abi.approve(fund().address, maxUint256);
    await fund("admin").abi.deposit(
      [baseToken().address, tokenBAI().address],
      [baseToken().address, baseToken().address],
      parseUnits(amount.toString(), baseToken().decimals),
      { gasLimit }
    );
    await showBalance("admin", baseToken);
  });

  await test("Start liquidity mining", async () => {
    await showBalance("admin", lpToken);
    lpToken("admin").abi.approve(masterChef().address, maxUint256);
    await masterChef("admin").abi.deposit(
      poolId,
      await getBalance("admin", lpToken),
      admin.address,
      { gasLimit }
    );
    console.log(`Start liquidity mining on poolId =`, poolId);
  });

  // await test("Airdrop ballot token", async () => {
  //   const amount = (await showBalance("admin", ballotToken)) * 0.1;
  //   [user.address, user2.address].forEach(async (e) => {
  //     await ballotToken("admin").abi.approve(
  //       e,
  //       parseUnits(amount.toString(), ballotToken().decimals),
  //       { gasLimit }
  //     );
  //     await ballotToken("admin").abi.transfer(
  //       e,
  //       parseUnits(amount.toString(), ballotToken().decimals),
  //       { gasLimit }
  //     );
  //   });
  //   await showBalance("user", ballotToken);
  //   await showBalance("user2", ballotToken);
  //   await showBalance("admin", ballotToken);
  // });

  await test("Contract settings", async () => {
    await ballotToken("admin").abi.addMinterRole(admin.address, { gasLimit });
    await ballot("admin").abi.setBallotToken(ballotToken().address, {
      gasLimit,
    });
    await fund("admin").abi.setBallot(ballot().address, { gasLimit });
  });
});
