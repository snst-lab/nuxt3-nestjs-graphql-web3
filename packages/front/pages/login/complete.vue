<script setup lang="ts">
import { $auth, $loading } from "@stores";

const router = useRouter();
const isButtonShow = ref<boolean>(false);

const onEvent = {
  clickGoogle: () => {
    $auth().saveUrl(`/signup/complete/`);
    $auth().login("google");
  },
};
onMounted(async () => {
  try {
    $loading().show();
    const { user_id } = await useMutation(
      "upsertUser",
      {
        data: {
          auth_type: "google",
          email: $auth().profile.email,
          name: $auth().profile.name,
          first_name: $auth().profile.name,
          last_name: $auth().profile.name,
          social_id: $auth().profile.social_id,
          tel: "",
          zip1: "",
          zip2: "",
          address1: "",
          address2: "",
          address3: "",
          address4: "",
        },
      },
      null,
      {
        auth: {
          type: $auth().type,
          access_token: $auth().token.access_token,
        },
      }
    );
    if (!user_id) {
      throw new Error();
    }
    $auth().profile.user_id = user_id;
    $loading().hide();
    router.push(`/`);
  } catch {
    $loading().hide();
    isButtonShow.value = true;
  }
});
</script>

<template>
  <NuxtLayout name="blank">
    <ButtonSocialLogin
      v-show="isButtonShow"
      provider="google"
      @click="onEvent.clickGoogle"
    />
  </NuxtLayout>
</template>
