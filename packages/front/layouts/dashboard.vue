<script setup lang="ts">
import { Dark, Screen, colors } from "quasar";
import { $dialog, $loading, $auth, $wallet } from "@stores";
const { getPaletteColor } = colors;
const css = useScssVars();

const isDrawerOpen = ref<boolean>(false);
const isDrawerMin = ref<boolean>(false);
const drawerBehavior = ref<"desktop" | "mobile">("desktop");
const drawerContents = [
  {
    icon: "inbox",
    label: "トップ",
    action: () => {
      navigateTo("/");
    },
  },
  // {
  //   icon: "inbox",
  //   label: "Connect",
  //   action: () => {
  //     navigateTo("/connect/");
  //   },
  // },
  // {
  //   icon: "inbox",
  //   label: "Login",
  //   action: () => {
  //     navigateTo("/login/");
  //   },
  // },
  {
    icon: "inbox",
    label: "プロジェクト一覧",
    action: () => {
      navigateTo("/projects/");
    },
  },
  {
    icon: "inbox",
    label: "PHASE1",
    sub: true,
    action: () => {
      navigateTo("/projects/phase/PHASE1");
    },
  },
  {
    icon: "inbox",
    label: "PHASE2",
    sub: true,
    action: () => {
      navigateTo("/projects/phase/PHASE2");
    },
  },
  {
    icon: "inbox",
    label: "PHASE3",
    sub: true,
    action: () => {
      navigateTo("/projects/phase/PHASE3");
    },
  },
  {
    icon: "inbox",
    label: "FINAL",
    sub: true,
    action: () => {
      navigateTo("/projects/phase/FINAL");
    },
  },
  {
    icon: "inbox",
    label: "事務局用",
    action: () => {
      navigateTo("/admin/");
    },
  },
  {
    icon: "inbox",
    label: "ダッシュボード",
    sub: true,
    action: () => {
      navigateTo("/admin/");
    },
  },
  {
    icon: "inbox",
    label: "ホワイトリスト",
    sub: true,
    action: () => {
      navigateTo("/admin/whitelist/");
    },
  },
];

const onEvent = {
  clickHamburger() {
    if (Screen.gt.sm) {
      isDrawerMin.value = !isDrawerMin.value;
    } else {
      isDrawerOpen.value = !isDrawerOpen.value;
    }
  },
  resize() {
    if (Screen.gt.sm) {
      drawerBehavior.value = "desktop";
    } else {
      drawerBehavior.value = "mobile";
    }
  },
};

onMounted(() => {});
</script>

<template>
  <NuxtLayout name="default">
    <div class="l-dashboard">
      <q-resize-observer debounce="100" @resize="onEvent.resize" />
      <q-layout view="lHh lpR lFf">
        <q-header reveal>
          <q-toolbar class="justify-between items-center">
            <q-btn flat @click="onEvent.clickHamburger" round icon="menu" />
            <InputSearch
              v-if="Screen.gt.sm"
              :style="{
                width: '30vw',
                minWidth: '200px',
                maxWidth: '500px',
              }"
            />
            <ul class="flex items-center q-gutter-x-lg q-pr-sm">
              <li
                v-if="Screen.gt.xs"
                @click="$dialog().show('wallet')"
                class="cursor-pointer"
              >
                <q-btn unelevated outline rounded color="primary">
                  <span
                    style="
                      width: 180px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{
                      $wallet().address.length
                        ? $wallet().address
                        : "CONNECT WALLET"
                    }}
                  </span>
                </q-btn>
              </li>
              <li
                v-if="Screen.gt.xs"
                @click="Dark.toggle"
                class="cursor-pointer"
              >
                <q-btn flat icon="light_mode" v-if="Dark.isActive" />
                <q-btn flat icon="dark_mode" v-else />
              </li>
              <li>
                <AvatarMenu :size="40" :src="$auth().profile.picture">
                  <q-item clickable @click="$dialog().show('wallet')">
                    <q-item-section class="col-2"
                      ><q-icon name="account_circle" color="green"
                    /></q-item-section>
                    <q-item-section>Connect Wallet</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="Dark.toggle">
                    <q-item-section class="col-2"
                      ><q-icon
                        :name="`${Dark.isActive ? 'light_mode' : 'dark_mode'}`"
                        color=""
                    /></q-item-section>
                    <q-item-section>{{
                      Dark.isActive ? "Switch Light Mode" : "Switch Dark Mode"
                    }}</q-item-section>
                  </q-item>
                </AvatarMenu>
              </li>
            </ul>
          </q-toolbar>
          <InputSearch
            v-if="!Screen.gt.sm"
            :style="{
              width: '100vw',
              minWidth: '200px',
            }"
          />
        </q-header>

        <q-drawer
          v-model="isDrawerOpen"
          :mini="isDrawerMin"
          :behavior="drawerBehavior"
          :width="200"
          :breakpoint="Number(css.sizeSm)"
          elevated
          show-if-above
          :style="{
            color: 'white',
            backgroundColor: Dark.isActive
              ? getPaletteColor('grey-10')
              : getPaletteColor('grey-9'),
          }"
        >
          <q-scroll-area class="fit">
            <q-list padding>
              <q-item
                v-for="(e, i) of drawerContents"
                clickable
                @click="e.action"
              >
                <div class="flex items-center" :class="{ submenu: e.sub }">
                  <q-icon name="inbox" />
                  <p class="q-pl-md">{{ e.label }}</p>
                </div>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>

        <q-page-container>
          <q-page :key="$loading().pageRenderKey">
            <slot />
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "assets/css";
.l-dashboard {
  .submenu {
    margin-left: 10px;
    opacity: 0.9;
  }
}
</style>
