<script setup lang="ts">
import { $auth } from "@stores";
import { Project } from "types/Project";
import { Task } from "types/Task";

definePageMeta({
  layout: "dashboard",
});

const tasks = computed(() => {
  const arr: Task[] = [];

  for (var i = 0; i <= 6; i++) {
    arr.push({
      project: {
        name: `プロジェクト${i}`,
        projectTask: {
          name: `タスク`,
          state: `Active${i}`,
        },
      },
    });
  }
  return arr;
});

const projects = computed(() => {
  const arr: Project[] = [];

  for (var i = 0; i <= 6; i++) {
    arr.push({
      title: `プロジェクト${i}`,
      participant: 6,
      recruitment: 10,
      investmentPoint: 1000,
      projectUpdateTime: `2023年2月28日`,
    });
  }
  return arr;
});

const addressList = ref<Record<string, any>>({});

onMounted(async () => {
  addressList.value = await useQuery("findManyAddressCard", null, null, {
    auth: {
      type: $auth().type,
      access_token: $auth().token.access_token,
    },
  });
});
</script>

<template>
  <div class="q-my-xl">
    <ContentsTop
      task-title="アサインされているタスク"
      project-title="参加プロジェクト"
    >
      <template #task>
        <CardTask v-for="task in tasks" :task="task" />
      </template>
      <template #project>
        <CardParticipatingProject
          v-for="project in projects"
          :project="project"
        />
      </template>
    </ContentsTop>
  </div>
</template>
