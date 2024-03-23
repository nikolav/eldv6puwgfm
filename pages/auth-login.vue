<script setup lang="ts">
import { schemaAuthCredentials } from "@/schemas";

definePageMeta({
  layout: "auth",
});

const { APP_PROCESSING } = useAppConfig().key;
const flags$ = useStoreFlags();
const auth = useStoreApiAuth();

const authEmail$ = ref("");
const authPassword$ = ref("");

const authInputsClear = () => {
  authEmail$.value = "";
  authPassword$.value = "";
};

const authSubmitLogin = async () => {
  let creds;
  let error_;
  try {
    creds = schemaAuthCredentials.parse({
      email: authEmail$.value,
      password: authPassword$.value,
    });
  } catch (error) {
    // pass
    error_ = error;
    console.error({ error });
  }
  if (!creds) return;
  //
  try {
    flags$.on(APP_PROCESSING);
    console.log(`@authSubmit:login`);
    await auth.login(creds);
  } catch (error) {
    error_ = error;
    console.log({ "auth:error": error });
  }
  //
  if (!error_) authInputsClear();
  flags$.off(APP_PROCESSING);
};

// #eos
</script>
<template>
  <section class="page-auth-login">
    <VForm @submit.prevent="authSubmitLogin" autocomplete="off">
      <VCard
        elevation="2"
        class="pa-1 pa-sm-2 mx-auto backdrop-blur-lg"
        max-width="550"
        color="rgba(255,255,255,.55)"
      >
        <VCardTitle class="d-flex justify-between">
          <NuxtLink to="auth-login">
            <a class="text-primary-darken-1">Prijava</a>
          </NuxtLink>
          <NuxtLink to="auth-register">
            <a class="text-medium-emphasis hover:underline opacity-60"
              >Registracija</a
            >
          </NuxtLink>
        </VCardTitle>
        <VCardText class="mt-2 mt-sm-4">
          <VTextField
            clearable
            variant="underlined"
            type="email"
            v-model.trim="authEmail$"
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
            v-model.trim="authPassword$"
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
        </VCardText>
        <VCardActions class="d-flex flex-col gap-y-6 sm:gap-y-8 pt-0">
          <NuxtLink :to="{ name: 'auth-register' }">
            <a class="cursor-pointer hover:underline text-primary-darken-1">
              <em> Registracija, nemam nalog. </em>
            </a>
          </NuxtLink>
          <VBtn
            size="large"
            block
            variant="tonal"
            color="primary-darken-1"
            type="submit"
          >
            Ok
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped>
</style>
