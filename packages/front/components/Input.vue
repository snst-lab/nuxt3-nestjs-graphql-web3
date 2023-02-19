<script setup lang="ts">
import { ValidationRule } from "quasar";

const props = defineProps<{
  label?: string;
  value?: string;
  icon?: string;
  type?: string;
  rules?: ValidationRule[];
}>();
const emit = defineEmits(["update:value"]);

const value = ref<string | undefined>(props.value);
const type = ref<string>(props.type ?? "text");

watch(value, () => {
  emit("update:value", value.value);
});
</script>

<template>
  <div class="c-input q-my-sm">
    <div v-if="label" class="c-input__label q-pb-xs">{{ label }}</div>
    <q-field
      ref="fieldRef"
      :model-value="value"
      class="c-input__field"
      outlined
      :rules="rules"
    >
      <q-icon class="c-input__field__icon" :name="icon" />
      <input class="c-input__field__input" :type="type" v-model="value" />
    </q-field>
  </div>
</template>

<style>
.c-input {
  --paddingLeft: v-bind(icon ? "50px": "20px");
}
</style>

<style lang="scss">
@import "assets/css";

.c-input {
  &__label {
    color: $grey-6;
    text-indent: 4px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  &__field {
    position: relative;
    // border-radius: 4px 0 0 4px;
    width: 100%;

    &__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
      color: white;
      .body--light & {
        color: $grey-9;
      }
    }
    &__input {
      width: 100%;
      padding: 12px 50px 12px 50px;
      padding-left: var(--paddingLeft);
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

  .q-field__control {
    padding: 0 !important;
  }
  .q-field__append {
    position: absolute;
    right: 16px;
  }
}
</style>
