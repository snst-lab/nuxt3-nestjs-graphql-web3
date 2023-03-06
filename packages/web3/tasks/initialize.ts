import { task } from "hardhat/config";
import { parseUnits, parseEther } from "ethers/lib/utils";
import * as dayjs from "dayjs";
import { constants } from "@constants";
import { runtimeTools } from "@tools/runtime";
import { execSync } from "child_process";

const { gasLimit, maxUint256 } = constants.web3.number;
const { useWallet, useContract, useToken, showBalance, getBalance } =
  runtimeTools.web3;

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

const poolId = 14;
const baseToken = tokenCeUSDC;
const lpToken = lpCeUSDCBAI;

async function deploy() {
  execSync("yarn hardhat deploy --type token --name Token");
  execSync("yarn hardhat deploy --name Ballot");
  execSync("yarn hardhat deploy --name Fund");
}

async function config() {
  await ballotToken("admin").abi.addMinterRole(admin.address, { gasLimit });
  await ballot("admin").abi.setBallotToken(ballotToken().address, { gasLimit });
  await fund("admin").abi.setBallot(ballot().address, { gasLimit });
}

async function swap() {
  await router("admin").abi.swapExactETHForTokens(
    0,
    [tokenWASTR().address, baseToken().address],
    admin.address,
    dayjs().add(1, "hour").unix(),
    {
      value: parseEther("10000000"),
      gasLimit,
    }
  );
  await showBalance("admin", baseToken);
}

async function mint() {
  const amount = "100000";
  await ballotToken("admin").abi.mint(
    user.address,
    parseUnits(amount, ballotToken().decimals),
    { gasLimit }
  );
  await baseToken("admin").abi.approve(fund().address, maxUint256);
  await fund("admin").abi.deposit(
    [baseToken().address, tokenBAI().address],
    [baseToken().address, baseToken().address],
    parseUnits(amount, baseToken().decimals),
    { gasLimit }
  );
  await showBalance("admin", baseToken);
  await showBalance("user", ballotToken);
}

async function startMining() {
  await showBalance("admin", lpToken);
  lpToken("admin").abi.approve(masterChef().address, maxUint256);
  await masterChef("admin").abi.deposit(
    poolId,
    await getBalance("admin", lpToken),
    admin.address,
    { gasLimit }
  );
  console.log(`Start liquidity mining on poolId =`, poolId);
}

task("initialize", null).setAction(async (args, hre) => {
  try {
    await deploy();
    await config();
    await swap();
    await mint();
    await startMining();
    process.exit(0);
  } catch (err: unknown) {
    console.log(err);
    process.exit(1);
  }
});
