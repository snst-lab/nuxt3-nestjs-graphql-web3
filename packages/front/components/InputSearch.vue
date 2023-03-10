<script setup lang="ts">
import { $search } from "@stores";

const props = defineProps();
const emit = defineEmits(["update:value"]);

class Button {
  static click() {}
}

watch(
  () => $search().keyword,
  () => {
    console.log($search().keyword);
  }
);
</script>

<template>
  <div class="c-input-search">
    <div class="c-input-search__field">
      <q-icon class="c-input-search__field__icon" name="search" />
      <input
        class="c-input-search__field__input"
        type="tel"
        v-model="$search().keyword"
      />
    </div>
    <div class="c-input-search__buttons" @click.stop="Button.click()">
      <q-icon class="c-input-search__buttons__icon" name="chevron_right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";

.c-input-search {
  display: flex;
  &__field {
    position: relative;
    // border-radius: 4px 0 0 4px;
    width: 100%;

    &__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      color: white;
      .body--light & {
        color: $grey-9;
      }
    }
    &__input {
      width: 100%;
      padding: 8px 10px 8px 50px;
      // border-radius: 2px;
      outline: 2px solid transparent;
      transition: 0.2s;
      color: white;
      background-color: $grey-10;
      border-top: 1px solid $grey-9;
      border-bottom: 1px solid $grey-9;
      border-left: 1px solid $grey-9;
      border-right: none;
      .body--light & {
        color: $grey-10;
        background-color: $grey-1;
        border-top: 1px solid $grey-4;
        border-bottom: 1px solid $grey-4;
        border-left: 1px solid $grey-4;
        border-right: none;
      }
      &:focus {
        border: 1px solid $primary;
      }
    }
  }

  &__buttons {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    // border-radius: 0 4px 4px 0;
    transition: 0.2s;
    background-color: $grey-8;
    .body--light & {
      background-color: $grey-7;
    }
    &:hover {
      background-color: $grey-6;
    }
    &__icon {
      color: white;
    }
  }
}
</style>
