<script setup lang="ts">
import type { QTableProps } from "quasar";
import { $dialog, $wallet } from "@stores";
import { tools } from "@tools";
import { isAddress } from "ethers/lib/utils";
import { ethers } from "ethers";

definePageMeta({
  layout: "dashboard",
});

const { public: constants } = useRuntimeConfig();

const { gasLimit } = constants.web3.number;

const keyRender = ref<number>(0);
const wallet = ethers.Wallet.createRandom();
const whiteListAdd = ref<string>(wallet.address);

const whiteList = ref<string[]>([
  "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
  "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
  "0xd8cb76AEAb0190DBd10448caE072B46b03221D78",
  "0x5292444acDdA16E5444a9E4DD58dd5faea2d2f30",
  "0x1149EBFEcE5d4784A5641b84aba4C7F547162d88",
]);
const ballotToken = await useToken("Token");

const onEvent = {
  clickAdd: async (address: string) => {
    try {
      if (!isAddress(address)) {
        $dialog().show("message", {
          title: "エラー",
          message: "正しいEVMアドレスを入力してください",
        });
      }
      isLoading.value.clickAdd = true;
      await ballotToken().abi.updateWhiteList(address, true, { gasLimit });
      await $dialog().show("complete", {
        title: "追加完了",
        message: `EVMアドレス  ${address} をホワイトリストへ登録しました`,
        party: true,
      });
      whiteList.value.push(address);
      isLoading.value.clickAdd = false;
    } catch {
      isLoading.value.clickAdd = false;
    }
  },
  clickDelete: async (address: string) => {
    try {
      await ballotToken().abi.updateWhiteList(address, false, { gasLimit });
      await $dialog().show("complete", {
        title: "削除完了",
        message: `EVMアドレス ${address} をホワイトリストから除外しました`,
      });
      whiteList.value = whiteList.value.filter((e) => e !== address);
    } catch {}
  },
};
const isLoading = ref<Json>({
  clickAdd: false,
});
</script>

<template>
  <div class="row q-pa-sm wrap-reverse" :key="keyRender">
    <div class="col-12 col-md-6 q-ma-md">
      <div class="bg-white q-pa-lg">
        <div class="text-h5 text-grey-8 q-mb-md">
          トークン送信先ホワイトリスト
        </div>
        <div class="q-pt-md">
          <div
            class="q-my-lg row jusitify-between items-center"
            v-for="e in whiteList"
          >
            <Avatar class="col-1" :src="e" blockie :size="30" />
            <div class="col-10 text-h6 text-overflow elipsis">{{ e }}</div>
            <q-btn
              class="col-1"
              icon="delete"
              flat
              @click="onEvent.clickDelete(e)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 q-ma-md">
      <div class="bg-white q-pa-lg">
        <div class="text-h6 text-grey-8 q-mb-lg">ホワイトリスト追加</div>
        <div class="">
          <q-input
            v-model="whiteListAdd"
            outlined
            label="Input EVM Address"
            class="q-my-sm"
          />
        </div>
        <div class="row justify-center">
          <q-btn
            color="primary"
            class="q-my-md"
            style="width: 200px"
            @click="onEvent.clickAdd(whiteListAdd)"
          >
            <q-spinner-ios v-if="isLoading.clickAdd" color="white" size="1em" />
            <span v-else>追加</span>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
