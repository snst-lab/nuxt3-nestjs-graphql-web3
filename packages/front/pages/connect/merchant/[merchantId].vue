<script setup lang="ts">
import { $loading, $store } from "@stores";

const router = useRouter();
const { params } = useRoute();
const { merchantId } = params;

onMounted(() => {
  try {
    $loading().show();
    useValidate().userId(merchantId);
    $store().set({ merchant_id: merchantId });
  } catch {
    $store().set({ merchant_id: "000000000000" });
  } finally {
    router.replace(`/connect/`);
    $loading().hide();
  }
});
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
