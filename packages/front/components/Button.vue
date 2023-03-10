<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  small?: boolean;
  inset?: boolean;
}>();

const color = ref<string>(useColor(props.color));
const bgColor = ref<string>(useColor(props.bgColor));
const borderColor = ref<string>(useColor(props.borderColor));
</script>
<template>
  <div
    class="c-button flex"
    :style="`color:${color}; background-color: ${bgColor}; border: 1px solid ${borderColor}`"
  >
    <Icon class="c-button__icon block" :src="icon" />
    <p v-if="!small" class="c-button__text text-center full-width q-px-md">
      <slot />
    </p>
  </div>
</template>
<style scoped>
.c-button {
  --width: v-bind(small ? "60px": "100%");
  --height: v-bind(small ? "60px": "auto");
  --borderRadius: v-bind(small ? "50%": "36px");
  --padding: v-bind(small ? "0": "0 24px");
  --inset: v-bind(inset ? "inset": "");
}
</style>
<style lang="scss" scoped>
@import "assets/css";

.c-button {
  cursor: pointer;
  border: 1px solid $grey-3;
  border-radius: var(--borderRadius);
  width: var(--width);
  height: var(--height);
  padding: var(--padding);
  max-width: 320px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-wrap: nowrap;
  transition: 0.2s;
  .body--light & {
    box-shadow: 0 0 3px $grey-5 var(--inset);
    &:hover {
      box-shadow: 0 0 10px $grey-5 var(--inset);
      filter: brightness(1.1);
    }
  }
  .body--dark & {
    box-shadow: 0 0 3px $grey-7 var(--inset);
    &:hover {
      box-shadow: 0 0 10px $grey-7 var(--inset);
      filter: brightness(1.1);
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin: auto;
  }
  &__text {
    font-size: 16px;
    margin: auto;
    white-space: wrap;
  }
}
</style>
