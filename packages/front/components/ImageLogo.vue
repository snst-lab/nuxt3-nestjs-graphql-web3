<script setup lang="ts">
const props = defineProps<{
  size?: number;
  iconOnly?: boolean;
}>();
const size = props.size ? props.size + "px" : "100%";
</script>

<template>
  <Image v-if="!iconOnly" src="logo-app@2x.png" :size="size" class="q-pa-lg" />
</template>

<style scoped></style>

<style lang="scss" scoped></style>
