<script setup lang="ts">
import { URL_MAIL_PACKAGES_REQUEST } from "@/config";
import {
  TopicChat,
  HeaderProminent,
  VCardBronze,
  VCardSilver,
  VCardGold,
} from "@/components/app";

const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
const { TOPIC_CHAT_PACKAGES } = useTopics();
const togglePackagesRequest = useToggleFlag();
const togglePackagesRequestStatus = useToggleFlag();

const name$ = ref();
const packageType$ = ref();
const contact$ = ref();
const message$ = ref();
const clearFields = () => {
  name$.value = "";
  packageType$.value = "";
  contact$.value = "";
  message$.value = "";
};

const procRequest = useProcessMonitor();
const watchIDContactRequired = useUniqueId();
const { watchProcessing } = useStoreAppProcessing();
watchProcessing(() => procRequest.processing.value);
const sendMessage = async () => {
  if (!contact$.value) {
    watchIDContactRequired();
    return;
  }
  try {
    procRequest.begin();
    // @@debug
    console.log({
      resPackageRequestMail: await $fetch(URL_MAIL_PACKAGES_REQUEST, {
        method: "POST",
        body: {
          name: name$.value,
          type: packageType$.value,
          contact: contact$.value,
          message: message$.value,
        },
      }),
    });
  } catch (error) {
    procRequest.setError(error);
    throw error;
  } finally {
    procRequest.done();
  }
  if (!procRequest.error.value) {
    procRequest.successful();
    togglePackagesRequestStatus.on();
  }
  clearFields();
  togglePackagesRequest.off();
};

const refCardBronze = ref();
const { width: wCardBronze } = useElementSize(refCardBronze);

