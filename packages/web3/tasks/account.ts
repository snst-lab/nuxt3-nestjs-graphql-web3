import { task } from "hardhat/config";
import { constants } from "@constants";

const { host } = constants.web3;

task("account", null).setAction(async (args, hre) => {
  const { run, ethers, artifacts } = hre;

  const provider = new ethers.providers.JsonRpcProvider(host.public);
  const accounts = await ethers.getSigners();

  const array: Array<any> = [];

  for await (const e of accounts) {
    const balance = (await provider.getBalance(e.address)).div(1e9);
    array.push({
      address: e.address,
      balance: balance.toNumber() * 1e-9,
    });
  }
  console.log(array);
});
