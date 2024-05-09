<script setup lang="ts">
import { schemaAuthCredentials } from "@/schemas";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const auth = useStoreApiAuth();

const authEmail$ = ref("");
const authPassword$ = ref("");
const authIsCompany$ = ref(false);

const { APP_PROCESSING } = useAppConfig().key;
const flags = useStoreFlags();

const authSubmitRegister = async () => {
  let creds;
  try {
    creds = schemaAuthCredentials.parse({
      email: authEmail$.value,
      password: authPassword$.value,
      company: authIsCompany$.value,
    });
  } catch (error) {
    // pass
    console.error({ error });
  }
  if (!creds) return;
  //
  try {
    // @@
    flags.on(APP_PROCESSING);
    await auth.register(creds);
  } catch (error) {
    console.log({ error });
  }
  flags.off(APP_PROCESSING);
};

// #eos
</script>
<template>
  <section class="page-auth-register">
    <VForm @submit.prevent="authSubmitRegister" autocomplete="off">
      <VCard
        elevation="2"
        class="pa-1 pa-sm-2 mx-auto *mt-sm-10 backdrop-blur-lg"
        max-width="550"
        color="rgba(255,255,255,.55)"
      >
        <VCardTitle class="d-flex justify-between">
          <NuxtLink to="auth-login">
            <a class="text-medium-emphasis hover:underline opacity-60"
              >Prijava</a
            >
          </NuxtLink>
          <NuxtLink to="auth-register">
            <a class="text-primary-darken-1">Registracija</a>
          </NuxtLink>
        </VCardTitle>
        <VCardText class="mt-2 mt-sm-4 pb-0">
          <VTextField
            clearable
            variant="underlined"
            type="email"
            v-model="authEmail$"
            label="Email: *"
          >
            <template #prepend>
              <VIcon
                size="large"
                icon="$iconEnvelope"
                class="!opacity-30 -rotate-2"
                color="primary-darken-1"
              />
            </template>
          </VTextField>
          <VTextField
            clearable
            variant="underlined"
            autocomplete="off"
            type="password"
            v-model="authPassword$"
            label="Lozinka: *"
          >
            <template #prepend>
              <VIcon
                size="large"
                icon="$iconKey"
                class="!opacity-30"
                color="primary-darken-1"
              />
            </template>
          </VTextField>
          <VCheckbox
            color="primary"
            v-model="authIsCompany$"
            class="-translate-x-2"
          >
            <template #label>
              <span class="ps-3"> Registrujem se kao prodavac. </span>
            </template>
          </VCheckbox>
        </VCardText>
        <VCardActions class="d-flex flex-col gap-y-4 sm:gap-y-6 pt-2">
          <VBtn
            size="large"
            block
            variant="tonal"
            color="primary-darken-1"
            type="submit"
          >
            Ok
          </VBtn>
          <NuxtLink :to="{ name: 'auth-login' }">
            <a class="cursor-pointer hover:underline text-primary-darken-1">
              <em> Prijava, imam nalog. </em>
            </a>
          </NuxtLink>
        </VCardActions>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped>
</style>
