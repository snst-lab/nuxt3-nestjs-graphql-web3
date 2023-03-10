<script setup lang="ts">
const router = useRouter();
const route = useRoute();

router.replace(`/projects/${route.params.id}/activity/`);
</script>

<template>
  <div></div>
</template>
