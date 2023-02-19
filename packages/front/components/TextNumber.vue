<script setup lang="ts">
import { useSlots } from "@vue/runtime-core";

const props = defineProps<{
  value: number;
  unit?: string;
  locale?: string;
}>();

let value = "";
let unit = props.unit ?? "";

switch (props.locale) {
  case "us":
    if (props.value < 1000) {
      value = (Math.floor(props.value * 10) * 0.1).toLocaleString();
      unit = " " + unit;
    } else if (1000 <= props.value && props.value < 1000000) {
      value = (Math.floor(props.value * 0.01) * 0.1).toLocaleString();
      unit = " k" + unit;
    } else if (1000000 <= props.value) {
      value = (Math.floor(props.value * 0.00001) * 0.1).toLocaleString();
      unit = " m" + unit;
    }
    break;
  default:
    if (props.value < 10000) {
      value = (Math.floor(props.value * 10) * 0.1).toLocaleString();
      unit = " " + unit;
    } else if (10000 <= props.value && props.value < 100000000) {
      value = (Math.floor(props.value * 0.001) * 0.1).toLocaleString();
      unit = " 万" + unit;
    } else if (100000000 <= props.value) {
      value = (Math.floor(props.value * 0.0000001) * 0.1).toLocaleString();
      unit = " 億" + unit;
    }
}
</script>

<template>
  <span class="c-text-number">
    <span class="c-text-number__value">{{ value }}</span>
    <span class="c-text-number__unit">{{ unit }}</span>
  </span>
</template>

<style lang="scss" scoped>
@import "assets/css";

.c-text-number {
  line-height: 1.5;
  font-weight: bold;

  &__value {
    font-size: 1.2em;
  }
  &__unit {
    font-size: 0.9em;
  }
}
</style>
