<script setup lang="ts">
const router = useRouter();

const form = {
  ref: ref({
    validate: () => {},
    resetValidation: () => {},
  }),
  email: ref<string>(""),
  password: ref<string>(""),
  passwordConfirm: ref<string>(""),
};

onMounted(() => {});
const onEvent = {
  clickNext: () => {
    form.ref.value.validate();
  },
  clickBack: () => {
    router.push(`/connect/`);
    form.ref.value.resetValidation();
  },
};
</script>

<template>
  <q-form :ref="form.ref">
    <Input
      label="Email"
      icon="email"
      v-model:value="form.email.value"
      :rules="[
        (val:string) => val.length > 0 || '入力必須です',
        (val:string) => val.length < 10 || 'Please set value to maximum 60',
      ]"
    />
    <Input
      label="Password"
      icon="key"
      v-model:value="form.password.value"
      :rules="[
        (val:string) => val.length > 0 || '入力必須です',
        (val:string) => val.length < 10 || 'Please set value to maximum 60',
      ]"
    />
    <Input
      label="Password"
      icon="key"
      v-model:value="form.passwordConfirm.value"
      :rules="[
        (val:string) => val.length > 0 || '入力必須です',
        (val:string) => val.length < 10 || 'Please set value to maximum 60',
      ]"
    />
    <div class="column items-center">
      <Button
        bgColor="primary"
        color="white"
        borderColor="transparent"
        @click="onEvent.clickNext"
        class="q-mt-md"
      >
        Sign Up
      </Button>
      <Button
        bgColor="gray"
        color="white"
        borderColor="transparent"
        @click="onEvent.clickBack"
        class="q-mt-md"
      >
        Back
      </Button>
    </div>
  </q-form>
</template>

<style lang="scss" scoped></style>
