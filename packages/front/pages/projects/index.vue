<script setup lang="ts">
import { $auth, $wallet, $store } from "@stores";

const addressList = ref<Record<string, any>>({});

onMounted(async () => {});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="q-px-xl q-py-xs">
      <ListGrid>
        <CardProject id="1" />
        <CardProject id="2" />
        <CardProject id="3" />
        <CardProject id="4" />
        <CardProject id="5" />
      </ListGrid>
    </div>
  </NuxtLayout>
</template>
