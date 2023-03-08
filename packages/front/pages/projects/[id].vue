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
          </h2>
          <q-skeleton v-else style="width: 240px; margin: auto" />
        </div>
      </div>
      <NuxtPage class="q-pa-xl" />
      <DialogVote />
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
