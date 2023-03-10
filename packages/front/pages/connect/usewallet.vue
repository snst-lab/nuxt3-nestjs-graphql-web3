<script setup lang="ts">
import { $auth, $wallet } from "@stores";

const router = useRouter();

onMounted(async () => {
  if (!$auth().profile.email) {
    router.replace(`/connect/`);
  }
});
const onEvent = {
  connectWallet: async () => {
    if ($auth().profile.social_id && $wallet().address) {
      router.push(`/connect/confirm/`);
    }
  },
  clickBack: () => {
    router.push(`/connect/`);
  },
};
</script>
<template>
  <ListWallet :callback="onEvent.connectWallet" />
  <div class="column items-center">
    <Button
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
