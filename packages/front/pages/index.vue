<script setup lang="ts">
import { $auth } from "@stores";

const addressList = ref<Record<string, any>>({});

onMounted(async () => {
  addressList.value = await useQuery("findManyAddressCard", null, null, {
    auth: {
      type: $auth().type,
      access_token: $auth().token.access_token,
    },
  });
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="q-px-lg q-py-xs">
      <ListGrid>
        <NuxtLink to="/login/">
          <q-card flat bordered>
            <q-card-section class="text-h6" style="word-break: break-all">
              /login/
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
        </NuxtLink>
        <NuxtLink
          :to="`/connect/merchant/${
            $auth().profile.user_id.length
              ? $auth().profile.user_id
              : '0000000000'
          }/`"
        >
          <q-card flat bordered>
            <q-card-section class="text-h6" style="word-break: break-all">
              /connect/
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
        </NuxtLink>
        <NuxtLink
          :to="`/user/${
            $auth().profile.user_id.length
              ? $auth().profile.user_id
              : '0000000000'
          }/`"
        >
          <q-card flat bordered>
            <q-card-section class="text-h6" style="word-break: break-all">
              /user/
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
        </NuxtLink>

        <NuxtLink :to="`/projects/`">
          <q-card flat bordered>
            <q-card-section class="text-h6" style="word-break: break-all">
              /projects/
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
        </NuxtLink>
      </ListGrid>

      <TableAddressList :data="addressList" />
    </div>
  </NuxtLayout>
</template>
