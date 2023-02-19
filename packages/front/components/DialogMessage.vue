<script setup lang="ts">
import { $dialog } from "@stores";
</script>

<template>
  <DialogWithButton
    name="message"
    :title="$dialog().args.message?.title ?? false"
    :width="320"
    :buttons="[
      {
        label: '閉じる',
        color: 'grey',
        action: () => {
          $dialog().hide('message');
        },
      },
    ]"
  >
    <p class="q-pa-md" style="word-break: break-all">
      {{ $dialog().args.message?.message }}
    </p>
  </DialogWithButton>
</template>
