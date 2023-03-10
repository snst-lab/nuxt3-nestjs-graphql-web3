import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseUnits, parseEther, isAddress } from "ethers/lib/utils";
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
  watchContractEvent,
  showBalance,
  getBalance,
  showContractBalance,
  getContractBalance,
} = runtimeTools.web3;

describe("[Test] Ballot.sol", async () => {
  const admin = useWallet("admin");
  const user = useWallet();

  const ballot = useContract("Ballot");
  const fund = useContract("Fund");
  const ballotToken = useToken("Token");
  const projectId = 1;

  await watchContractEvent(fund, "Log", (string, number) => {
    console.log(string, number);
  });

  await watchContractEvent(fund, "Vote", (sender, projectId, amount) => {
    console.log(`==== Event Vote ====`);
    console.log(sender, projectId, amount);
  });

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
  });

  await beforeAll(async () => {});

  await test("[Voter Action] Vote", async () => {
    const voterListBefore = await ballot().abi.getVoterListByProjectId(
      projectId
    );
    const userBalanceBefore = await showBalance("user", ballotToken);
    const adminBalanceBefore = await showBalance("admin", ballotToken);

    const amount = parseUnits("10", ballotToken().decimals);

    await ballotToken().abi.approve(ballot().abi.address, maxUint256);
    await ballot("user").abi.vote(projectId, amount, { gasLimit });

    const voterListAfter = await ballot().abi.getVoterListByProjectId(
      projectId
    );
    const userBalanceAfter = await showBalance("user", ballotToken);
    const adminBalanceAfter = await showBalance("admin", ballotToken);
    expect(userBalanceAfter).lt(userBalanceBefore);
    expect(adminBalanceAfter).gt(adminBalanceBefore);
    expect(voterListAfter[0].includes(user.address)).eq(true);
    expect(toNumber(voterListAfter[1])).gt(toNumber(voterListBefore[1]));
  });

  await test("[Voter Action] Unvote", async () => {
    const voterListBefore = await ballot().abi.getVoterListByProjectId(
      projectId
    );
    for (let i = voterListBefore.length - 1; i >= 0; i--) {
      const voter = voterListBefore[0][i];
      const amount = voterListBefore[1][i];

      if (voter == user.address) {
        await ballot().abi.unvote(projectId, amount, { gasLimit });
      }
    }
    const voterListAfter = await ballot().abi.getVoterListByProjectId(
      projectId
    );
    expect(toNumber(voterListAfter[1])).lt(toNumber(voterListBefore[1]));
  });

  await test("[Admin Action] Reconcile Pending Reconcile", async () => {
    const userBalanceBefore = await showBalance("user", ballotToken);
    const adminBalanceBefore = await showBalance("admin", ballotToken);

    const pendingReconcileListBefore =
      await ballot().abi.getPendingReconcileList();
    const voterListBefore = pendingReconcileListBefore[0];

    if (voterListBefore.length > 0) {
      for (let i = voterListBefore.length - 1; i >= 0; i--) {
        const voter = pendingReconcileListBefore[0][i];
        const amount = pendingReconcileListBefore[1][i];

        if (isAddress(voter) && toNumber(amount) > 0) {
          await ballotToken("admin").abi.approve(ballot().address, amount);
          await ballot("admin").abi.airdrop(voter, amount, {
            gasLimit,
          });
        }
      }
    }

    const userBalanceAfter = await showBalance("user", ballotToken);
    const adminBalanceAfter = await showBalance("admin", ballotToken);

    expect(userBalanceAfter).gt(userBalanceBefore);
    expect(adminBalanceAfter).lt(adminBalanceBefore);

    const pendingReconcileListAfter =
      await ballot().abi.getPendingReconcileList();
    const voterListAfter = pendingReconcileListAfter[0];

    expect(voterListAfter.length).eq(0);
  });
});
