<script setup lang="ts">
import { $dialog, $wallet } from "@stores";
import { tools } from "@tools";

const route = useRoute();

const projectList = ref<Json[]>([] as Json[]);
const renderKey = ref<number>(0);
const reviewPhase = ref<string>("STEP1");
const nextReviewPhase = ref<string>("STEP2");
const reviewPhaseOptions = ["STEP1", "STEP2", "STEP3", "FINAL"];
const reviewPhaseProps: Json = {
  STEP1: {
    count: 25,
    prize: 100000,
  },
  STEP2: {
    count: 12,
    prize: 5000000,
  },
  STEP3: {
    count: 6,
    prize: 50000000,
  },
  FINAL: {
    count: 1,
    prize: 100000000,
  },
};

const checkList = ref<
  {
    project_id: number;
    checked: boolean;
    review_phase: string;
    invested_amount: number;
  }[]
>([]);

const checkedCount = computed(() => {
  return checkList.value.filter((e) => e.checked).length;
});

async function updateList() {
  if (route.params.phase) {
    projectList.value = await useQuery("findManyProject", {
      where: {
        review_phase: { equals: route.params.phase },
      },
    });
  } else {
    projectList.value = await useQuery("findManyProject");
  }
  checkList.value = projectList.value.map((e) => {
    return {
      project_id: e.project_id,
      checked: false,
      review_phase: reviewPhase.value,
      invested_amount: reviewPhaseProps[nextReviewPhase.value].prize,
    };
  });
  reviewPhase.value = (route.params?.phase as string) ?? "STEP1";
  nextReviewPhase.value = (() => {
    const phase = route.params?.phase ?? "STEP1";
    switch (phase) {
      case "STEP1":
        return "STEP2";
      case "STEP2":
        return "STEP3";
      case "STEP3":
        return "FINAL";
      default:
        return "STEP1";
    }
  })();
  renderKey.value += 1;
}
watch(() => route.path, updateList);
onMounted(updateList);

const onEvent = {
  check: (id: number, checked: boolean) => {
    checkList.value.filter((e) => e.project_id === id)[0].checked = checked;
    if (checked) {
      checkList.value.filter((e) => e.project_id === id)[0].review_phase =
        nextReviewPhase.value;
      checkList.value.filter((e) => e.project_id === id)[0].invested_amount =
        reviewPhaseProps[nextReviewPhase.value].prize;
    }
  },
  clickUpdate: async () => {
    const checked = checkList.value.filter((e) => e.checked);
    checked.forEach((e) => {
      e.review_phase = nextReviewPhase.value;
      e.invested_amount = reviewPhaseProps[nextReviewPhase.value].prize;
    });
    isLoading.value.clickUpdate = true;
    const { data, error } = await useMutation(
      "prizeProject",
      { data: checked },
      null,
      {
        ether: await $wallet().createSignature(),
      }
    );
    if (data) {
      await tools.sleep(2000);
      $dialog().show("complete", {
        title: "更新完了",
        message: `${data.length}件の更新が完了しました`,
      });
    }
    if (error) {
      $dialog().show("message", {
        title: "認可エラー",
        message: "接続中のウォレットアドレスを確認してください。",
      });
    }
    isLoading.value.clickUpdate = false;
  },
};
const isLoading = ref<Json>({
  clickUpdate: false,
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="q-px-xl q-py-xs" :key="renderKey">
      <q-card borderd flat class="q-pa-lg">
        <div class="text-h5" v-if="route.params?.phase">
          <small>審査フェーズ</small>　{{ reviewPhase }}　
          <small>のプロジェクト</small>
        </div>
        <div class="text-h6" v-else>全てのプロジェクト</div>
        <div class="flex justify-between items-center q-gutter-x-md">
          <div>
            <div class="text-grey">Prize</div>
            <div class="text-h5">
              <TextNumber
                :key="reviewPhaseProps[reviewPhase].prize"
                :value="reviewPhaseProps[reviewPhase].prize"
              /><smaLl>円</smaLl>
              /
              <small>1プロジェクト</small>
            </div>
          </div>
          <div>
            <div class="text-grey">選定プロジェクト数</div>
            <div class="text-h5">
              {{ reviewPhaseProps[reviewPhase].count }}
              <small>プロジェクト</small>
            </div>
          </div>
          <div>
            <div class="text-grey">選択中</div>
            <div class="text-h5">
              {{ checkedCount }} <small>プロジェクト</small>
            </div>
          </div>
          <!-- <q-btn
            color="primary"
            rounded
            style="width: 100px; height: 40px"
            :disabled="reviewPhaseProps[reviewPhase].count !== checkedCount"
            >一括更新</q-btn
          > -->
          <div>
            <div class="text-grey">変更後の審査フェーズ</div>
            <q-select
              v-model:modelValue="nextReviewPhase"
              :options="reviewPhaseOptions"
              outlined
              style="display: block; width: 240px; height: 60px"
            />
          </div>
          <q-btn
            color="primary"
            rounded
            style="width: 100px; height: 40px"
            @click="onEvent.clickUpdate"
          >
            <q-spinner-ios
              v-if="isLoading.clickUpdate"
              color="white"
              size="1em"
            />
            <span v-else>一括更新</span>
          </q-btn>
        </div>
      </q-card>
      <ListGrid>
        <template v-for="e in projectList">
          <CardProject
            @update:check="onEvent.check"
            check
            :id="e.project_id"
            :name="e.name"
            :description="e.description"
            :avatar_uri="e.avatar_uri"
            :contributor_count="e.contributor_count"
            :invested_amount="e.invested_amount"
            :review_phase="e.review_phase"
            :voted_amount="e.voted_amount"
          />
        </template>
      </ListGrid>
    </div>
  </NuxtLayout>
</template>
