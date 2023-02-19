<template>
  <div class="c-text-label text-subtitle1">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";

.c-text-label {
  .body--light & {
    color: $grey-10;
  }
  .body--dark & {
    color: $grey-4;
  }
}
</style>
