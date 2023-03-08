<script setup lang="ts">
import { parseUnits } from "ethers/lib/utils";
import { $dialog, $wallet } from "@stores";

const { public: constants } = useRuntimeConfig();
const { gasLimit } = constants.web3.number;

const balance = ref<number>(0);
const currentAmount = ref<number>(0);
const diffAmount = ref<number>(0);
const afterreduceAmount = ref<number>(currentAmount.value);
const isApproved = ref<boolean>(false);

const scheme = computed(() => {
  if ($dialog().args.vote) {
    return $dialog().args.vote.scheme === "add" ? "add" : "reduce";
  } else {
    return "add";
  }
});

const onEvent = {
  clickApprove: async () => {
    if ($dialog().args.vote.projectId) {
      const ballot = await useContract("Ballot");
      const ballotToken = await useToken("Token");
      const amount = parseUnits(
        diffAmount.value.toString(),
        ballotToken().decimals
      );
      await ballotToken().abi.approve(ballot().address, amount);
    }
  },
  clickExecute: async () => {
    if ($dialog().args.vote.projectId) {
      const ballot = await useContract("Ballot");
      const ballotToken = await useToken("Token");
      const amount = parseUnits(
        diffAmount.value.toString(),
        ballotToken().decimals
      );
      await ballot().abi.vote(Number($dialog().args.vote.projectId), amount, {
        gasLimit,
      });
    }
  },
};

onMounted(async () => {
  const ballotToken = await useToken("Token");
  balance.value = Number(
    (await ballotToken().abi.balanceOf($wallet().address)).toString()
  );
  console.log(balance.value);
});
</script>

<template>
  <Dialog
    name="vote"
    :title="`このプロジェクトに投票する`"
    :onHide="
      () => {
        diffAmount = 0;
        afterreduceAmount = currentAmount;
      }
    "
    :width="500"
  >
    <div class="c-dialog-staking">
      <q-card-section class="q-px-none q-pb-none">
        <div class="c-dialog-staking__head q-px-lg">
          <p class="q-pt-sm">プロジェクト名</p>
          <div class="c-dialog-staking__head__chain cursor-pointer">
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
        <!-- <q-separator class="q-my-sm" /> -->
        <!-- <q-card-section class="row q-py-xs items-center">
        <p class="col">報酬タイプ</p>
        <div class="row items-center col">
          <AvatarMenu
            class="col-4"
            src="~/assets/icons/token/USDC.webp"
            :size="24"
          />
          <p class="col-8 q-pl-md text-bold">USDC</p>
        </div>
      </q-card-section> -->
        <!-- <InputAmount
          v-model:value="afterreduceAmount"
          :contrast="currentAmount"
        /> -->
        <InputAmount v-model:value="diffAmount" :contrast="balance" />
      </q-card-section>
      <q-separator class="q-my-sm" />
      <q-card-section v-if="scheme === 'add'" class="q-py-sm q-px-lg flex">
        <p>トークン残高</p>
        <div class="q-pl-lg">
          <p>変更前 : {{ balance.toLocaleString() }} USD</p>
          <p>変更後 : {{ (balance - diffAmount).toLocaleString() }} USD</p>
        </div>
      </q-card-section>
      <q-card-section v-else class="q-py-sm q-px-lg flex">
        <p>投票量</p>
        <div class="q-pl-lg">
          <p>投票前 : {{ balance.toLocaleString() }} USD</p>
          <p>
            投票後 : {{ balance - (currentAmount - afterreduceAmount) }} USD
          </p>
        </div>
      </q-card-section>
      <q-card-actions class="q-pb-lg">
        <q-btn rounded color="warning" class="col q-mx-sm">承認</q-btn>
        <q-btn rounded color="primary" class="col" disabled>投票</q-btn>
      </q-card-actions>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-dialog-staking {
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
