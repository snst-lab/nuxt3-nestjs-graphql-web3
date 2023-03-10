<script setup lang="ts">
import { $auth, $wallet, $store } from "@stores";

const projectList = ref<Json[]>([] as Json[]);
onMounted(async () => {
  projectList.value = await useQuery("findManyProject");
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="q-px-xl q-py-xs">
      <ListGrid>
        <template v-for="e in projectList">
          <CardProject
            :id="e.project_id"
            :name="e.name"
            :description="e.description"
            :avatar_uri="e.avatar_uri"
            :credit_amount="e.credit_amount"
            :contributor_count="e.contributor_count"
          />
        </template>
      </ListGrid>
    </div>
  </NuxtLayout>
</template>
