import { PiniaPluginContext, StateTree } from "pinia";
import cookie from "js-cookie";

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions;
  }
}

type PersistOptions =
  | {
      enabled: boolean | string[];
      lifetime?: "session" | "long" | "permanent" | number;
      scope?: "global" | "page" | "subpages" | string;
      exclude?: string[];
    }
  | true;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use((context: PiniaPluginContext) => {
    const {
      options: { persist },
      store,
    } = context;
    const route = useRoute();
    const isEnabled =
      (persist && persist === true) ||
      (persist && persist !== true && persist.enabled);
    const storeKey = "pinia_" + store.$id;

    function restoreStorageValue(storageValue: any, cookieSavedPath: string) {
      if (
        persist &&
        persist !== true &&
        persist.scope &&
        typeof persist.scope === "string"
      ) {
        switch (persist.scope) {
          case "global":
            return JSON.parse(storageValue);
          case "page":
            if (route.path === cookieSavedPath) {
              return JSON.parse(storageValue);
            }
            return null;
          case "subpages":
            if (route.path.startsWith(cookieSavedPath)) {
              return JSON.parse(storageValue);
            }
            return null;
          default:
            if (route.path.startsWith(persist.scope)) {
              return JSON.parse(storageValue);
            }
            return null;
        }
      }
      return JSON.parse(storageValue);
    }

    store.$patch(
      (() => {
        try {
          if (!isEnabled) {
            localStorage.removeItem(storeKey);
            cookie.remove(storeKey);
            throw null;
          }
          const storageValue = localStorage.getItem(storeKey);
          const cookieSavedPath = cookie.get(storeKey);

          if (storageValue != null && cookieSavedPath) {
            return restoreStorageValue(storageValue, cookieSavedPath);
          }
          if (storageValue != null && !cookieSavedPath) {
            localStorage.removeItem(storeKey);
            throw null;
          }
          if (storageValue == null && cookieSavedPath) {
            cookie.remove(storeKey);
            throw null;
          }
        } catch (e) {
          return null;
        }
      })()
    );
    store.$onAction(
      ({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, // hook if the action throws or rejects
      }) => {
        after(() => {
          try {
            if (!isEnabled) {
              throw null;
            }
            if (persist === true) {
              cookie.set(storeKey, route.path, {
                sameSite: "strict",
                secure: true,
              });
              localStorage.setItem(
                storeKey,
                JSON.stringify(store.$state as StateTree)
              );
              return;
            }
            if (typeof persist.lifetime === "number") {
              cookie.set(storeKey, route.path, {
                expires: persist.lifetime,
                sameSite: "strict",
                secure: true,
              });
              localStorage.setItem(
                storeKey,
                JSON.stringify(
                  store.$state as StateTree,
                  Array.isArray(persist.enabled) ? persist.enabled : undefined
                )
              );
              return;
            }
            if (typeof persist.lifetime === "string") {
              switch (persist.lifetime) {
                case "long":
                  cookie.set(storeKey, route.path, {
                    expires: 7,
                    sameSite: "strict",
                    secure: true,
                  });
                  break;
                case "session":
                  cookie.set(storeKey, route.path, {
                    sameSite: "strict",
                    secure: true,
                  });
                  break;
                default:
              }
              localStorage.setItem(
                storeKey,
                JSON.stringify(
                  store.$state as StateTree,
                  Array.isArray(persist.enabled) ? persist.enabled : undefined
                )
              );
              return;
            }
          } catch (e) {}
        });
      }
    );
  });
});
