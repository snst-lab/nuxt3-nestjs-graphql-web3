import { defineStore } from "pinia";
import { useGoogleAuth } from "./useGoogleAuth";

export type AuthStore = {
  login: () => void;
  fetchToken: () => Promise<{
    id_token: string;
    access_token: string;
    refresh_token: string;
  } | null>;
  refreshToken: () => Promise<{
    id_token: string;
    access_token: string;
    refresh_token: string;
  } | null>;
  fetchProfile: (access_token: string) => Promise<{
    email: string;
    name: string;
    picture: string;
  } | null>;
};

const store: Record<Auth.AuthType, AuthStore> = {
  "": {} as AuthStore,
  email: {} as AuthStore,
  google: useGoogleAuth(),
};

const useAuthStore = defineStore("auth", {
  state: () => ({
    type: "" as Auth.AuthType,
    token: {
      id_token: "",
      access_token: "",
      refresh_token: "",
    },
    profile: {
      social_id: "",
      picture: "",
      user_id: "",
      email: "",
      name: "",
      last_name: "",
      first_name: "",
      tel: "",
      zip1: "",
      zip2: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
    },
    url: "",
  }),
  persist: {
    enabled: true,
    lifetime: "session",
    scope: "global",
  },
  getters: {},
  actions: {
    async login(type: Auth.AuthType): Promise<void | null> {
      try {
        type = type || this.type;
        if (!type) {
          throw new Error();
        }
        this.type = type;
        await store[type].login();
      } catch {
        this.type = "";
        return null;
      }
    },
    async fetchToken(): Promise<{
      id_token: string;
      access_token: string;
      refresh_token: string;
    } | null> {
      if (!this.type) {
        return null;
      }
      const token = await store[this.type].fetchToken();
      if (!token) {
        return null;
      }
      return (this.token = token);
    },
    async refreshToken(): Promise<{
      id_token: string;
      access_token: string;
      refresh_token: string;
    } | null> {
      if (!this.type) {
        return null;
      }
      const token = await store[this.type].refreshToken();
      if (!token) {
        return null;
      }
      return (this.token = token);
    },
    async fetchProfile(): Promise<{
      email: string;
      name: string;
      picture: string;
    } | null> {
      const profile = await store[this.type].fetchProfile(
        this.token.access_token
      );
      if (!profile) {
        return null;
      }
      return Object.assign(this.profile, profile);
    },
    saveUrl(url?: string) {
      url = url || window.location.href;
      this.url = url;
    },
    restoreUrl() {
      if (this.url) {
        window.location.href = this.url;
        this.url = "";
      }
    },
  },
});
export const $auth = () => useAuthStore();
