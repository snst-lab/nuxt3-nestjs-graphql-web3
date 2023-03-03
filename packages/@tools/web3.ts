import {
  ethers,
  BigNumber,
  Wallet,
  Contract,
  ContractInterface,
  BytesLike,
} from "ethers";
import { readFileSync, writeFileSync } from "fs";
import { constants } from "../@constants";

type UserType = "admin" | "user";

const { config, host, chain, accounts } = constants.web3;

export const provider = new ethers.providers.JsonRpcProvider(host.public);

export class ToolsWeb3 {
  static provider = provider;

  static useWallet(userType?: UserType): Wallet {
    userType = userType || "user";
    return new ethers.Wallet(accounts[userType].secret as BytesLike, provider);
  }

  static useContract(
    name: string,
    type?: Evm.Type
  ): (userType?: UserType) => Evm.Contract | null {
    try {
      type = type || "contract";

      return (userType?: UserType) => {
        userType = userType || "user";
        const evm = JSON.parse(
          readFileSync(`../@evm/${chain}/${type}/${name}.json`).toString()
        );
        const provider = new ethers.providers.JsonRpcProvider(host.public);
        const signer = provider.getSigner(accounts[userType].address) ?? null;
        if (!signer) {
          throw new Error();
        }
        const contract: Contract = new ethers.Contract(
          evm.address,
          evm.abi,
          signer ?? provider
        );
        if (type === "token") {
          return {
            address: evm.address,
            symbol: evm.symbol ?? "TOKEN",
            decimals: evm.decimals ?? 18,
            abi: contract,
          } as Evm.Contract;
        } else {
          return contract as Evm.Contract;
        }
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static useToken(name: string): (userType?: UserType) => Evm.Contract | null {
    return ToolsWeb3.useContract(name, "token");
  }

  static fromWei(x: BigNumber, u = 18) {
    return ethers.utils.formatUnits(x, u);
  }

  static toNumber(x: BigNumber): number {
    return Number(x.toString());
  }

  static async mineBlock(timestamp: number) {
    return await provider.send("evm_mine", [timestamp]);
  }

  static async increaseTimestamp(secsToIncrease: number) {
    const blockNumber = await provider.getBlockNumber();
    const { timestamp: currentTimestamp } = await provider.getBlock(
      blockNumber
    );
    const newTime = Number(currentTimestamp) + Number(secsToIncrease);
    return await this.mineBlock(newTime);
  }

  static saveContractAbi(args: {
    type?: Evm.Type;
    name: string;
    address: string;
    abi: ContractInterface;
  }) {
    let { type, name, address, abi } = args;
    type = type || "contract";

    if (type == "token") {
      let { symbol, decimals } =
        require(`../web3/contracts/constructor/${name}.ts`).default;
      symbol = symbol || "WEB3";
      decimals = decimals || 18;
      writeFileSync(
        `../@evm/${chain}/${type}/${name}.json`,
        JSON.stringify({
          address,
          symbol,
          decimals,
          abi,
        })
      );
    } else {
      writeFileSync(
        `../@evm/${chain}/${type}/${name}.json`,
        JSON.stringify({
          address,
          abi,
        })
      );
    }
  }

  static async watch(
    contractGetter: (userType?: UserType) => Evm.Contract,
    eventName: string,
    callback: (...args: Array<any>) => void
  ) {
    const contract = await contractGetter("admin");
    const filters = contract.filters[eventName];
    if (filters !== undefined) {
      await contract.on(filters(), (...args) => {
        const unwraped = args.map((e) => e.toString());
        callback(...unwraped);
      });
    }
  }

  static async showBalance(
    tokenGetter: (userType?: UserType) => Evm.Contract,
    userType?: UserType
  ): Promise<number> {
    userType = userType || "user";
    const wallet = ToolsWeb3.useWallet(userType);
    const token = await tokenGetter();
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

  static async getBalance(
    tokenGetter: (userType?: UserType) => Evm.Contract,
    userType?: UserType
  ): Promise<ethers.BigNumber> {
    const wallet = ToolsWeb3.useWallet(userType);
    const token = await tokenGetter();
    let balance = BigNumber.from(0);
    if (token) {
      balance = await token.abi.balanceOf(wallet.address);
    } else {
      balance = await wallet.getBalance();
    }
    return balance;
  }

  static async showContractBalance(
    tokenGetter: (userType?: UserType) => Evm.Contract,
    contract: Contract
  ): Promise<number> {
    const token = await tokenGetter();
    const balance = await token.abi.balanceOf(contract.address);
    console.log(
      `${token.symbol} balance of ${contract.address} =`,
      balance.toString()
    );
    return Number(balance.toString());
  }

  static async getContractBalance(
    tokenGetter: (userType?: UserType) => Evm.Contract,
    contract: Contract
  ): Promise<ethers.BigNumber> {
    const token = await tokenGetter();
    const balance = await token.abi.balanceOf(contract.address);
    return balance;
  }
}
