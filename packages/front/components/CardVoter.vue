<script setup lang="ts">
defineProps<{
  name: string;
  address: string;
  balance: number;
}>();
</script>
<template>
  <q-card flat bordered class="q-py-md q-px-lg">
    <div class="row justify-between q-py-sm">
      <div class="col-7 flex items-center q-gutter-md">
        <Avatar :src="address" :size="32" blockie />
        <div class="text-h6">{{ name }}</div>
      </div>
      <q-btn class="q-mt-sm" color="primary" rounded style="height: 40px"
        >トークン配布</q-btn
      >
    </div>
    <div class="row justify-between q-py-sm">
      <div class="col-7" style="white-space: wrap; word-break: break-all">
        {{ address }}
      </div>
      <div class="text-h5 q-mt-sm">
        {{ balance.toLocaleString() }}
        <small>USD</small>
      </div>
    </div>
  </q-card>
</template>
