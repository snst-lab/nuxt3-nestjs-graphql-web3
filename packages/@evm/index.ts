import { ethers, Contract, ContractInterface } from "ethers";
import { readFileSync, writeFileSync } from "fs";
import { constants } from "../@constants";

type UserType = "admin" | "user";

const { host, chain, accounts } = constants.web3;

export function saveContractAbi(args: {
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

export async function useContract(args: {
  type?: Evm.Type;
  name: string;
  userType?: UserType;
}): Promise<Evm.Contract | null> {
  try {
    let { type, name, userType } = args;
    type = type || "contract";
    userType = userType || "user";

    const evm = JSON.parse(
      readFileSync(`../@evm/${chain}/${type}/${name}.json`).toString()
    );
    const provider = new ethers.providers.JsonRpcProvider(host.public);
    const signer =
      (await provider.getSigner(accounts[userType].address)) ?? null;
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
  } catch (error) {
    console.log(error);
    return null;
  }
}
