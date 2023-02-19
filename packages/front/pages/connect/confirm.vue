<script setup lang="ts">
import { $wallet, $auth, $store } from "@stores";
import { Dark } from "quasar";

const router = useRouter();

const merchant_id = $store().get("merchant_id") ?? "000000000000";

onMounted(() => {
  if (!$auth().profile.social_id) {
    router.replace(`/connect/`);
  }
  if (!$wallet().address) {
    router.replace(`/connect/usewallet/`);
  }
});
const onEvent = {
  clickNext: async () => {
    try {
      await useMutation(
        "upsertAddressCard",
        {
          data: {
            merchant_id,
            auth_type: $auth().type,
            social_id: $auth().profile.social_id,
            evm_address: $wallet().address,
          },
        },
        null,
        {
          auth: {
            type: $auth().type,
            access_token: $auth().token.access_token,
          },
          ether: await $wallet().createSignature(),
        }
      );
      router.push(`/connect/complete/`);
    } catch {}
  },
  clickBack: () => {
    router.push(`/connect/usewallet/`);
  },
};

const color = {
  text: Dark.isActive ? "#ddd" : "#333",
  bg: Dark.isActive ? "#333" : "#ddd",
};
onMounted(() => {});
</script>

<template>
  <div class="column items-center q-mt-md">
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
    <q-icon name="north" color="grey-5" size="36px" class="q-my-md" />
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
      Connect
    </Button>
    <Button
      class="q-mt-md"
      bgColor="gray"
      color="white"
      borderColor="transparent"
      @click="onEvent.clickBack"
    >
      Back
    </Button>
  </div>
</template>

<style lang="scss" scoped></style>
