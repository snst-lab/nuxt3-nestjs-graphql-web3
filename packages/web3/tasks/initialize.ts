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
  await ballotToken("admin").abi.mint(
    user.address,
    parseUnits("100", ballotToken().decimals)
  );
  await showBalance(ballotToken, "user");
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

task("initialize", null).setAction(async (args, hre) => {
  try {
    await deploy();
    await config();
    await swap();
    process.exit(0);
  } catch (err: unknown) {
    console.log(err);
    process.exit(1);
  }
});
