<script setup lang="ts">
const props = defineProps<{
  size?: number;
  checkmark?: boolean;
}>();
const hasIcon = props.checkmark;
const size = props.size ? props.size + "px" : "20px";
</script>

<template>
  <div class="c-text-title text-title row">
    <Icon
      v-if="checkmark"
      src="checkmark.svg"
      class="col-2"
      :size="props.size ?? 32"
    />
    <div :class="{ 'col-10': hasIcon, col: !hasIcon }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.c-text-title {
  --size: v-bind(size);
}
</style>

<style lang="scss" scoped>
@import "assets/css";

.c-text-title {
  font-size: var(--size);
  font-weight: bold;
  .body--light & {
    color: $grey-10;
  }
  .body--dark & {
    color: $grey-4;
  }
}
</style>
