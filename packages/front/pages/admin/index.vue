<script setup lang="ts">
import { $dialog, $wallet } from "@stores";
import { tools } from "@tools";
import { ProjectCreateInput } from "@types";
import { Blogs } from "types/Blogs";
const { public: constants } = useRuntimeConfig();
const { params } = useRoute();

definePageMeta({
  layout: "dashboard",
});

const currentBalance = ref<number>(0);
const totalSupply = ref<number>(0);
const progress = ref<number>(0);
const projectList = ref<Record<string, any>>([]);

const onEvent = {
  clickVote: async () => {
    if (!$wallet().type) {
      $wallet().connect();
      return;
    }
    $dialog().show("vote", {
      projectId: params.id,
      // projectName: project.value.name,
    });
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

async function fetchVoters() {
  const ballot = await useContract("Ballot");
}

onMounted(async () => {
  await fetchBalance();
  await fetchVoters();
  const projects = await useQuery("findManyProject");
  const projectDetails = await useQuery("findManyProjectDetail");
  const projectLedgers = await useQuery("findManyProjectLedger");
  projectList.value = projectLedgers;

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
      created_date: dayjs(e.created_date).format("YYYY/MM/DD"),
    };
  })
);
const columns = [
  {
    name: "project_id",
    field: "project_id",
    label: "プロジェクトID",
    headerStyle: "width:10%",
  },
  { name: "name", field: "name", label: "プロジェクト名" },
  { name: "income", field: "income", label: "報酬額 (USD)", sortable: true },
  {
    name: "created_date",
    field: "created_date",
    label: "日時",
    sortable: true,
    headerStyle: "width:10%",
  },
];
const voterList = [
  {
    name: "TQM推進部",
    address: "0x2Aa4E5FE5AaA8ddb92007712731297f5BcE25d28",
    balance: 1000,
  },
  {
    name: "TQM推進部",
    address: "0x2Aa4E5FE5AaA8ddb92007712731297f5BcE25d28",
    balance: 1000,
  },
];
</script>

<template>
  <div class="row q-pa-sm">
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
          <div class="text-h5">BLT /</div>
          <div class="text-h6 text-grey">
            総供給 {{ totalSupply.toLocaleString() }} BLT
          </div>
        </div>
      </div>
      <div class="bg-white q-mt-md q-pa-lg">
        <div class="text-h6 text-grey-8 q-mb-md">出納履歴</div>
        <q-table hide-bottom :rows="rows" :columns="columns" row-key="name" />
      </div>
    </div>
    <div class="col-12 col-md-4 bg-white q-ma-sm q-pa-lg">
      <div class="text-h6 text-grey-8">エアドロップ待ち</div>
      <div class="flex justify-between q-py-md">
        <div class="flex justify-end items-end q-gutter-sm">
          <div class="text-h6">計</div>
          <div class="text-h4">10,000</div>
          <div class="text-h6">USD</div>
        </div>
        <q-btn class="q-mt-md" color="accent" rounded>トークン一括配布</q-btn>
      </div>
      <div>
        <template v-for="e of voterList">
          <CardVoter
            class="q-my-md"
            :name="e.name"
            :address="e.address"
            :balance="e.balance"
          />
        </template>
      </div>
    </div>
  </div>
</template>
