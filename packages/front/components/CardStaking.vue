<script setup lang="ts">
import { $dialog } from "@stores";

const props = defineProps();
</script>

<template>
  <q-card class="c-card-staking">
    <q-card-section class="q-px-none">
      <div class="c-card-staking__head q-px-md">
        <AvatarMenu
          class="cursor-pointer"
          src="~/assets/icons/3rdparty/mstable.png"
          :size="36"
        />
        <div class="c-card-staking__head__chain cursor-pointer">
          <AvatarMenu
            class="cursor-pointer"
            src="~/assets/icons/chain/polygon.webp"
            :size="24"
          />
          <div class="q-px-sm">polygon</div>
        </div>
      </div>
      <p class="c-card-staking__head__title q-px-md q-pt-sm q-pb-md">
        mStable imUSD Strategy
      </p>
    </q-card-section>
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
    <q-card-section class="c-card-staking__stat q-pb-none">
      <div>
        <p class="c-card-staking__stat__label">Num of Staking</p>
        <TextNumber :value="99999999" unit="人" />
      </div>
      <div>
        <p class="c-card-staking__stat__label">Staking Amount</p>
        <TextNumber :value="99999999" unit="円" />
      </div>
      <div>
        <p class="c-card-staking__stat__label text-blue">APY</p>
        <TextNumber class="text-blue" :value="30" unit="%" />
      </div>
    </q-card-section>
    <q-card-section class="row q-gutter-x-md">
      <q-btn
        rounded
        color="primary"
        class="col"
        @click="$dialog().show('staking', { scheme: 'add' })"
        >追加</q-btn
      >
      <q-btn
        rounded
        color="grey-6"
        class="col"
        @click="$dialog().show('staking', { scheme: 'reduce' })"
        >削減</q-btn
      >
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-card-staking {
  border: 1px solid $grey-4;
  border-radius: 1em;
  box-shadow: none;
  &__head {
    display: flex;
    align-items: center;
    &__title {
      width: 100%;
      font-weight: 500;
      border-bottom: 1px solid $grey-4;
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

  &__stat {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;

    &__label {
      font-size: 0.8em;
      padding-bottom: 4px;
    }
  }
}
</style>
