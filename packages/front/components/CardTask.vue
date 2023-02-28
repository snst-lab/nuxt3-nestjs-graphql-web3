<script setup lang="ts">
import { Task } from "types/Task";

defineProps<{ task: Task }>();
</script>

<template>
  <q-card class="text-black" style="width: 100%; max-width: 320px">
    <q-card-section>
      <div class="row q-mb-md">
        <div class="col-10">
          <div class="text-h6 text-grey q-mb-sm">{{ task.project.name }}</div>
          <div class="text-subtitle2">{{ task.project.projectTask.state }}</div>
        </div>
        <div class="col-2">
          <q-icon name="task" color="primary" size="4.4em" />
        </div>
      </div>
      <div class="row">
        <p class="text-subtitle2">{{ task.project.projectTask.name }}</p>
      </div>
    </q-card-section>
  </q-card>
</template>
