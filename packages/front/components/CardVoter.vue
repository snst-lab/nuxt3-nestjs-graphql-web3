<script setup lang="ts">
import { isAddress } from "ethers/lib/utils";

const props = defineProps<{
  name: string;
  evm_address: string;
  max_voteable: number;
  pending_airdrop: number;
  pending_reconcile: number;
  reward: number;
}>();

async function getTokenBalance(voterAddress: string): Promise<number> {
  if (isAddress(voterAddress)) {
    const ballotToken = await useToken("Token");
    const amount = await ballotToken(voterAddress).abi.balanceOf(voterAddress);
    return Number(amount.toString()) / 10 ** ballotToken().decimals;
  }
  return 0;
}

const tokenBalance = ref<number>(0);

onMounted(async () => {
  tokenBalance.value = await getTokenBalance(props.evm_address);
});
</script>
<template>
  <q-card flat bordered class="q-py-md q-px-lg">
    <div class="row justify-between q-py-xs">
      <div class="col-7 flex items-center q-gutter-md no-wrap">
        <Avatar :src="evm_address" :size="32" blockie />
        <div class="ellipsis">{{ evm_address }}</div>
      </div>
      <!-- <q-btn
        class="q-my-sm"
        color="primary"
        rounded
        style="height: 40px"
        :disabled="pending_reconcile === 0"
        >投票取消後再配布</q-btn
      > -->
    </div>
    <div class="text-h6">{{ name }}</div>
    <dl class="row justify-between items-center q-pt-sm">
      <dt class="col-4" style="white-space: wrap; word-break: break-all">
        残高
      </dt>
      <dd class="col-8 text-h6 text-right">
        {{ tokenBalance.toLocaleString() }}
        <small>USD</small>
      </dd>
    </dl>
    <!-- <dl class="row justify-between items-center q-pt-xs">
      <dt class="col-4" style="white-space: wrap; word-break: break-all">
        最大投票可能数
      </dt>
      <dd class="col-8 text-h6 text-right">
        {{ max_voteable.toLocaleString() }}
        <small>USD</small>
      </dd>
    </dl> -->
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
        審査員報酬額計
      </dt>
      <dd class="col-8 text-h6 text-right">
        {{ reward.toLocaleString() }}
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
