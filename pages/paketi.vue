<script setup lang="ts">
import { URL_MAIL_PACKAGES_REQUEST } from "@/config";
import { TopicChat, HeaderProminent } from "@/components/app";

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

// @@eos
</script>
<template>
  <section class="page--paketi">
    <!-- @signal --request-sent -->
    <VSnackbar
      v-model="togglePackagesRequestStatus.isActive.value"
      color="transparent"
      variant="text"
      location="top"
      :transition="DEFAULT_TRANSITION"
    >
      <VAlert rounded="lg" type="success" prominent elevation="4">
        <div class="d-flex justify-between items-center gap-4 sm:gap-8">
          <strong style="font-size: 1.55rem" class="ms-1">👌🏻</strong>
          <div style="font-size: 1.022rem" class="tracking-wide leading-normal">
            <p>Vaša poruka je uspešno poslata.</p>
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

    <VSpacer class="mt-16" />
    <VContainer class="!max-w-[1450px] mx-auto">
      <HeaderProminent>
        <template #text>
          <div class="d-flex items-center *bg-red w-full">
            <h2
              class="ps-20 mt-16 text-truncate font-sans !tracking-wider opacity-60"
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
            style="font-size: 12rem"
            class="rotate-[-5deg] opacity-20 translate-x-3"
            icon="$iconMedal"
          />
        </template>
      </HeaderProminent>
      <VSpacer class="mb-5" />
      <VRow>
        <!-- bronze -->
        <VCol md="4">
          <VCard
            elevation="2"
            min-height="812"
            rounded="t-xl b-lg"
            class="!bg-stone-100 fill-height"
          >
            <VImg min-height="256" cover src="/kantarlogo-bronze.png">
              <VIcon
                color="white"
                icon="$iconStar"
                class="position-absolute bottom-1 end-1 *translate-y-[12%] opacity-10"
                :size="33"
              />
            </VImg>
            <VCardTitle
              class="text-medium-emphasis pa-5 text-center mt-2"
              style="font-size: 2rem"
              >Bronzani paket</VCardTitle
            >
            <VCardSubtitle class="text-center">
              Besplatan podrazumevani paket
            </VCardSubtitle>
            <VCardTitle class="mt-10 text-medium-emphasis text-center">
              Uključuje:
            </VCardTitle>
            <VCardText class="pa-3" style="font-size: 1.034rem">
              <VList class="font-sans" bg-color="transparent">
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Neograničen broj artikala za ulistavanje
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Podrška oko prezentacije proizvoda </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Jedna video reklama </span>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VCol>
        <!-- siver -->
        <VCol md="4">
          <VCard
            elevation="4"
            min-height="812"
            rounded="t-xl b-lg"
            class="!bg-slate-50 fill-height"
          >
            <VImg min-height="256" cover src="/kantarlogo-silver.png">
              <VIcon
                color="white"
                icon="$iconStar"
                class="position-absolute bottom-1 end-1 *translate-y-[12%] opacity-10"
                :size="33"
              />
              <VIcon
                color="white"
                icon="$iconStar"
                class="position-absolute bottom-1 end-9 *translate-y-[12%] opacity-10"
                :size="33"
              />
            </VImg>
            <VCardTitle
              class="text-medium-emphasis pa-5 text-center mt-2"
              style="font-size: 2rem"
              >Srebrni paket</VCardTitle
            >
            <VCardSubtitle
              class="text-center !opacity-50"
              style="font-size: 1.44rem"
            >
              15.000 dinara mesečno
            </VCardSubtitle>
            <VCardTitle class="mt-10 text-medium-emphasis text-center">
              Uključuje:
            </VCardTitle>
            <VCardText class="pa-3" style="font-size: 1.034rem">
              <VList class="font-sans" bg-color="transparent">
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Neograničen broj artikala za ulistavanje
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Jedno zakupljeno mesto u premium sekciji
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Bolja viđenost u pretragama </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Brending </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Dve video reklame </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Podrška 24/7</span>
                </VListItem>
              </VList>
            </VCardText>

            <VSpacer class="mb-48" />
            <VCardActions class="position-absolute bottom-0 w-full">
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
                Izaberi paket
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VCol>
        <!-- zlatni -->
        <VCol md="4">
          <VCard
            elevation="5"
            min-height="812"
            rounded="t-xl b-lg"
            class="!bg-yellow-50 fill-height"
          >
            <VImg min-height="256" cover src="/kantarlogo-gold.png">
              <div
                class="position-absolute bottom-1 end-1 *translate-y-[12%] opacity-30"
              >
                <VIcon color="white" icon="$iconStar" :size="33" />
                <VIcon color="white" icon="$iconStar" :size="33" />
                <VIcon color="white" icon="$iconStar" :size="33" />
              </div>
            </VImg>
            <VCardTitle
              class="text-medium-emphasis pa-5 text-center mt-2"
              style="font-size: 2rem"
              >Zlatni paket</VCardTitle
            >
            <VCardSubtitle
              class="text-center !opacity-50"
              style="font-size: 1.44rem"
            >
              22.000 dinara mesečno
            </VCardSubtitle>
            <VCardTitle class="mt-10 text-medium-emphasis text-center">
              Uključuje:
            </VCardTitle>
            <VCardText class="pa-3" style="font-size: 1.034rem">
              <VList class="font-sans" bg-color="transparent">
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Neograničen broj artikala za ulistavanje
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Dva zakuplenja mesta u premium sekciji
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Najbolja viđenost u pretragama </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Brending </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Marketing na društvenim mrežama </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">Video reklama za svaki proizvod </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Podrška 24/7</span>
                </VListItem>
              </VList>
            </VCardText>

            <!-- compensate whitespace for abs VCardActions -->
            <VSpacer class="mb-48" />
            <VCardActions class="position-absolute bottom-0 w-full">
              <VSpacer />
              <VBtn
                @click="
                  () => {
                    packageType$ = 'zlatni';
                    togglePackagesRequest.on();
                  }
                "
                class="px-5 ma-5"
                color="#eab308"
                elevation="1"
                height="4rem"
                rounded="lg"
                size="x-large"
                variant="elevated"
                width="55%"
              >
                Izaberi paket
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
      <VDivider class="border-opacity-50 my-12" />
    </VContainer>
  </section>
</template>
<style lang="scss" scoped></style>
