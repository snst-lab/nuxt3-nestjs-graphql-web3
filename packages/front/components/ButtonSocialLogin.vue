<script setup lang="ts">
const props = defineProps<{
  provider: Auth.AuthType;
  small?: boolean;
}>();
const router = useRouter();

function onClick() {
  router.push(`/auth/${props.provider}/`);
}
</script>
<template>
  <Button
    :small="small"
    :icon="`social/${provider}.svg`"
    borderColor="grey-9"
    @click="onClick"
    inset
  >
    Continue with {{ provider.toLocaleUpperCase() }}
  </Button>
</template>
