<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <NuxtLayout name="box-right">
    <ImageLogo />
    <q-carousel
      class="p-carousel"
      v-model="route.name"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      :navigation="false"
      navigation-position="bottom"
      control-color="secondary"
    >
      <q-carousel-slide name="login">
        <NuxtPage />
      </q-carousel-slide>
      <q-carousel-slide name="login-complete">
        <NuxtPage />
      </q-carousel-slide>
    </q-carousel>
  </NuxtLayout>
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
