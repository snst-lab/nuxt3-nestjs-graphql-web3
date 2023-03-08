<script setup lang="ts">
import { $dialog, $wallet } from "@stores";
import { ProjectCreateInput } from "@types";
import { Blogs } from "types/Blogs";
const { public: constants } = useRuntimeConfig();
const { params } = useRoute();

const { baseUrl, apiKey } = constants.vendor.microCms;

const { data } = useFetch<Blogs>(`${baseUrl}/blogs`, {
  headers: { "X-MICROCMS-API-KEY": apiKey },
});

const project = ref<ProjectCreateInput>({
  name: "プロジェクト名が入りますプロジェクト名が入りますプロジェクト名が入ります",
  project_code: 0,
  service_id: 0,
});

const recruitment = 8;
const participant = 5;

const progress = computed(
  () => (Math.floor(100 / recruitment) / 100) * participant
);

const onEvent = {
  clickVote: async () => {
    if (!$wallet().type) {
      $wallet().connect();
      return;
    }
    $dialog().show("vote", {
      scheme: "add",
      projectId: params.id,
      projectName: project.value.name,
    });
  },
};
</script>

<template>
  <div class="row justify-center q-gutter-xl">
    <div class="col-8">
      <div class="row justify-between q-pa-lg q-mb-xl bg-white">
        <H5 class="q-mt-none">プロジェクト概要</H5>
        <div class="col-12">
          プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。プロジェクトの概要説明が入ります。
        </div>
      </div>
      <div class="row bg-white q-pa-lg">
        <H5 class="col-12 q-mt-none">プロジェクト概要</H5>
        <div class="col-12">
          <div class="row q-gutter-lg" v-if="data">
            <CardResultsActivities
              v-for="content in data.contents"
              :content="content"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="row q-pa-lg bg-white">
        <div class="column q-mb-md">
          <H6 class="q-my-none">プロジェクト参加者数 8名</H6>
          <div>/ 活動条件: 参加者数 5名 以上</div>
          <q-linear-progress
            size="5px"
            :value="progress"
            color="primary"
            class="q-my-md"
          >
          </q-linear-progress>
          <q-btn
            class="self-center"
            unelevated
            rounded
            color="primary"
            label="プロジェクトに参加する"
          />
        </div>
        <q-separator />
        <div class="column q-my-md">
          <p>当月タスク消化数　8</p>
          <p>起票済みタスク数　120</p>
          <p>消化済みタスク数　118</p>
        </div>
        <q-separator />
        <div class="column">
          <div class="q-my-md">
            <p>プロジェクトへの投票額 18,400 USD</p>
            <p>プロジェクトの報酬総額 877 USD</p>
            <p>プロジェクトへの出資額 1,000 USD</p>
          </div>
          <q-btn
            class="self-center"
            unelevated
            rounded
            color="accent"
            label="プロジェクトに投票する"
            @click="onEvent.clickVoteApprove"
          />
        </div>
      </div>
    </div>
  </div>
</template>
