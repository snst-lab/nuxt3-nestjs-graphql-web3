import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { $wallet, WalletStore } from ".";

export function useMetamask(): WalletStore {
  interface MetaMask extends Window {
    ethereum: any;
  }
  const { ethereum } = window as MetaMask & typeof globalThis;

  ethereum.on("accountsChanged", async (accounts: string[]) => {
    $wallet().address = accounts[0];
  });
  ethereum.on("chainChanged", (chainId: string) => {
    window.location.reload();
  });

  function checkInstalled() {
    if (Boolean(ethereum && ethereum.isMetaMask)) {
      return true;
    } else {
      // インストール導線
      return false;
    }
  }

  async function connect(): Promise<JsonRpcSigner> {
    try {
      if (!checkInstalled()) {
        return {} as JsonRpcSigner;
      }
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      $wallet().address = await signer.getAddress();
      return signer;
    } catch (error) {
      console.log(error);
      return {} as JsonRpcSigner;
    }
  }

  async function getSigner(): Promise<JsonRpcSigner> {
    try {
      if (!checkInstalled()) {
        return {} as JsonRpcSigner;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      $wallet().address = await signer.getAddress();
      return signer;
    } catch (error) {
      console.log(error);
      return {} as JsonRpcSigner;
    }
  }

  async function switchChain(chain: Evm.Chain) {
    try {
      if (!checkInstalled()) {
        return;
      }
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chain.chainId.toString(16) }],
      });
      return chain.name;
    } catch (error) {
      if ((error as { code: number }).code === 4902) {
        await addChain(chain);
      }
      console.log(error);
    }
  }

  async function addChain(chain: Evm.Chain) {
    try {
      if (!checkInstalled()) {
        return "";
      }
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain.chainId.toString(16),
            chainName: chain.title,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: [chain.rpc.baseUrl],
            blockExplorerUrls: [chain.explorer.baseUrl],
          },
        ],
      });
      return chain.name;
    } catch (error) {
      console.log(error);
    }
  }

  async function switchAddress() {
    try {
      if (!checkInstalled()) {
        return "";
      }
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts || accounts.length < 1) {
        throw new Error();
      }
      return accounts[0];
    } catch (error) {
      console.log(error);
    }
  }

  return {
    connect,
    getSigner,
    switchAddress,
    switchChain,
  };
}
