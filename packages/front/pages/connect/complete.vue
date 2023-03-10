<script setup lang="ts">
import { $wallet, $auth, $store } from "@stores";
import { Dark } from "quasar";
import { tools } from "@tools";

const router = useRouter();

onMounted(() => {});
const onEvent = {
  clickNext: async () => {
    router.push(`/`);
  },
  clickBack: () => {
    router.push(`/connect/confirm/`);
  },
};
const color = {
  text: Dark.isActive ? "#ddd" : "#333",
  bg: Dark.isActive ? "#333" : "#ddd",
};

onMounted(async () => {
  $store().clear("merchant_id");
  await tools.sleep(500);
  party.confetti(document.querySelector(".party"));
  await tools.sleep(3000);
  party.confetti(document.querySelector(".party"));
});
</script>

<template>
  <div class="column items-center q-mt-md">
    <TextTitle class="q-mb-xl party" checkmark
      >EVMアドレスの紐づけが完了しました
    </TextTitle>
    <AvatarLabel
      :text="$auth().profile.email"
      :src="`/_nuxt/assets/icons/social/${$auth().type}.svg`"
      :srcRight="$auth().profile.picture"
      :bgColor="color.bg"
      :color="color.text"
      borderColor="transparent"
      shadow
      @click=""
    />
    <q-icon name="more_vert" color="grey-5" size="36px" class="q-my-md" />
    <AvatarLabel
      :text="$wallet().address"
      :src="$wallet().address"
      :bgColor="color.bg"
      :color="color.text"
      borderColor="transparent"
      blockie
      shadow
      @click=""
    />
    <Button
      class="q-mt-xl"
      bgColor="primary"
      color="white"
      borderColor="transparent"
      @click="onEvent.clickNext"
    >
      トップ画面へ
    </Button>
  </div>
</template>

<style lang="scss" scoped></style>
