<script setup lang="ts">
const props = defineProps<{
  name: string;
  title?: string;
  width?: number;
  padding?: number;
  persist?: boolean;
  onHide?: () => void;
  buttons: {
    label: string;
    color: string;
    icon?: string;
    action: () => void;
  }[];
}>();
</script>

<template>
  <Dialog
    :name="name"
    :title="title"
    :width="width"
    :padding="padding"
    :persist="persist"
    :onHide="onHide"
  >
    <div class="c-dialog-with-button">
      <slot />
      <div class="c-dialog-with-button__inner">
        <q-btn
          v-for="(e, i) in buttons"
          rounded
          :color="e.color"
          :icon="e.icon"
          class="q-ma-sm"
          @click="e.action"
        >
          {{ e.label }}
        </q-btn>
      </div>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-dialog-with-button {
  &__inner {
    display: flex;
    justify-content: space-around;
    padding: 10px;

    & > .q-btn {
      width: 100%;
    }
  }
}
</style>