// @@eos
</script>
<template>
  <section class="page--paketi">
    <!-- @signal --request-sent -->
    <VSnackbar
      v-model="togglePackagesRequestStatus.isActive.value"
      color="transparent"
      variant="text"
      location="bottom"
      :transition="DEFAULT_TRANSITION"
    >
      <VAlert rounded="lg" type="success" prominent elevation="4">
        <div class="d-flex justify-between items-center gap-4 sm:gap-8">
          <strong style="font-size: 1.55rem" class="ms-1">👌🏻</strong>
          <div
            style="font-size: 1.022rem"
            class="tracking-wide leading-normal text-center"
          >
            <p>Vaš zahtev je uspešno prosleđen.</p>
            <p>Očekujte uskoro odgovor od našeg tima.</p>
          </div>
          <strong style="font-size: 1.55rem">👋🏻</strong>
          <VBtn
            @click="togglePackagesRequestStatus.off"
            color="on-success"
            variant="plain"
            icon
          >
            <VIcon size="large" icon="$close" />
          </VBtn>
        </div>
      </VAlert>
    </VSnackbar>

    <VDialog
      v-model="togglePackagesRequest.isActive.value"
      scrim="white"
      :transition="DEFAULT_TRANSITION"
      max-width="812"
      location="top"
    >
      <VCard
        height="100%"
        rounded="lg te-xl"
        class="pa-5 border-primary border-opacity-50"
        border="s-lg"
      >
        <VBtn
          class="position-absolute end-5 top-5 z-[1]"
          icon
          variant="plain"
          @click="togglePackagesRequest.off"
        >
          <VIcon size="large" icon="$close" />
        </VBtn>
        <div
          class="h-[32px] *bg-red d-flex items-center justify-center overflow-hidden"
        >
          <VIcon
            color="primary-lighten-2"
            :size="122"
            icon="$iconLogoKantarH"
            class="opacity-40"
          />
        </div>
        <VContainer class="mt-3">
          <VRow>
            <VCol sm="5">
              <div class="space-y-5 pa-2 text-center">
                <VCardSubtitle> Zahtev za paket </VCardSubtitle>
                <p class="text-start">
                  Ostavite nam poruku i brzo ćemo stupiti u kontakt sa Vama da
                  se dogovorimo o svemu.
                </p>
                <p>Hvala na poverenju.</p>
                <p>Čujemo se. 👌🏻</p>
              </div>
            </VCol>
            <VCol sm="7">
              <VCardText class="space-y-2">
                <VTextField
                  v-model="name$"
                  label="Vaše ime *"
                  variant="underlined"
                />
                <VTextField
                  v-model.trim="packageType$"
                  label="Zanima me *"
                  variant="underlined"
                  suffix=" paket"
                />
                <VTextField
                  v-effect="{ watch: watchIDContactRequired.ID }"
                  v-model.trim="contact$"
                  label="Kontakt telefon ili email adresa *"
                  variant="underlined"
                  placeholder="067 890 12 34"
                />
                <VTextarea
                  v-model="message$"
                  label="Poruka "
                  variant="underlined"
                  placeholder="Želeo bih još da se raspitam..."
                  clearable
                />
              </VCardText>
              <VCardActions>
                <VSpacer />
                <VBtn
                  @click="sendMessage"
                  variant="tonal"
                  size="x-large"
                  color="primary"
                  class="px-5"
                >
                  <strong style="font-size: 1.44rem">📧</strong>
                  <strong style="font-size: 1.33rem" class="ms-2">Ok</strong>
                </VBtn>
                <VSpacer />
              </VCardActions>
            </VCol>
          </VRow>
        </VContainer>
      </VCard>
    </VDialog>

    <VContainer class="!max-w-[1450px] mx-auto">
      <HeaderProminent>
        <template #text>
          <div class="d-flex items-center *bg-red w-full">
            <h2
              class="ps-16 mt-10 text-truncate font-sans !tracking-wider opacity-60"
              style="font-size: 3rem"
            >
              <strong>
                Paketi usluga
                <NuxtLink :to="{ name: 'index' }" target="_blank">
                  <a class="link--prominent-base text-primary"> kantar.rs </a>
                </NuxtLink>
              </strong>
            </h2>
            <VSpacer />
            <VSpacer />
            <div class="mt-16 scale-150">
              <TopicChat
                color="white"
                title="Paketi"
                :topic="TOPIC_CHAT_PACKAGES"
              />
            </div>
            <VSpacer />
          </div>
        </template>
        <template #prepend>
          <VIcon
            style="font-size: 7.22rem"
            class="rotate-[-5deg] opacity-20 translate-x-3"
            icon="$iconMedal"
          />
        </template>
      </HeaderProminent>

      <VSpacer class="mb-5" />
      <VRow>
        <!-- bronze -->
        <VCol md="4">
          <VCardBronze />
        </VCol>
        <!-- siver -->
        <VCol md="4">
          <VCardSilver>
            <template #action>
              <VSpacer />
              <VBtn
                @click="
                  () => {
                    packageType$ = 'srebrni';
                    togglePackagesRequest.on();
                  }
                "
                height="4rem"
                width="55%"
                variant="elevated"
                color="#6b7280"
                size="x-large"
                rounded="lg"
                class="px-5 ma-5"
                elevation="1"
              >
                <VIcon
                  size="x-large"
                  start
                  icon="$iconMedal"
                  class="opacity-20"
                />
                <strong> Izaberi paket </strong>
              </VBtn>
              <VSpacer />
            </template>
          </VCardSilver>
        </VCol>
        <!-- zlatni -->
        <VCol md="4">
          <VCardGold>
            <template #action>
              <VSpacer />
              <VBtn
                @click="
                  () => {
                    packageType$ = 'zlatni';
                    togglePackagesRequest.on();
                  }
                "
                height="4rem"
                width="55%"
                variant="elevated"
                color="#aa843f"
                size="x-large"
                rounded="lg"
                class="px-5 ma-5"
                elevation="1"
              >
                <VIcon
                  size="x-large"
                  start
                  icon="$iconMedal"
                  class="opacity-40"
                />
                <strong> Izaberi paket </strong>
              </VBtn>
              <VSpacer />
            </template>
          </VCardGold>
        </VCol>
      </VRow>
      <VSpacer class="mb-48" />
    </VContainer>
  </section>
</template>
<style lang="scss" scoped></style>
