<script setup lang="ts">
import { $dialog } from "@stores";

const props = defineProps();

const balance = ref<number>(2000);
const currentAmount = ref<number>(200);
const addAmount = ref<number>(0);
const afterreduceAmount = ref<number>(currentAmount.value);

const scheme = computed(() => {
  if ($dialog().args.staking) {
    return $dialog().args.staking.scheme === "add" ? "add" : "reduce";
  } else {
    return "add";
  }
});
</script>

<template>
  <Dialog
    name="staking"
    :title="`ステーキング量の${scheme === 'add' ? '追加' : '削減'}`"
    :onHide="
      () => {
        addAmount = 0;
        afterreduceAmount = currentAmount;
      }
    "
    :width="500"
  >
    <div class="c-dialog-staking">
      <q-card-section class="q-px-none q-pb-none">
        <div class="c-dialog-staking__head q-px-md">
          <AvatarMenu
            class="cursor-pointer"
            src="~/assets/icons/3rdparty/mstable.png"
            :size="36"
          />
          <div class="c-dialog-staking__head__chain cursor-pointer">
            <AvatarMenu
              class="cursor-pointer"
              src="~/assets/icons/chain/polygon.webp"
              :size="24"
            />
            <div class="q-px-sm">polygon</div>
          </div>
        </div>
        <p class="c-dialog-staking__head__title q-px-md q-pt-sm q-pb-md">
          mStable imUSD Strategy
        </p>
      </q-card-section>
      <q-separator class="q-my-sm" />
      <q-card-section class="row q-py-xs items-center">
        <p class="col">預かり資産</p>
        <div class="row items-center col">
          <AvatarMenu
            class="col-4"
            src="~/assets/icons/token/USDT.webp"
            :size="24"
          />
          <p class="col-8 q-pl-md text-bold">USDT</p>
        </div>
      </q-card-section>
      <q-card-section class="row q-py-xs items-center">
        <p class="col">報酬タイプ</p>
        <div class="row items-center col">
          <AvatarMenu
            class="col-4"
            src="~/assets/icons/token/USDC.webp"
            :size="24"
          />
          <p class="col-8 q-pl-md text-bold">USDC</p>
        </div>
      </q-card-section>
      <q-separator class="q-my-sm" />
      <q-card-section v-if="scheme === 'add'" class="q-pt-md q-pb-none q-px-lg">
        <InputAmount v-model:value="addAmount" :contrast="balance" />
      </q-card-section>
      <q-card-section v-else class="q-pt-md q-pb-none q-px-lg">
        <InputAmount
          v-model:value="afterreduceAmount"
          :contrast="currentAmount"
        />
      </q-card-section>
      <q-separator class="q-my-sm" />
      <q-card-section v-if="scheme === 'add'" class="q-py-sm q-px-lg flex">
        <p>ステーキング量</p>
        <div class="q-pl-lg">
          <p>変更前 : {{ currentAmount }} USDT</p>
          <p>変更後 : {{ currentAmount + addAmount }} USDT</p>
        </div>
      </q-card-section>
      <q-card-section v-else class="q-py-sm q-px-lg flex">
        <p>ウォレット残高</p>
        <div class="q-pl-lg">
          <p>変更前 : {{ balance }} USDT</p>
          <p>
            変更後 : {{ balance + (currentAmount - afterreduceAmount) }} USDT
          </p>
        </div>
      </q-card-section>
      <q-card-actions class="q-pb-lg">
        <q-btn
          v-if="scheme === 'add'"
          rounded
          color="primary"
          class="col q-mx-sm"
        >
          追加する
        </q-btn>
        <q-btn v-else rounded color="primary" class="col q-mx-sm">
          削減する
        </q-btn>
        <q-btn
          rounded
          color="grey-6"
          class="col q-mx-sm"
          @click="$dialog().hide('staking')"
          >キャンセル</q-btn
        >
      </q-card-actions>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-dialog-staking {
  padding: 0;
  width: 80vw;
  max-width: 500px;
  overflow: hidden;
  &__head {
    display: flex;
    align-items: center;
    &__title {
      width: 100%;
      font-weight: 500;
    }
    &__chain {
      display: inline-flex;
      padding-right: 0;
      justify-content: right;
      border-radius: 24px;
      margin-right: 0;
      margin-left: auto;
      background-color: $grey-2;
      .body--dark & {
        background-color: $grey-9;
      }
    }
  }
}
</style>
