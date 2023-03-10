<script setup lang="ts">
import type { QTableProps } from "quasar";
import { $dialog, $wallet } from "@stores";
import { tools } from "@tools";

definePageMeta({
  layout: "dashboard",
});

const { public: constants } = useRuntimeConfig();
const { params } = useRoute();

const keyRender = ref<number>(0);
const currentBalance = ref<number>(0);
const totalSupply = ref<number>(0);
const progress = ref<number>(0);
const pendingAirdropTotal = ref<number>(0);
const projectList = ref<Json>([]);
const voterList = ref<Json>([]);
const isLoading = ref<boolean>(false);

const onEvent = {
  clickBulkAirdrop: async () => {
    if (pendingAirdropTotal.value === 0) {
      return;
    }
    isLoading.value = true;
    const amount = pendingAirdropTotal.value;
    await useMutation("bulkAirdrop");
    await tools.sleep(5000);
    isLoading.value = false;
    await $dialog().show("complete", {
      title: "エアドロップ完了",
      message: `審査部門へ ${amount.toLocaleString()}USD の配布を行いました`,
    });
    await tools.sleep(3000);
    window.location.reload();
  },
};

async function fetchBalance() {
  const ballotToken = await useToken("Token");

  totalSupply.value = Math.round(
    Number((await ballotToken().abi.totalSupply()).toString()) /
      10 ** ballotToken().decimals
  );
  currentBalance.value = Math.round(
    Number((await ballotToken().abi.balanceOf($wallet().address)).toString()) /
      10 ** ballotToken().decimals
  );
  const percentage = (currentBalance.value / totalSupply.value) * 100;
  await tools.sleep(500);
  setInterval(() => {
    if (progress.value < percentage) {
      progress.value += 1;
    }
  }, 10);
}

onMounted(async () => {
  await fetchBalance();
  const projects = await useQuery("findManyProject");
  const projectDetails = await useQuery("findManyProjectDetail");
  const projectLedgers = await useQuery("findManyProjectLedger");
  projectList.value = projectLedgers;
  voterList.value = await useQuery("findManyVoter");
  voterList.value.forEach((e: Json) => {
    pendingAirdropTotal.value += e.pending_airdrop;
  });

  for (let i = 0; i < projectLedgers.length; i++) {
    const id = projectLedgers[i].project_id - 1;
    projectList.value[i].project = projects[id];
    projectList.value[i].detail = projectDetails[id];
  }
});

const rows = computed(() =>
  projectList.value.map((e: Record<string, any>) => {
    return {
      project_id: e.project_id,
      name: e.project?.name ?? "",
      income: e.income,
      created_date: dayjs(e.created_date).format("YYYY/MM/DD HH:mm"),
    };
  })
);
const columns: QTableProps["columns"] = [
  {
    name: "project_id",
    field: "project_id",
    label: "プロジェクトID",
    headerStyle: "width:10%",
    align: "left",
  },
  {
    name: "name",
    field: "name",
    label: "プロジェクト名",
    headerStyle: "width:40%",
    align: "left",
  },
  {
    name: "income",
    field: "income",
    label: "報酬額 (USD)",
    sortable: true,
    headerStyle: "width:40%",
    align: "right",
  },
  {
    name: "created_date",
    field: "created_date",
    label: "日時",
    sortable: true,
    headerStyle: "width:10%",
    align: "left",
  },
];
</script>

<template>
  <div class="row q-pa-sm" :key="keyRender">
    <div class="col-12 col-md-7 q-ma-sm">
      <div class="bg-white q-pa-lg">
        <div class="text-h6 text-grey-8 q-mb-sm">保有トークン量</div>
        <div class="flex q-gutter-sm justify-end items-end">
          <q-circular-progress
            show-value
            font-size="12px"
            :value="progress"
            size="60px"
            :thickness="0.3"
            color="teal"
            track-color="grey-3"
            class=""
          >
            {{ progress }}%
          </q-circular-progress>
          <div class="text-h4">{{ currentBalance.toLocaleString() }}</div>
          <div class="text-h5">USD /</div>
          <div class="text-h6 text-grey">
            総供給 {{ totalSupply.toLocaleString() }} USD
          </div>
        </div>
      </div>
      <div class="bg-white q-mt-md q-pa-lg">
        <div class="text-h6 text-grey-8 q-mb-md">出納履歴</div>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          :pagenation="{
            rowsPerPage: 10,
          }"
        >
        </q-table>
      </div>
    </div>
    <div class="col-12 col-md-4 bg-white q-ma-sm q-pa-lg">
      <div class="text-h6 text-grey-8">エアドロップ待ち</div>
      <div class="flex justify-between q-py-md">
        <div class="flex justify-end items-end q-gutter-sm">
          <div class="text-h6">計</div>
          <div class="text-h4">{{ pendingAirdropTotal.toLocaleString() }}</div>
          <div class="text-h6">USD</div>
        </div>
        <q-btn
          class="q-mt-md"
          color="accent"
          rounded
          style="width: 160px"
          :disable="pendingAirdropTotal === 0 || isLoading"
          @click="onEvent.clickBulkAirdrop"
        >
          <q-spinner-ios v-if="isLoading" color="white" size="1em" />
          <span v-else>トークン一括配布</span>
        </q-btn>
      </div>
      <div>
        <template v-for="e of voterList">
          <CardVoter
            class="q-my-md"
            :name="e.name"
            :evm_address="e.evm_address"
            :max_voteable="e.max_voteable"
            :token_balance="e.token_balance"
            :pending_airdrop="e.pending_airdrop"
            :pending_reconcile="e.pending_reconcile"
          />
        </template>
      </div>
    </div>
  </div>
</template>
