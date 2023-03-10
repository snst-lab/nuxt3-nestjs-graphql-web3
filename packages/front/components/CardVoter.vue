<script setup lang="ts">
defineProps<{
  name: string;
  evm_address: string;
  max_voteable: number;
  pending_airdrop: number;
  pending_reconcile: number;
  token_balance: number;
}>();
</script>
<template>
  <q-card flat bordered class="q-py-md q-px-lg">
    <div class="row justify-between q-py-xs">
      <div class="col-7 flex items-center q-gutter-md">
        <Avatar :src="evm_address" :size="32" blockie />
        <div class="text-h6">{{ name }}</div>
      </div>
      <q-btn
        class="q-mt-sm"
        color="primary"
        rounded
        style="height: 40px"
        :disabled="pending_reconcile === 0"
        >投票取消後再配布</q-btn
      >
    </div>
    <div class="row justify-between q-py-sm">
      <div class="col-12" style="white-space: wrap; word-break: break-all">
        {{ evm_address }}
      </div>
    </div>
    <dl class="row justify-between items-center q-pt-sm">
      <dt class="col-4" style="white-space: wrap; word-break: break-all">
        残高
      </dt>
      <dd class="col-8 text-h6 text-right">
        {{ token_balance.toLocaleString() }}
        <small>USD</small>
      </dd>
    </dl>
    <dl class="row justify-between items-center q-pt-xs">
      <dt class="col-4" style="white-space: wrap; word-break: break-all">
        最大投票可能数
      </dt>
      <dd class="col-8 text-h6 text-right">
        {{ max_voteable.toLocaleString() }}
        <small>USD</small>
      </dd>
    </dl>
    <dl class="row justify-between items-center q-pt-xs">
      <dt class="col-4" style="white-space: wrap; word-break: break-all">
        エアドロップ待ち
      </dt>
      <dd class="col-8 text-h6 text-right">
        {{ pending_airdrop.toLocaleString() }}
        <small>USD</small>
      </dd>
    </dl>
    <dl class="row justify-between items-center q-pt-xs">
      <dt class="col-4" style="white-space: wrap; word-break: break-all">
        投票取消後再配布待ち
      </dt>
      <dd class="col-8 text-h6 text-right">
        {{ pending_reconcile.toLocaleString() }}
        <small>USD</small>
      </dd>
    </dl>
  </q-card>
</template>
