<script setup lang="ts">
const progress = computed(() => (Math.floor(100 / 8) / 100) * 5);
onMounted(async () => {});
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
          <div class="row q-gutter-lg">
            <q-card style="width: 100%; max-width: 450px">
              <q-parallax
                src="https://cdn.quasar.dev/img/parallax1.jpg"
                :height="150"
              />

              <q-card-section class="row">
                <div class="text">投稿者名投稿者名投稿者</div>
                <div class="text">
                  <q-icon class="bg-primary" name="calendar" />
                  2023年4月3日（月）
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text">
                  投稿タイトルが入ります投稿タイトルが入ります投..
                </div>
                <div class="text">
                  投稿内容が入ります投稿内容が入ります投稿内容が入ります投稿内容が入ります投稿内容が入ります投稿内容が入ります投稿内容が入ります投稿内容が入ります投稿内容が入りま
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 q-pa-lg bg-white">
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
        />
      </div>
    </div>
  </div>
</template>
