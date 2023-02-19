<script setup lang="ts">
import { $auth } from "@stores";

const router = useRouter();

const onEvent = {
  clickSocial: {
    google: () => $auth().saveUrl(`/connect/usewallet/`),
  },
  clickCreateAccount: () => {
    router.push(`/connect/signup/`);
  },
  clickLogin: () => {
    router.push(`/connect/login/`);
  },
};

onMounted(() => {});
</script>

<template>
  <TextLabel> Continue With </TextLabel>
  <ButtonSocialLogin
    provider="google"
    small
    @click="onEvent.clickSocial.google"
    class="q-mt-md"
  />
  <TextSeparator class="q-mt-md">Or</TextSeparator>
  <div class="column items-center">
    <Button
      bgColor="primary"
      color="white"
      borderColor="transparent"
      @click="onEvent.clickLogin"
      class="q-mt-md"
    >
      Login
    </Button>
    <Button
      bgColor="secondary"
      color="white"
      borderColor="transparent"
      @click="onEvent.clickCreateAccount"
      class="q-mt-md"
    >
      Create Account
    </Button>
  </div>
</template>

<style lang="scss" scoped></style>
