<script setup lang="ts">
import { $dialog } from "@stores";
import { tools } from "@tools";

watch(
  () => $dialog().args.complete,
  async (after, before) => {
    if ($dialog().args.complete.party && !before?.title && after?.title) {
      await tools.sleep(500);
      party.confetti(document.querySelector(".party"));
      await tools.sleep(3000);
      party.confetti(document.querySelector(".party"));
    }
  }
);
</script>

<template>
  <DialogWithButton
    name="complete"
    :title="$dialog().args.complete?.title ?? false"
    :width="320"
    :buttons="[
      {
        label: '閉じる',
        color: 'grey',
        action: () => {
          $dialog().hide('complete');
        },
      },
    ]"
  >
    <lottie-player
      class="party"
      src="https://assets10.lottiefiles.com/packages/lf20_5y8HtRSAit.json"
      background="transparent"
      speed="1"
      style="width: 200px; height: 200px; margin: auto"
      autoplay
    ></lottie-player>
    <p class="q-pa-md" style="word-break: break-all">
      {{ $dialog().args.complete?.message }}
    </p>
  </DialogWithButton>
</template>
