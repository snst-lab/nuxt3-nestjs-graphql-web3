import { defineStore } from "pinia";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { $dialog } from "@stores";
import { useMetamask } from "./useMetamask";
import { tools } from "@tools";

export type WalletStore = {
  getSigner: () => JsonRpcSigner;
  connect: () => JsonRpcSigner;
  switchChain: (chainId: string) => Promise<string>;
  switchAddress: () => Promise<string>;
};

const store: Record<Evm.WalletType, WalletStore> = {
  "": {} as WalletStore,
  metamask: useMetamask(),
  trustwallet: {} as WalletStore,
};

let signer: JsonRpcSigner | null;

const useWalletStore = defineStore("wallet", {
  state: () => ({
    type: "" as Evm.WalletType,
    chainId: 0,
    address: "",
  }),
  persist: {
    enabled: ["type", "chainId", "address"],
    lifetime: "session",
    scope: "global",
  },
  getters: {},
  actions: {
    getSigner(): JsonRpcSigner | null {
      try {
        if (!this.type) {
          throw new Error();
        }
        return store[this.type].getSigner();
      } catch {
        return null;
      }
    },
    connect(type?: Evm.WalletType): JsonRpcSigner | null {
      try {
        type = type ?? "metamask";
        const signer = store[type].connect();
        this.type = type;
        return signer;
      } catch {
        this.type = "";
        $dialog().show("message", {
          title: "エラー",
          message: "ウォレットに接続できませんでした",
        });
        return null;
      }
    },
    async switchChain(chainName: Evm.ChainName): Promise<string> {
      if (!this.type) {
        $dialog().show("message", {
          title: "エラー",
          message: "ウォレットに接続してください",
        });
        return "";
      }
      const config = useRuntimeConfig();
      const chain = (
        config.public.evm.chains as Record<Evm.ChainName, Evm.Chain>
      )[chainName];
      if (!chain) {
        $dialog().show("message", {
          title: "エラー",
          message: `${String(chainName)} チェーンには対応しておりません`,
        });
        return "";
      }
      if (this.chainId === chain.chainId) {
        $dialog().show("message", {
          title: "",
          message: `${chain.title} チェーンが既に選択されています`,
        });
        return "";
      }
      return await store[this.type].switchChain(chain);
    },
    async switchAddress(): Promise<string> {
      if (!this.type) {
        $dialog().show("message", {
          title: "エラー",
          message: "ウォレットに接続してください",
        });
        return "";
      }
      return await store[this.type].switchAddress();
    },
    async getBalance(token?: (userType?: Evm.UserType) => Evm.Contract) {
      if (!token) {
        const signer =
          (await this.getSigner()) ?? (await this.connect(this.type));
        const rawBalance = await signer?.getBalance(this.address);

        return Number(rawBalance?.toString()) / 10 ** 18;
      } else {
        return (
          Number((await token().abi.balanceOf($wallet().address)).toString()) /
          10 ** token().decimals
        );
      }
    },
    async createSignature(message?: string) {
      const signer =
        (await this.getSigner()) ?? (await this.connect(this.type));
      message = message || tools.random.string();
      return {
        message,
        address: await signer?.getAddress(),
        signature: await signer?.signMessage(message),
      };
    },
  },
});
export const $wallet = () => useWalletStore();
