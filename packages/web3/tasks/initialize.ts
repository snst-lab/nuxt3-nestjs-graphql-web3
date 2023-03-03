import { task } from "hardhat/config";
import { parseUnits, parseEther } from "ethers/lib/utils";
import * as dayjs from "dayjs";
import { constants } from "@constants";
import { runtimeTools } from "@tools/runtime";
import { execSync } from "child_process";

const { gasLimit, maxUint256 } = constants.web3.number;
const { useWallet, useContract, useToken, showBalance } = runtimeTools.web3;

const admin = useWallet("admin");
const user = useWallet();

async function deploy() {
  execSync("yarn hardhat deploy --type token --name Token");
  execSync("yarn hardhat deploy --name Ballot");
  execSync("yarn hardhat deploy --name Fund");
}

async function config() {
  const ballotToken = await useToken("Token");
  const ballot = await useContract("Ballot");
  const fund = await useContract("Fund");

  await ballotToken("admin").abi.addMinterRole(admin.address, { gasLimit });
  await ballot("admin").setBallotToken(ballotToken().address, { gasLimit });
  await fund("admin").setBallot(ballot().address, { gasLimit });
}

async function swap() {
  const router = await useContract("PancakeRouter");
  const tokenWASTR = await useToken("WASTR");
  const tokenCeUSDC = await useToken("ceUSDC");
  const baseToken = tokenCeUSDC;

  await router("admin").swapExactETHForTokens(
    0,
    [tokenWASTR().address, baseToken().address],
    admin.address,
    dayjs().add(1, "hour").unix(),
    {
      value: parseEther("100"),
      gasLimit,
    }
  );
  await showBalance(baseToken, "admin");
}

async function mint() {
  const fund = await useContract("Fund");
  const ballotToken = await useToken("Token");
  const tokenCeUSDC = await useToken("ceUSDC");
  const tokenBAI = await useToken("BAI");
  const baseToken = tokenCeUSDC;

  const amount = "1000";
  await ballotToken("admin").abi.mint(
    user.address,
    parseUnits(amount, ballotToken().decimals),
    { gasLimit }
  );
  await fund("admin").deposit(
    [baseToken().address, tokenBAI().address],
    [baseToken().address, baseToken().address],
    parseUnits(amount, baseToken().decimals),
    { gasLimit }
  );
  await showBalance(ballotToken);
}

task("initialize", null).setAction(async (args, hre) => {
  try {
    await deploy();
    await config();
    await swap();
    await mint();
    process.exit(0);
  } catch (err: unknown) {
    console.log(err);
    process.exit(1);
  }
});
