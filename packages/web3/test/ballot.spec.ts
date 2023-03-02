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

  const ballot = await useContract({
    name: "Ballot",
  });
  const ballotWithAdmin = await useContract({
    name: "Ballot",
    userType: "admin",
  });
  const fund = await useContract({
    name: "Fund",
  });
  const fundWithAdmin = await useContract({
    name: "Fund",
    userType: "admin",
  });
  const ballotToken = await useContract({
    type: "token",
    name: "Token",
  });
  const projectId = 1;

  await watch(fund, "Log", (string, number) => {
    console.log(string, number);
  });

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
  });

  await beforeAll(async () => {});

  await test("[Supporter Action] Vote", async () => {
    expect(await showBalance(ballotToken)).gt(0);
    ballotToken.abi.approve(ballot.address, 1000);
    ballot.vote(projectId, 1000);
    expect(await showBalance(ballotToken)).gt(0);
  });
});
