<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const title = ref<string>("ねこあつめプロジェクト");
const description = ref<string>(
  "ゲーム・アプリ開発会社【株式会社ヒットポイント】の公式Youtubeチャンネルです。"
);

onMounted(async () => {});
</script>

<template>
  <NuxtLayout name="dashboard">
    <FrameParallax
      :backgroundImage="''"
      :avatarImage="'https://yt3.ggpht.com/6Ta7bIKEUbtTC5tlTmmPGNckEprYUIjy_fMsGse2CSw60BiYeFhiM90WwAM7YcspbFiRiLS0zY4=s88-c-k-c0x00ffffff-no-rj'"
      :avatarLink="''"
    >
      <div class="p-content">
        <div class="p-content__title">
          <h2 class="text-h5 text-center q-pb-sm" v-if="true">
            {{ title }}
            <q-icon name="check_circle" color="primary" class="q-pl-sm" />
          </h2>
          <q-skeleton v-else style="width: 240px; margin: auto" />
        </div>
        <div class="p-content__stat">
          <div class="p-content__stat__blank"></div>
          <q-item class="p-content__stat__info q-pb-md">
            <q-item-section class="text-center">
              <q-item-label caption>メンバー数</q-item-label>
              <TextNumber :value="123" unit="人" />
            </q-item-section>
            <q-item-section class="text-center">
              <q-item-label caption>調達済額</q-item-label>
              <TextNumber :value="100000" unit="円" />
            </q-item-section>
            <q-item-section class="text-center">
              <q-item-label caption>進捗</q-item-label>
              <q-badge
                rounded
                color="teal"
                transparent
                class="flex justify-center q-my-xs q-py-xs q-px-sm"
              >
                STEP1
              </q-badge>
            </q-item-section>
          </q-item>
          <div class="p-content__stat__button">
            <q-btn icon="groups" color="secondary" shadow rounded @click=""
              >プロジェクトへ参加</q-btn
            >
          </div>
        </div>
        <p class="p-content__description">
          {{ description }}
        </p>
      </div>
      <FrameTabs
        :tabs="[
          {
            name: 'activity',
            icon: 'movie',
            label: 'アクティビティ',
            action: () => router.push(`/projects/${route.params.id}/activity/`),
            badge: 2,
          },
          {
            name: 'progress',
            icon: 'movie',
            label: 'リクエスト',
            action: () => router.push(`/projects/${route.params.id}/request/`),
            badge: 1,
          },
          {
            name: 'offer',
            icon: 'note',
            label: 'オファー',
            action: () => router.push(`/projects/${route.params.id}/offer/`),
            badge: 0,
          },
        ]"
      >
        <NuxtPage class="q-px-md" />
      </FrameTabs>
    </FrameParallax>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "assets/css/index.scss";

.p-content {
  padding-top: 24px;
  &__title {
    display: flex;
    justify-content: center;
  }
  &__stat {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
    @include desktop {
      justify-content: space-between;
      flex-direction: row;
    }
    &__blank {
      @include desktop {
        width: 100%;
        max-width: 420px;
        height: 60px;
      }
      height: 0;
    }
    &__info {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      max-width: 360px;
    }
    &__button {
      display: flex;
      justify-content: right;
      @include mobile {
        justify-content: center;
      }
      width: 100%;
      max-width: 420px;
      min-height: 40px;
    }
  }
  &__description {
    white-space: pre-wrap;
    margin: 10px 4% 20px 4%;
    @include clamp(5);
  }
}
</style>
