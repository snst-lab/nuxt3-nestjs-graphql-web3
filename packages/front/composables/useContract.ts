import { Contract, ethers } from "ethers";
import { $wallet } from "@stores";

export async function useContract(args: {
  type?: Evm.Type;
  name: string;
}): Promise<Evm.Contract | null> {
  try {
    let { type, name } = args;
    const config = useRuntimeConfig();
    const chainName =
      config.evm.chainIds[$wallet().chainId] || config.evm.chain;
    type = type || "contract";
    const evm = await import(
      `../../@evm/${String(chainName)}/${type}/${name}.json`
    );
    const signer = $wallet().type ? await $wallet().getSigner() : null;
    if (!signer) {
      throw new Error();
    }
    const contract: Contract = new ethers.Contract(
      evm.address,
      evm.abi,
      signer
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
