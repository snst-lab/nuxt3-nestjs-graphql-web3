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
const projectList = ref<Json>({});
const voterList = ref<Json>([]);
const isLoading = ref<Record<string, boolean>>({
  clickBulkAirdrop: false,
  clickHarvest: false,
});
const reviewPhases = ref<string[]>(["STEP1", "STEP2", "STEP3", "FINAL"]);

const onEvent = {
  clickBulkAirdrop: async () => {
    if (pendingAirdropTotal.value === 0) {
      return;
    }
    isLoading.value.clickBulkAirdrop = true;
    const amount = pendingAirdropTotal.value;
    await useMutation("bulkAirdrop");
    await tools.sleep(3000);
    await $dialog().show("complete", {
      title: "エアドロップ完了",
      message: `審査部門へ ${amount.toLocaleString()}USD の配布を行いました`,
    });
    isLoading.value.clickBulkAirdrop = false;
    await tools.sleep(4000);
    window.location.reload();
  },
  clickHarvest: async (review_phase: string) => {
    isLoading.value.clickHarvest = true;
    const response = await useMutation("mockUpdateLedger", { review_phase });
    await tools.sleep(3000);
    if (response === true) {
      await $dialog().show("complete", {
        title: "完了",
        message: `${review_phase}の審査員報酬を確定しました`,
      });
      isLoading.value.clickHarvest = false;
      await tools.sleep(4000);
      window.location.reload();
    } else {
      $dialog().show("message", { title: "エラー", message: "失敗しました" });
      isLoading.value.clickHarvest = false;
    }
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

  voterList.value = await useQuery("findManyVoter");
  voterList.value.forEach((e: Json) => {
    pendingAirdropTotal.value += e.pending_airdrop;
  });

  for (const phase of reviewPhases.value) {
    const projectLedgers = await useQuery("findManyProjectLedger", {
      where: { review_phase: { equals: phase } },
    });
    projectList.value[phase] = projectLedgers;
    for (let i = 0; i < projectLedgers.length; i++) {
      const id = projectLedgers[i].project_id - 1;
      projectList.value[phase][i].project = projects[id];
      projectList.value[phase][i].detail = projectDetails[id];
    }
  }
});

const rows = (phase: string) => {
  if (projectList.value[phase]) {
    return projectList.value[phase].map((e: Json) => {
      return {
        project_id: e.project_id,
        name: e.project?.name ?? "",
        income: e.income,
        review_phase: e.review_phase,
        created_date: dayjs(e.created_date).format("YYYY/MM/DD HH:mm"),
      };
    });
  } else {
    return [];
  }
};

const columns: QTableProps["columns"] = [
  {
    name: "project_id",
    field: "project_id",
    label: "審査員ID",
    headerStyle: "width:5%",
    align: "left",
  },
  {
    name: "name",
    field: "name",
    label: "審査員プロジェクト名",
    headerStyle: "width:40%",
    align: "left",
  },
  {
    name: "review_phase",
    field: "review_phase",
    label: "審査フェーズ",
    headerStyle: "width:10%",
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
    headerStyle: "width:5%",
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
      <div class="bg-white q-mt-md q-pa-lg" v-for="phase in reviewPhases">
        <div class="row justify-between items-center q-mb-lg">
          <div class="text-h6 text-grey-8">審査フェーズ: {{ phase }}</div>
          <q-btn
            color="primary"
            rounded
            style="width: 160px"
            :disable="Object.values(isLoading).find((e) => e)"
            @click="onEvent.clickHarvest(phase)"
          >
            <q-spinner-ios
              v-if="isLoading.clickHarvest"
              color="white"
              size="1em"
            />
            <span v-else>報酬確定</span>
          </q-btn>
        </div>
        <q-table
          :rows="rows(phase)"
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
      <div class="text-h6 text-grey-8">審査員プロジェクト一覧</div>
      <div class="q-py-md">
        <p class="">エアドロップ待ち</p>
        <div class="flex justify-between items-end q-gutter-sm">
          <div class="text-h4">
            {{ pendingAirdropTotal.toLocaleString() }}
            <small class="text-h6">USD</small>
          </div>
          <q-btn
            class="q-mt-md"
            color="accent"
            rounded
            style="width: 160px"
            :disable="
              pendingAirdropTotal === 0 ||
              Object.values(isLoading).find((e) => e)
            "
            @click="onEvent.clickBulkAirdrop"
          >
            <q-spinner-ios
              v-if="isLoading.clickBulkAirdrop"
              color="white"
              size="1em"
            />
            <span v-else>トークン一括配布</span>
          </q-btn>
        </div>
      </div>
      <div>
        <template v-for="e of voterList">
          <CardVoter
            class="q-my-md"
            :name="e.name"
            :evm_address="e.evm_address"
            :max_voteable="e.max_voteable"
            :reward="e.reward"
            :pending_airdrop="e.pending_airdrop"
            :pending_reconcile="e.pending_reconcile"
          />
        </template>
      </div>
    </div>
  </div>
</template>
