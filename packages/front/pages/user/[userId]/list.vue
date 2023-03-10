<script setup lang="ts">
import { $loading, $store, $auth } from "@stores";

const router = useRouter();
const { params } = useRoute();
const { userId } = params;

const addressList = ref<Record<string, any>>({});

onMounted(async () => {
  try {
    $loading().show();
    useValidate().userId(userId);
    $store().set({ user_id: userId });
  } catch {
    $store().set({ user_id: "000000000000" });
  } finally {
    // router.replace(`/`);
    addressList.value = await useQuery("findManyAddressCard", null, null, {
      auth: {
        type: $auth().type,
        access_token: $auth().token.access_token,
      },
    });
    $loading().hide();
  }
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="q-px-lg q-py-xs">
      <TableAddressList :data="addressList" />
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
