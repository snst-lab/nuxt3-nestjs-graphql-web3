export * from "hardhat/types";
import { Contract as _Contract, ContractInterface } from "ethers";
import { constants } from "../@constants";

declare global {
  namespace Evm {
    type WalletType = "" | "metamask" | "trustwallet";
    type Type = "abi" | "contract" | "token";
    type Chain = valueof<typeof constants.web3.chains>;
    type ChainName = keyof typeof constants.web3.chains;

    type Contract = _Contract & {
      address: string;
      symbol: string;
      decimals: number;
      abi: _Contract;
    };
  }
}
