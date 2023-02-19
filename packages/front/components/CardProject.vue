<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <NuxtLink :to="`/projects/${$props.id}`">
    <q-card class="c-card-project cursor-pointer">
      <q-img src="https://unsplash.it/640/425?random" height="120px" />
      <div class="c-card-project__content">
        <Avatar
          class="c-card-project__content__avatar"
          src="https://yt3.ggpht.com/6Ta7bIKEUbtTC5tlTmmPGNckEprYUIjy_fMsGse2CSw60BiYeFhiM90WwAM7YcspbFiRiLS0zY4=s88-c-k-c0x00ffffff-no-rj"
          outline
          shadow
        />
        <q-item class="c-card-project__content__abstract">
          <q-item-section>
            <q-item-label class="ellipsis-2-lines text-bold"
              >ねこあつめの会社　ヒットポイントチャンネル</q-item-label
            >
            <q-item-label caption class="ellipsis-3-lines">
              ゲーム・アプリ開発会社【株式会社ヒットポイント】の公式Youtubeチャンネルです。
              This is the official Youtube channel of Hitpoint, Inc., game/app
              developer of "Neko Atsume" and "Tabikaeru".
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="c-card-project__content__stat">
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
      </div>
    </q-card>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-card-project {
  &__content {
    position: relative;
    padding: 12px;
    padding-top: 32px;

    &__avatar {
      position: absolute;
      width: 48px;
      height: 48px;
      top: -24px;
      left: 0;
      right: 0;
      margin: auto;
    }

    &__abstract {
      white-space: wrap;
      word-break: break-all;
    }

    &__stat {
      .q-item__section {
        justify-content: left !important;
      }
      .q-item__label {
        font-size: 0.8em;
      }
    }
  }
}
</style>
