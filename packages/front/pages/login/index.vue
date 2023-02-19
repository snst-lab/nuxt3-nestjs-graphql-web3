<script setup lang="ts">
import { $auth } from "@stores";

const onEvent = {
  clickSocial: {
    google: () => $auth().saveUrl(`/login/complete/`),
  },
};
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
</template>

<style lang="scss" scoped>
@import "assets/css";

.p-carousel {
  background-color: transparent;
  padding-bottom: 60px;
  height: auto;
  .q-carousel__slide {
    overflow: hidden;
    padding: 0 !important;
  }
}
</style>
