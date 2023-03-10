<script setup lang="ts">
import { $auth, $loading } from "@stores";

const route = useRoute();
const isButtonShow = ref<boolean>(false);

onMounted(async () => {
  try {
    $loading().show();
    if (!route.query.code) {
      $auth().login("google");
    } else {
      $auth().fetchToken();
    }
  } catch (e) {
    $loading().hide();
    isButtonShow.value = true;
  }
});
watch(
  () => $auth().token,
  async (after) => {
    if (after) {
      await $auth().fetchProfile();
      await $auth().restoreUrl();
      $loading().hide();
    }
  }
);
</script>

<template>
  <NuxtLayout name="blank">
    <ButtonSocialLogin
      v-show="isButtonShow"
      provider="google"
      @click="$auth().login('google')"
    />
  </NuxtLayout>
</template>
