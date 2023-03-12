<script setup lang="ts">
import { $dialog, $store, $wallet } from "@stores";
import { Blogs } from "types/Blogs";
const { public: constants } = useRuntimeConfig();
const { params } = useRoute();

const { baseUrl, apiKey } = constants.vendor.microCms;

const { data: blogs } = useFetch<Blogs>(`${baseUrl}/blogs`, {
  headers: { "X-MICROCMS-API-KEY": apiKey },
});

const project = ref<Json>({} as Json);
const projectDetail = ref<Json>({} as Json);

const votedAmount = ref<number>(0);
const recruitment = ref<number>(8);
const participant = ref<number>(5);

const progress = computed(
  () => (Math.floor(100 / recruitment.value) / 100) * participant.value
);

const onEvent = {
  clickVote: async () => {
    if (!$wallet().type) {
      $wallet().connect();
      return;
    }
    $dialog().show("vote", {
      projectId: params.id,
      projectName: project.value.name,
    });
  },
};

onMounted(async () => {
  const ballot = await useContract("Ballot");
  const rawVotedAmount = await ballot().abi.getVotedAmountByProjectId(
    params.id
  );
  votedAmount.value = Number(rawVotedAmount.toString()) / 10 ** 18;
  project.value = (await $store().get("project")) as Json;
  projectDetail.value = await useQuery("findFirstProjectDetail", {
    where: {
      project_id: { equals: Number(project.value.project_id) },
    },
  });
});
</script>

<template>
  <div class="row justify-between" style="flex-wrap: wrap-reverse">
    <div class="col-12 col-md-6" style="width: 100%; max-width: 1000px">
      <div class="row justify-between q-pa-lg q-mb-xl bg-white">
        <div class="text-h6 q-mt-none q-mb-lg">プロジェクト概要</div>
        <div class="col-12">
          {{ project.description }}
        </div>
      </div>
      <div class="row bg-white q-pa-lg">
        <div class="text-h6 q-mt-none q-mb-lg">活動実績</div>
        <div class="col-12">
          <div class="row q-gutter-lg" v-if="blogs">
            <CardResultsActivities
              v-for="content in blogs.contents"
              :content="content"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 q-mb-xl" style="width: 100%; max-width: 400px">
      <div class="q-pa-lg bg-white">
        <div class="column q-mb-md">
          <p class="q-my-none text-h6">プロジェクト参加者数</p>
          <p class="q-my-none text-right text-h5">
            {{ participant?.toLocaleString() }} 名
          </p>
          <p>
            / 目標人数: 参加者数 {{ recruitment?.toLocaleString() }} 名 以上
          </p>
          <q-linear-progress
            size="5px"
            :value="progress"
            color="primary"
            class="q-my-md"
          >
          </q-linear-progress>
          <q-btn
            class="self-center q-mt-md q-mb-lg"
            unelevated
            rounded
            color="secondary"
            label="プロジェクトに参加する"
          />
        </div>
        <q-separator />
        <div class="row items-center justify-between q-my-md">
          <p class="text-subtitle1 text-grey">審査フェーズ</p>
          <q-btn
            unelevated
            rounded
            color="primary"
            :label="project.review_phase ?? 'STEP1'"
          />
        </div>
        <q-separator />
        <div class="column q-my-md">
          <p>当月タスク消化数</p>
          <p class="text-h6 text-right">
            {{ projectDetail.ticket_count_closed?.toLocaleString() }}
            <small>チケット</small>
          </p>
          <p>起票済みタスク数</p>
          <p class="text-h6 text-right">
            {{ projectDetail.ticket_count_total?.toLocaleString() }}
            <small>チケット</small>
          </p>
          <p>消化済みタスク数</p>
          <p class="text-h6 text-right">
            {{ projectDetail.ticket_count_closed?.toLocaleString() }}
            <small>チケット</small>
          </p>
        </div>
        <q-separator />
        <div class="column q-my-md">
          <p>プロジェクトへの投票額</p>
          <p class="text-h6 text-right">
            {{ votedAmount?.toLocaleString() }} <small>USD</small>
          </p>
          <p>プロジェクトの報酬総額</p>
          <p class="text-h6 text-right">
            {{
              (
                Math.floor(projectDetail.sum_project_amount * 1000) / 1000
              ).toLocaleString()
            }}
            <small>USD</small>
          </p>
          <p>プロジェクトの調達済額</p>
          <div class="text-h6 text-right">
            <TextNumber :value="project.invested_amount" />
            <small>円</small>
          </div>
          <q-btn
            class="self-center q-mt-lg"
            unelevated
            rounded
            color="accent"
            label="プロジェクトに投票する"
            @click="onEvent.clickVote"
          />
        </div>
      </div>
    </div>
  </div>
</template>
