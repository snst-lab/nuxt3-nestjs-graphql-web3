import { ethers, BigNumber, Wallet, Contract } from "ethers";
import { constants } from "../@constants";

type UserType = "admin" | "user";

const { config, host, chain, accounts } = constants.web3;

const provider = new ethers.providers.JsonRpcProvider(host.public);

function useWallet(userType?: UserType): Wallet {
  userType = userType || "user";
  return new ethers.Wallet(accounts[userType].secret, provider);
}

export class ToolsWeb3 {
  public provider;

  constructor() {
    this.provider = provider;
  }

  useWallet(userType?: UserType): Wallet {
    return useWallet(userType);
  }

  fromWei(x: BigNumber, u = 18) {
    return ethers.utils.formatUnits(x, u);
  }

  async mineBlock(timestamp: number) {
    return await provider.send("evm_mine", [timestamp]);
  }

  async increaseTimestamp(secsToIncrease: number) {
    const blockNumber = await provider.getBlockNumber();
    const { timestamp: currentTimestamp } = await provider.getBlock(
      blockNumber
    );
    const newTime = Number(currentTimestamp) + Number(secsToIncrease);
    return await this.mineBlock(newTime);
  }

  async watch(
    contract: Contract,
    eventName: string,
    callback: (...args: Array<any>) => void
  ) {
    const filters = contract.filters[eventName];
    if (filters !== undefined) {
      await contract.on(filters(), (...args) => {
        const unwraped = args.map((e) => e.toString());
        callback(...unwraped);
      });
    }
  }

  async showBalance(
    token?: Evm.Contract,
    userType?: UserType
  ): Promise<number> {
    userType = userType || "user";
    const wallet = useWallet(userType);
    let balance = {};
    if (token) {
      balance = await token.abi.balanceOf(wallet.address);
      console.log(
        `${token.symbol} balance of ${userType} =`,
        balance.toString()
      );
    } else {
      balance = await wallet.getBalance();
      console.log(
        `${config[chain].nativeCurrency.name} balance of ${userType} =`,
        balance.toString()
      );
    }
    return Number(balance.toString());
  }

  async getBalance(
    token?: Evm.Contract,
    userType?: UserType
  ): Promise<ethers.BigNumber> {
    const wallet = useWallet(userType);
    let balance = BigNumber.from(0);
    if (token) {
      balance = await token.abi.balanceOf(wallet.address);
    } else {
      balance = await wallet.getBalance();
    }
    return balance;
  }

  async showContractBalance(
    token: Evm.Contract,
    contract: Contract
  ): Promise<number> {
    const balance = await token.abi.balanceOf(contract.address);
    console.log(
      `${token.symbol} balance of ${contract.address} =`,
      balance.toString()
    );
    return Number(balance.toString());
  }

  async getContractBalance(
    token: Evm.Contract,
    contract: Contract
  ): Promise<ethers.BigNumber> {
    const balance = await token.abi.balanceOf(contract.address);
    return balance;
  }
}
