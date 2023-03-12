<script setup lang="ts">
const props = defineProps<{
  check?: boolean;
  id: string;
  avatar_uri: string;
  name: string;
  description: string;
  contributor_count: number;
  invested_amount: number;
  review_phase: string;
}>();

const emit = defineEmits(["update:check"]);
const checked = ref<boolean>(false);

watch(checked, () => {
  emit("update:check", props.id, checked.value);
});
</script>

<template>
  <q-card
    class="c-card-project cursor-pointer relative"
    :class="{ checked: checked }"
  >
    <q-checkbox v-if="check" v-model:modelValue="checked" />
    <NuxtLink :to="`/projects/${id}`">
      <q-img src="https://unsplash.it/640/425?random" height="120px" />
      <div class="c-card-project__content">
        <Avatar
          class="c-card-project__content__avatar"
          :src="avatar_uri"
          outline
          shadow
        />
        <q-item class="c-card-project__content__abstract">
          <q-item-section>
            <q-item-label class="ellipsis-2-lines text-bold">
              {{ name }}
            </q-item-label>
            <q-item-label
              caption
              class="ellipsis-3-lines"
              style="min-height: 44px"
            >
              {{ description }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="c-card-project__content__stat">
          <q-item-section class="text-center">
            <q-item-label caption>メンバー数</q-item-label>
            <TextNumber :value="contributor_count" unit="人" />
          </q-item-section>
          <q-item-section class="text-center">
            <q-item-label caption>調達済額</q-item-label>
            <TextNumber :value="invested_amount" unit="円" />
          </q-item-section>
          <q-item-section class="text-center">
            <q-item-label caption>審査フェーズ</q-item-label>
            <q-badge
              rounded
              color="teal"
              transparent
              style="height: 20px"
              class="flex justify-center q-my-xs q-py-xs q-px-sm"
            >
              {{ review_phase }}
            </q-badge>
          </q-item-section>
        </q-item>
      </div>
    </NuxtLink>
  </q-card>
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
  transition: 0.2s;

  &.checked {
    transition: 0.2s;
    transform: scale(0.96);
  }
}
</style>
