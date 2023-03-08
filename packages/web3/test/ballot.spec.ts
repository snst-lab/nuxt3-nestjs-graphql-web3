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

  await test("[Supporter Action] Vote", async () => {
    const supporterListBefore = await ballot().abi.getSupporterListByProjectId(
      projectId
    );
    const userBalanceBefore = await showBalance("user", ballotToken);
    const adminBalanceBefore = await showBalance("admin", ballotToken);

    const amount = parseUnits("10", ballotToken().decimals);

    await ballotToken().abi.approve(ballot().abi.address, maxUint256);
    await ballot("user").abi.vote(projectId, amount, { gasLimit });

    const supporterListAfter = await ballot().abi.getSupporterListByProjectId(
      projectId
    );
    const userBalanceAfter = await showBalance("user", ballotToken);
    const adminBalanceAfter = await showBalance("admin", ballotToken);
    expect(userBalanceAfter).lt(userBalanceBefore);
    expect(adminBalanceAfter).gt(adminBalanceBefore);
    expect(supporterListAfter[0].includes(user.address)).eq(true);
    expect(toNumber(supporterListAfter[1])).gt(
      toNumber(supporterListBefore[1])
    );
  });

  await test("[Supporter Action] Unvote", async () => {
    const supporterListBefore = await ballot().abi.getSupporterListByProjectId(
      projectId
    );
    for (let i = supporterListBefore.length - 1; i >= 0; i--) {
      const supporter = supporterListBefore[0][i];
      const amount = supporterListBefore[1][i];

      if (supporter == user.address) {
        await ballot().abi.unvote(projectId, amount, { gasLimit });
      }
    }
    const supporterListAfter = await ballot().abi.getSupporterListByProjectId(
      projectId
    );
    expect(toNumber(supporterListAfter[1])).lt(
      toNumber(supporterListBefore[1])
    );
  });

  await test("[Admin Action] Reconcile Pending Airdrop", async () => {
    const userBalanceBefore = await showBalance("user", ballotToken);
    const adminBalanceBefore = await showBalance("admin", ballotToken);

    const pendingAirdropListBefore = await ballot().abi.getPendingAirdropList();
    const supporterListBefore = pendingAirdropListBefore[0];

    if (supporterListBefore.length > 0) {
      for (let i = supporterListBefore.length - 1; i >= 0; i--) {
        const supporter = pendingAirdropListBefore[0][i];
        const amount = pendingAirdropListBefore[1][i];

        if (isAddress(supporter) && toNumber(amount) > 0) {
          await ballotToken("admin").abi.approve(ballot().address, amount);
          await ballot("admin").abi.airdrop(supporter, amount, {
            gasLimit,
          });
        }
      }
    }

    const userBalanceAfter = await showBalance("user", ballotToken);
    const adminBalanceAfter = await showBalance("admin", ballotToken);

    expect(userBalanceAfter).gt(userBalanceBefore);
    expect(adminBalanceAfter).lt(adminBalanceBefore);

    const pendingAirdropListAfter = await ballot().abi.getPendingAirdropList();
    const supporterListAfter = pendingAirdropListAfter[0];

    expect(supporterListAfter.length).eq(0);
  });
});
