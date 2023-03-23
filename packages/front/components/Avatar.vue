<script setup lang="ts">
import { tools } from "@tools";

const props = defineProps<{
  src?: string | null;
  size?: number | null;
  outline?: boolean | null;
  shadow?: boolean | null;
  blockie?: boolean | null;
}>();

const src = ref<string>(
  (() => {
    if (props.blockie && props.src) {
      return useBlockies(props.src);
    } else if (!props.src) {
      return useBlockies();
    } else {
      return props.src;
    }
  })()
);

const size = props.size ?? 48;
const borderWidth = props.outline ? 4 : 0;
const shadowColorLight = props.shadow ? "#bbb" : "transparent";
const shadowColorDark = props.shadow ? "#333" : "transparent";
</script>

<template>
  <div class="c-avatar">
    <Image :src="src" :size="size" class="c-avatar__figure" external />
    <div class="c-avatar__slot">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.c-avatar {
  --size: v-bind(size + "px");
  --borderWidth: v-bind(borderWidth + "px");
  --shadowColorLight: v-bind(shadowColorLight);
  --shadowColorDark: v-bind(shadowColorDark);
}
</style>

<style lang="scss" scoped>
.c-avatar {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  &__figure {
    z-index: 0;
    outline: var(--borderWidth) solid white;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    .body--light & {
      box-shadow: 4px 4px 8px var(--shadowColorLight);
    }
    .body--dark & {
      box-shadow: 4px 4px 8px var(--shadowColorDark);
    }
  }

  &__slot {
    position: absolute;
  }
}
</style>
