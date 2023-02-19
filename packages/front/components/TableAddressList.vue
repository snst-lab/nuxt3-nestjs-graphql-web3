<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();

const columns = ref<any[]>([]);
const rows = ref<any[]>([]);

const visibleColumns = ["auth_type", "social_id", "email", "evm_address"];
watch(
  () => props.data,
  (after) => {
    if (after[0]) {
      columns.value = Object.keys(after[0]).map((e) => {
        return {
          name: e,
          align: "left",
          label: e,
          field: e,
          sortable: true,
        };
      }) as any[];
      rows.value = after;
    }
  }
);
</script>

<template>
  <div class="c-table-address-list">
    <q-table
      v-if="props.data"
      :visible-columns="visibleColumns"
      title="アドレスリスト"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<style>
.c-table-address-list {
}
</style>

<style lang="scss">
.c-table-address-list {
  width: 100%;
}
.c-table-address-list > .q-table__container {
  width: 100%;
}
</style>
