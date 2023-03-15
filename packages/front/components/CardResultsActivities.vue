<script setup lang="ts">
import { ContentsEntity } from "types/Blogs";

const { content } = defineProps<{ content: ContentsEntity }>();

const formatDate = computed(() =>
  dayjs(content.createdAt).format("YYYY年MM月DD日（ddd）    ")
);

const contentStrip = computed(() =>
  content.content.replace(/(<([^>]+)>)/gi, "")
);
</script>

<template>
  <q-card
    style="margin: 0 auto; width: 100%; max-width: 300px; min-height: 360px"
  >
    <q-img :src="content.eyecatch.url" style="height: 160px" />

    <q-card-section class="row justify-end">
      <span>
        <q-icon color="gray" name="calendar_today" />
        {{ formatDate }}
      </span>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <p class="q-mb-sm text-subtitle1">{{ content.title }}</p>
      <div class="text-overflow-lines">
        {{ contentStrip }}
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.text-overflow-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
