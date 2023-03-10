<script setup lang="ts">
import { $dialog } from "@stores";

const props = defineProps<{
  name: string;
  title?: string;
  width?: number;
  padding?: number;
  persist?: boolean;
  onHide?: () => void;
}>();

const width = props.width ?? 560;
const padding = props.padding ?? 20;

onMounted(() => {
  watchEventChangeUrl(updateDialogState);
});

function watchEventChangeUrl(callback: Function) {
  callback();
  let href = window.location.href;
  const observer = new MutationObserver(function (mutations) {
    if (href !== window.location.href) {
      href = window.location.href;
      callback();
    }
  });
  observer.observe(document, { childList: true, subtree: true });
}
function updateDialogState() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("dialog") === props.name) {
    $dialog().isShow[props.name] = true;
  } else {
    $dialog().isShow[props.name] = false;
  }
  const args = url.searchParams.get("args");
  if (args) {
    try {
      $dialog().args[props.name] = JSON.parse(args);
    } catch (e) {
      $dialog().args[props.name] = {};
    }
  }
}
function onHide() {
  if (props.onHide) {
    props.onHide();
  }
}
</script>

<template>
  <q-dialog
    v-model="$dialog().isShow[props.name]"
    round
    :persistent="persist"
    @hide="onHide"
  >
    <div
      class="c-dialog-template"
      :style="{
        maxWidth: width + 'px',
        width: '100vw',
        borderRadius: '16px',
      }"
    >
      <div v-if="props.title">
        <div class="row space-between items-center q-py-sm q-px-lg">
          <p class="text-h6 col">{{ props.title }}</p>
          <q-btn
            icon="close"
            class="col-1"
            fab-mini
            unelevated
            flat
            @click="$dialog().hide(props.name)"
          />
        </div>
        <q-separator />
      </div>
      <slot
        :style="{
          padding: padding + 'px',
        }"
      />
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-dialog-template {
  background-color: white;
  .body--dark & {
    background-color: $grey-10;
  }
}
</style>
