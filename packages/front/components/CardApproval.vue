<script setup lang="ts">
import { tools } from "@tools";

const props = defineProps<{
  id: string;
  type?: "request" | "offer";
}>();

const type = props.type ?? "request";
const step = ref<number>(1);

const circularProgress = ref<number>(0);
onMounted(async () => {
  await tools.sleep(200);
  setInterval(() => {
    if (circularProgress.value < 81) {
      circularProgress.value += 1;
    }
  }, 5);
});
</script>

<template>
  <q-card flat bordered class="c-card-fuding q-my-lg">
    <q-card-section class="q-pt-lg q-pb-none flex items-center justify-between">
      <div class="row items-center">
        <Avatar blockie> </Avatar>
        <div class="q-px-md text-h6">出資オファー</div>
      </div>
      <div class="row items-center">
        <div class="col">
          ステーキング総数 1,000 トークン中 800 トークンの署名がありました
        </div>
        <q-circular-progress
          show-value
          font-size="12px"
          :value="circularProgress"
          size="60px"
          :thickness="0.3"
          color="teal"
          track-color="grey-3"
          class="q-ma-md"
        >
          {{ circularProgress }}%
        </q-circular-progress>
      </div>
    </q-card-section>
    <q-card-section class="row items-center justify-between">
      <!-- <div class="q-pt-sm flex items-center">
        <q-icon name="person" />
        <div class="q-ml-xs">ねこねこ さん</div>
      </div> -->
      <div class="q-pt-sm row items-center">
        <q-icon name="timer" />
        <div class="q-ml-xs">承認時限 1000 Block （8時間40分）</div>
      </div>
      <div class="q-pt-sm row items-center">
        <q-icon name="donut_large" />
        <div class="q-ml-xs">ステータス</div>
        <q-badge rounded class="q-ml-md q-px-md q-py-sm" color="warning"
          >承認待ち</q-badge
        >
      </div>
    </q-card-section>
    <q-separator inset />

    <q-card-section>
      <q-stepper v-model="step" vertical color="primary" animated>
        <q-step :name="1" title="Step 1"> 100 USD </q-step>
        <q-step :name="1" title="Step 2"> 200 USD </q-step>
        <q-step :name="1" title="Step 3"> 300 USD </q-step>
      </q-stepper>
    </q-card-section>
    <q-separator inset />

    <q-card-section class="row items-center justify-center">
      <q-btn color="primary" label="署名する" />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-card-funding {
  &__content {
    position: relative;
    padding: 12px;
    padding-top: 32px;

    &__avatar {
      position: absolute;
      width: 48px;
      height: 48px;
      top: -24px;
      left: 0;
      right: 0;
      margin: auto;
    }

    &__abstract {
      white-space: wrap;
      word-break: break-all;
    }

    &__stat {
      .q-item__section {
        justify-content: left !important;
      }
      .q-item__label {
        font-size: 0.8em;
      }
    }
  }
}
</style>
