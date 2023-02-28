<script setup lang="ts">
defineProps<{
  taskTitle: string;
  projectTitle: string;
}>();
</script>

<template>
  <div class="row justify-center q-gutter-xl">
    <article class="col-10 col-md-5 bg-white q-pa-lg rounded-borders">
      <h6 class="text-bold q-mt-none q-mb-lg">{{ taskTitle }}</h6>
      <div class="row content-center q-gutter-md">
        <slot name="task" />
      </div>
    </article>
    <article class="col-10 col-md-5 bg-white q-pa-lg rounded-borders">
      <h6 class="text-bold q-mt-none q-mb-lg">{{ projectTitle }}</h6>
      <div class="row content-center q-gutter-md">
        <slot name="project" />
      </div>
    </article>
  </div>
</template>
