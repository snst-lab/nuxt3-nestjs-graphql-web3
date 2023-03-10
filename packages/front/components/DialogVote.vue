<script setup lang="ts">
import { parseUnits } from "ethers/lib/utils";
import { $dialog, $wallet } from "@stores";
import { tools } from "@tools";

const { public: constants } = useRuntimeConfig();
const { gasLimit } = constants.web3.number;

const balance = ref<number>(0);
const currentAmount = ref<number>(0);
const diffAmount = ref<number>(0);
const afterEditAmount = ref<number>(0);
const isLoaded = ref<boolean>(true);

const ballot = await useContract("Ballot");

const onEvent = {
  clickVote: async () => {
    if ($dialog().args.vote?.projectId) {
      if (diffAmount.value === 0) {
        $dialog().show("message", {
          title: "エラー",
          message: "0以上の金額を投票してください",
        });
        return;
      }
      await useMutation("vote", {
        voter_address: $wallet().address,
        project_id: Number($dialog().args.vote.projectId),
        amount: diffAmount.value,
      });
      isLoaded.value = false;
    }
  },
};

watch(
  () => $dialog().args.vote,
  async (after, before) => {
    isLoaded.value = false;
    if (!before?.projectId && after?.projectId) {
      const ballotToken = await useToken("Token");
      balance.value = await $wallet().getBalance(ballotToken);
      await tools.sleep(500);
      isLoaded.value = true;
    }
  }
);

onMounted(() => {
  watchContractEvent(ballot, "Vote", async (sender, projectId, amount) => {
    await tools.sleep(500);
    isLoaded.value = true;
    if ($dialog().args.vote) {
      const rawAmount = amount / 10 ** 18;
      await $dialog().hide("vote");
      await $dialog().show("complete", {
        title: "投票完了",
        message: `プロジェクトへ ${
          Math.round(rawAmount * 10 ** 2) / 10 ** 2
        }USD 相当の投票を行いました`,
      });
      await tools.sleep(5000);
      window.location.reload();
    }
  });
});
</script>

<template>
  <Dialog
    name="vote"
    :title="`プロジェクトに投票する`"
    :onHide="
      () => {
        diffAmount = 0;
        afterEditAmount = currentAmount;
      }
    "
    :width="500"
  >
    <div class="c-dialog-vote" v-if="isLoaded">
      <q-card-section class="q-px-none q-pb-none">
        <div class="c-dialog-vote__head q-px-lg">
          <p class="q-pt-sm">プロジェクト名</p>
          <div class="c-dialog-vote__head__chain cursor-pointer">
            <AvatarMenu
              class="cursor-pointer"
              src="~/assets/icons/chain/astar.png"
              :size="24"
            />
            <div class="q-px-sm">astar</div>
          </div>
        </div>
        <p class="q-px-lg text-subtitle1">
          {{ $dialog().args.vote.projectName }}
        </p>
      </q-card-section>
      <q-card-section class="q-pt-md q-pb-none q-px-lg">
        <InputAmount v-model="diffAmount" :contrast="balance" />
      </q-card-section>
      <q-separator class="q-my-sm" />
      <q-card-section class="q-py-sm q-px-lg flex">
        <p>トークン残高</p>
        <div class="q-pl-lg">
          <p>投票前 : {{ balance.toLocaleString() }} USD</p>
          <p>投票後 : {{ (balance - diffAmount).toLocaleString() }} USD</p>
        </div>
      </q-card-section>
      <!-- <q-card-section v-else class="q-py-sm q-px-lg flex">
        <p>投票量</p>
        <div class="q-pl-lg">
          <p>投票前 : {{ balance.toLocaleString() }} USD</p>
          <p>
            投票後 : {{ balance - (currentAmount - afterEditAmount) }} USD
          </p>
        </div>
      </q-card-section> -->
      <q-card-actions class="q-pb-lg q-px-xl">
        <!-- <q-btn
          rounded
          color="secondary"
          class="col q-mx-sm"
          @click="onEvent.clickApprove"
          >投票ロック解除</q-btn
        > -->
        <q-btn rounded color="primary" class="col" @click="onEvent.clickVote"
          >投票</q-btn
        >
      </q-card-actions>
    </div>
    <div v-else class="flex justify-center q-pa-xl">
      <q-spinner-tail color="primary" size="50%" />
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-dialog-vote {
  padding: 0;
  width: 80vw;
  max-width: 500px;
  overflow: hidden;
  &__head {
    display: flex;
    align-items: center;
    &__title {
      width: 100%;
      font-weight: 500;
    }
    &__chain {
      display: inline-flex;
      padding-right: 0;
      justify-content: right;
      border-radius: 24px;
      margin-right: 0;
      margin-left: auto;
      background-color: $grey-2;
      .body--dark & {
        background-color: $grey-9;
      }
    }
  }
}
</style>
