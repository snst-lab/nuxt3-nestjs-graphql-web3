import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { parseUnits, parseEther, isAddress } from "ethers/lib/utils";
import { constants } from "@constants";
import { tools } from "@tools";
import { runtimeTools } from "@tools/runtime";
import dayjs from "dayjs";

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

describe("[Test] Token.sol", async () => {
  const admin = useWallet("admin");
  const user = useWallet("user");
  const user2 = useWallet("user2");

  const ballotToken = useToken("Token");

  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
  });

  await beforeAll(async () => {
    await ballotToken("admin").abi.mint(
      admin.address,
      parseUnits("1000", ballotToken().decimals),
      { gasLimit }
    );
    await showBalance("admin", ballotToken);
  });

  await test("Transfer to in whitelist user", async () => {
    await ballotToken("admin").abi.updateWhiteList(user.address, true, {
      gasLimit,
    });
    const amount = parseUnits("100", ballotToken().decimals);
    await ballotToken("admin").abi.approve(user.address, amount, { gasLimit });
    await ballotToken("admin").abi.transfer(user.address, amount, { gasLimit });
    await ballotToken("admin").abi.approve(user2.address, amount, { gasLimit });
    await ballotToken("admin").abi.transfer(user2.address, amount, {
      gasLimit,
    });
    expect(await showBalance("user", ballotToken)).gt(0);
  });

  await test("Transfer to not in whitelist user", async () => {
    const amount = parseUnits("100", ballotToken().decimals);
    await ballotToken("admin").abi.approve(user2.address, amount, { gasLimit });
    await ballotToken("admin").abi.transfer(user2.address, amount, {
      gasLimit,
    });
    expect(await showBalance("user2", ballotToken)).eq(0);
  });
});
