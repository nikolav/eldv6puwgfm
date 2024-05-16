<script setup lang="ts">
import { schemaAuthCredentials } from "@/schemas";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const auth = useStoreApiAuthProvideSocial();
const authEmail$ = ref("");
const authPassword$ = ref("");
const authPasswordRepeat$ = ref("");
const authIsCompany$ = ref(false);
const authInputsClear = () => {
  authEmail$.value = "";
  authPassword$.value = "";
  authPasswordRepeat$.value = "";
  authIsCompany$.value = false;
};

const watchIDTOS = useUniqueId();
const authIsTOS$ = ref(true);
const mBeforeAuthRunTOS = (callbackAuth: any) =>
  authIsTOS$.value ? callbackAuth() : watchIDTOS();

const watchIDEmail = useUniqueId();
const watchIDPassword = useUniqueId();
const watchIDPasswordRepeat = useUniqueId();
const pauth = useProcessMonitor();
const { watchProcessing } = useStoreAppProcessing();
watchProcessing(() => pauth.processing.value);
const authSubmitRegister = async () => {
  if (!authEmail$.value) return watchIDEmail();
  if (!authPassword$.value) return watchIDPassword();
  if (!authPasswordRepeat$.value) return watchIDPasswordRepeat();
  if (!(authPassword$.value === authPasswordRepeat$.value)) {
    watchIDPassword();
    watchIDPasswordRepeat();
    return;
  }

  try {
    pauth.begin();
    await auth.api.register(
      schemaAuthCredentials.parse({
        email: authEmail$.value,
        password: authPassword$.value,
        company: authIsCompany$.value,
      })
    );
  } catch (error) {
    pauth.setError(error);
    console.error({ error });
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
  <section class="page-auth-register">
    <VForm
      class="mt-5"
      @submit.prevent="mBeforeAuthRunTOS(authSubmitRegister)"
      autocomplete="off"
    >
      <VContainer class="pa-0 ma-0">
        <VRow no-gutters class="pa-0 ma-0 gap-0">
          <!-- cell:l -->
          <VCol sm="6" class="pa-0 ma-0">
            <VCard
              max-width="422"
              rounded="s-xl e-0"
              class="border-primary border-opacity-75 pa-3 ma-0 fill-height ms-auto !bg-stone-50 d-flex flex-col"
              elevation="1"
              id="id--EOpcLONp"
              border="e"
            >
              <VCardItem
                class="opacity-75 text-center text-medium-emphasis font-italic !font-sans text-body-1"
              >
                Dobrodošli na kantar.rs
              </VCardItem>
              <VCardText
                class="space-y-8 *text-medium-emphasis pa-5"
                style="font-size: 1.22rem"
              >
                <p class="leading-normal indent-3">
                  Za pristup uslugama koje nudimo potrebna je registracija kao
                  kupac ili prodavac.
                </p>
                <p class="text-center">Hvala na poverenju.</p>
                <p class="text-center">Vaš kantar.rs</p>
              </VCardText>

              <VSpacer />
              <VCardItem class="*bg-red ps-1">
                <template #prepend>
                  <VBtn :to="{ name: 'auth-login' }" variant="plain" icon>
                    <VIcon icon="$prev" size="large" />
                  </VBtn>
                </template>
                <VCardSubtitle
                  class="text-center me-12"
                  style="font-size: 1.022rem"
                >
                  <NuxtLink :to="{ name: 'auth-login' }">
                    <a class="text-primary-darken-1 link--prominent-base">
                      Prijava, imam nalog
                    </a>
                  </NuxtLink>
                </VCardSubtitle>
              </VCardItem>
            </VCard>
          </VCol>

          <!-- cell:r -->
          <VCol sm="6" class="pa-0 m-0">
            <VCard
              elevation="1"
              class="py-3 mr-auto backdrop-blur-lg pb-6"
              color="rgba(255,255,255,.55)"
              rounded="e-xl s-0"
              max-width="489"
            >
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
                <VTextField
                  v-effect="{ watch: watchIDPasswordRepeat.ID }"
                  clearable
                  variant="plain"
                  autocomplete="off"
                  type="password"
                  v-model.trim="authPasswordRepeat$"
                  label="Ponovite lozinku: *"
                >
                  <template #prepend>
                    <VIcon
                      size="small"
                      icon="$iconKeyTwo"
                      class="!opacity-30 ms-1"
                      color="primary-darken-1"
                    />
                  </template>
                </VTextField>
                <VCheckbox
                  v-model="authIsCompany$"
                  color="primary-darken-1"
                  class="mt-3 *bg-red *ps-2 w-fit mx-auto -translate-x-3 scale-110"
                  label="Registrujem se kao prodavac"
                />
                <VCheckbox
                  v-effect="{ watch: watchIDTOS.ID }"
                  v-model="authIsTOS$"
                  color="primary-lighten-1"
                  class="*bg-red *ps-2 w-fit mx-auto -translate-x-3 scale-90 opacity-75"
                >
                  <template #label>
                    Pristajem na
                    <NuxtLink :to="{ name: 'tos' }" target="_blank">
                      <a
                        class="text-primary-lighten-1 link--prominent-base mx-1 font-italic text-body-1 !font-sans"
                      >
                        prava korišćenja
                      </a>
                    </NuxtLink>
                    kantar.rs
                  </template>
                </VCheckbox>
              </VCardText>
              <VCardActions class="pt-4">
                <VSpacer />
                <VBtn
                  size="x-large"
                  variant="tonal"
                  color="primary-darken-1 text-none"
                  type="submit"
                  min-width="69%"
                  rounded="lg2"
                >
                  <strong> REGISTRACIJA </strong>
                  <small class="ms-2 opacity-80 text-medium-emphasis"
                    >({{ authIsCompany$ ? "prodavac" : "kupac" }})</small
                  >
                </VBtn>
                <VSpacer />
              </VCardActions>
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
                  @click="
                    mBeforeAuthRunTOS(() =>
                      auth.loginFacebook({ company: authIsCompany$ })
                    )
                  "
                >
                  <VIcon
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
                      >Registrujem se sa svojim
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
                  @click="
                    mBeforeAuthRunTOS(() =>
                      auth.loginGoogle({ company: authIsCompany$ })
                    )
                  "
                >
                  <VIcon
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
                      >Registrujem se sa svojim
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
        </VRow>
      </VContainer>
    </VForm>
  </section>
</template>
<style lang="scss" scoped>
#id--EOpcLONp {
  background: white url("~/assets/images/carpet-02.png");
  background-size: cover;
}
</style>
