<script setup lang="ts">
const props = defineProps<{
  tabs: {
    name: string;
    icon: string;
    label: string;
    badge: number;
    action: () => void;
  }[];
  badgeColor?: string;
}>();
const tabIndex = ref<string>("");
const slotKey = ref<boolean>(true);
const maxWidth = Math.max(props.tabs.length * 160, 420);
const badgeColor = props.badgeColor ?? "warning";

watch(tabIndex, () => {
  setTimeout(() => {
    slotKey.value = !slotKey.value;
  }, 100);
});

onMounted(() => {
  tabIndex.value = window.location.pathname.split("/").reverse()[1];
  if (!props.tabs.filter((e) => e.name === tabIndex.value)[0]) {
    tabIndex.value = props.tabs[0].name;
  }
});
</script>

<template>
  <q-tabs v-model="tabIndex" inline-label class="c-frame-tabs">
    <q-tab
      v-for="(e, i) in tabs"
      :name="e.name"
      :icon="e.icon"
      :label="e.label"
      @click="e.action"
    >
      <q-badge v-if="e.badge > 0" :color="badgeColor" rounded floating>{{
        e.badge
      }}</q-badge>
    </q-tab>
  </q-tabs>
  <slot :key="slotKey" />
</template>

<style scoped>
.c-frame-tabs {
  --maxWidth: v-bind(maxWidth + "px");
}
</style>

<style lang="scss" scoped>
.c-frame-tabs {
  max-width: var(--maxWidth);
  margin: auto;
}
</style>
