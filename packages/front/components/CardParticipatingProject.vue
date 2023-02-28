<script setup lang="ts">
import { Project } from "types/Project";

const { project } = defineProps<{
  project: Project;
}>();
const progress = computed(
  () => (Math.floor(100 / project.recruitment) / 100) * project.participant
);
</script>
<template>
  <q-card class="text-black" style="width: 100%; max-width: 320px">
    <q-card-section>
      <h6 class="q-my-none">{{ project.title }}</h6>
      <div class="column items-end">
        {{ project.participant }}/{{ project.recruitment }}
      </div>
      <q-linear-progress
        size="5px"
        :value="progress"
        color="primary"
        class="q-mt-sm"
      >
      </q-linear-progress>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row">
        <div class="col-5">出資ポイント</div>
        <div class="col-7 text-right">{{ project.investmentPoint }} point</div>
      </div>
      <div class="row">
        <div class="col-5">更新期限</div>
        <div class="col-7 text-right">{{ project.projectUpdateTime }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>
