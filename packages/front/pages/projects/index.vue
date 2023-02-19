<script setup lang="ts">
import { $auth, $wallet, $store } from "@stores";

const addressList = ref<Record<string, any>>({});

onMounted(async () => {});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="q-px-xl q-py-xs">
      <ListGrid>
        <CardProject id="hoge" />
        <CardProject id="fuga" />
        <CardProject id="fuga" />
        <CardProject id="fuga" />
        <CardProject id="fuga" />
      </ListGrid>
    </div>
  </NuxtLayout>
</template>
