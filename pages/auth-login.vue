<script setup lang="ts">
import { useDisplay } from "vuetify";
import { schemaAuthCredentials } from "@/schemas";
import {
  NotifyLoginUnsuccessfull,
  ResetPasswordRequestLink,
} from "@/components/app";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { width, mdAndUp } = useDisplay();

const auth = useStoreApiAuthProvideSocial();
const authEmail$ = ref("");
const authPassword$ = ref("");

const authInputsClear = () => {
  authEmail$.value = "";
  authPassword$.value = "";
};

const toggleAuthSubmitError = useToggleFlag();
const watchIDEmail = useUniqueId();
const watchIDPassword = useUniqueId();
const { watchProcessing } = useStoreAppProcessing();
const pauth = useProcessMonitor();
watchProcessing(() => pauth.processing.value);
watch(
  () => auth.api.error,
  (autherr) => {
    if (autherr) toggleAuthSubmitError.on();
  }
);
const authSubmitLogin = async () => {
  if (!authEmail$.value) {
    return watchIDEmail();
  }
  if (!authPassword$.value) {
    return watchIDPassword();
  }

  try {
    pauth.begin();
    await auth.api.login(
      schemaAuthCredentials.parse({
        email: authEmail$.value,
        password: authPassword$.value,
      })
    );
  } catch (error) {
    pauth.setError(error);
    console.log({ "error:login:submit": error });
  }

  if (!pauth.error.value) {
    pauth.successful();
    authInputsClear();
  }

  pauth.done();
};
// #eos
</script>
<template>
  <section class="page-auth-login">
    <NotifyLoginUnsuccessfull v-model="toggleAuthSubmitError.isActive.value" />
    <VForm class="mt-5" @submit.prevent="authSubmitLogin" autocomplete="off">
      <VContainer :fluid="!mdAndUp" class="pa-0 ma-0">
        <VRow no-gutters class="pa-0 ma-0 gap-0">
          <!-- cell:l -->
          <VCol md="6" offset-md="0" sm="8" offset-sm="2" class="pa-0 m-0">
            <VCard
              elevation="1"
              class="py-3 backdrop-blur-lg pb-6"
              :class="[mdAndUp ? 'ms-auto' : 'mx-auto']"
              color="rgba(255,255,255,.55)"
              :rounded="mdAndUp ? 's-xl e-0' : 'xl'"
              max-width="392"
            >
              <VCardSubtitle v-if="!mdAndUp" class="*bg-red pe-1 text-end">
                <NuxtLink :to="{ name: 'auth-register' }">
                  <a class="text-primary-darken-1 link--prominent-base">
                    Registracija, nemam nalog
                  </a>
                </NuxtLink>
                <VBtn :to="{ name: 'auth-register' }" variant="plain" icon>
                  <VIcon icon="$next" size="large" />
                </VBtn>
              </VCardSubtitle>
              <VCardText class="px-6 mt-2 mt-sm-4">
                <VTextField
                  v-effect="{ watch: watchIDEmail.ID }"
                  clearable
                  variant="plain"
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
                  v-effect="{ watch: watchIDPassword.ID }"
                  clearable
                  variant="plain"
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
              <VCardActions class="pt-4">
                <VSpacer />
                <VBtn
                  size="x-large"
                  variant="tonal"
                  color="primary-darken-1"
                  type="submit"
                  min-width="69%"
                  rounded="lg2"
                >
                  Prijava
                </VBtn>
                <VSpacer />
              </VCardActions>
              <ResetPasswordRequestLink />
              <div class="d-flex items-center gap-3 my-3 opacity-50">
                <VDivider class="border-opacity-100" />
                <VIcon class="opacity-30" size="small" icon="$iconLock" />
                <VDivider class="border-opacity-100" />
              </div>
              <VCardActions>
                <VSpacer />
                <VBtn
                  size="x-large"
                  variant="tonal"
                  color="primary-darken-1 position-relative"
                  width="69%"
                  rounded="lg2"
                  @click="auth.loginFacebook"
                >
                  <VIcon
                    v-if="322 < width"
                    class="position-absolute start-3 top-1/2 -translate-y-[50%]"
                    icon="$iconFacebookColor"
                  />
                  <span>Facebook</span>
                  <VTooltip
                    activator="parent"
                    open-delay="345"
                    location="bottom"
                    class="d-flex items-center"
                  >
                    <VIcon
                      start
                      class="opacity-30 -translate-y-[2px]"
                      size="small"
                      icon="$iconLock"
                    />
                    <span
                      >Prijava sa
                      <em class="!font-sans text-body-2 !font-italic"
                        >facebook</em
                      >
                      nalogom</span
                    >
                  </VTooltip>
                </VBtn>
                <VSpacer />
              </VCardActions>
              <VCardActions class="mt-2">
                <VSpacer />
                <VBtn
                  size="x-large"
                  variant="tonal"
                  color="primary-darken-1 position-relative"
                  width="69%"
                  rounded="lg2"
                  @click="auth.loginGoogle"
                >
                  <VIcon
                    v-if="322 < width"
                    class="position-absolute start-3 top-1/2 -translate-y-[50%]"
                    icon="$iconGoogleColor"
                  />
                  <span>Google</span>
                  <VTooltip
                    activator="parent"
                    open-delay="345"
                    location="bottom"
                    class="d-flex items-center"
                  >
                    <VIcon
                      start
                      class="opacity-30 -translate-y-[2px]"
                      size="small"
                      icon="$iconLock"
                    />
                    <span
                      >Prijava sa
                      <em class="!font-sans text-body-2 !font-italic"
                        >google</em
                      >
                      nalogom</span
                    >
                  </VTooltip>
                </VBtn>
                <VSpacer />
              </VCardActions>
            </VCard>
          </VCol>
          <!-- cell:r -->
          <VCol v-if="mdAndUp" md="6" class="pa-0 ma-0">
            <VCard
              max-width="392"
              rounded="s-0 e-xl"
              class="border-primary border-opacity-75 pa-3 ma-0 fill-height !bg-stone-50 d-flex flex-col"
              :class="[mdAndUp ? 'me-auto' : 'mx-auto']"
              elevation="1"
              id="id--tpy4lTkbF"
              border="s"
            >
              <VCardItem
                class="opacity-75 text-center text-medium-emphasis font-italic !font-sans text-body-1"
              >
                Dobrodošli nazad
              </VCardItem>
              <VCardText
                class="space-y-8 *text-medium-emphasis pa-5"
                style="font-size: 1.22rem"
              >
                <p class="leading-normal *indent-4 text-center">
                  Za pristup uslugama koje nudimo potrebna je prijava.
                </p>
                <p class="text-center">Hvala na poverenju.</p>
                <p class="text-center">Vaš kantar.rs</p>
              </VCardText>

              <VSpacer />
              <VCardItem class="*bg-red pe-1">
                <template #append>
                  <VBtn :to="{ name: 'auth-register' }" variant="plain" icon>
                    <VIcon icon="$next" size="large" />
                  </VBtn>
                </template>
                <VCardSubtitle
                  class="text-center ms-12"
                  style="font-size: 1.022rem"
                >
                  <NuxtLink :to="{ name: 'auth-register' }">
                    <a class="text-primary-darken-1 link--prominent-base">
                      Registracija, nemam nalog
                    </a>
                  </NuxtLink>
                </VCardSubtitle>
              </VCardItem>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VForm>
  </section>
</template>
<style lang="scss" scoped>
#id--tpy4lTkbF {
  background: white url("~/assets/images/bg-serbia-01-1.png");
  background-size: cover;
}
</style>
