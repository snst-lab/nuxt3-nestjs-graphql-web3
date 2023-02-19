import { defineStore } from "pinia";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { $dialog } from "@stores";
import { useMetamask } from "./useMetamask";
import { tools } from "@tools";

export type WalletStore = {
  connect: () => Promise<JsonRpcSigner>;
  getSigner: () => Promise<JsonRpcSigner>;
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
    async connect(type?: Evm.WalletType): Promise<JsonRpcSigner | null> {
      try {
        type = type ?? this.type;
        if (!type) {
          throw new Error();
        }
        this.type = type;
        return await store[type].connect();
      } catch {
        this.type = "";
        $dialog().show("message", {
          title: "エラー",
          message: "ウォレットに接続できませんでした",
        });
        return null;
      }
    },
    async getSigner(): Promise<JsonRpcSigner | null> {
      try {
        if (!this.type) {
          throw new Error();
        }
        return await store[this.type].getSigner();
      } catch {
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
    async getBalance(address: string) {
      const signer =
        (await this.getSigner()) ?? (await this.connect(this.type));
      return await signer?.getBalance(address);
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
