import { Contract, ethers } from "ethers";
import { $wallet } from "@stores";

export function useContract(
  name: string,
  type?: Evm.Type
): (userType?: Evm.UserType) => Evm.Contract | null {
  const config = useRuntimeConfig();
  const chainName = config.evm.chainIds[$wallet().chainId] || config.evm.chain;
  type = type || "contract";

  return (userType?: Evm.UserType) => {
    try {
      userType = userType || "user";
      const evm = require(`../../@evm/${String(
        chainName
      )}/${type}/${name}.json`);
      const signer = $wallet().type ? $wallet().getSigner() : null;
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
          abi: contract,
          symbol: evm.symbol ?? "",
          decimals: evm.decimals ?? 18,
        } as Evm.Contract;
      } else {
        return {
          address: evm.address,
          abi: contract,
        } as Evm.Contract;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export function useToken(
  name: string
): (userType?: Evm.UserType) => Evm.Contract | null {
  return useContract(name, "token");
}
