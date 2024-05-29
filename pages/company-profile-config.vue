<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { ICompanyProfile } from "@/types";
import { VSnackbarStatusMessage } from "@/components/ui";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized",
});
const auth = useStoreApiAuth();
if (!auth.isCompany$) {
  setPageLayout("user-profile");
}
const emailVerified = computed(() => get(auth.user$, "email_verified"));
const {
  app: { DEFAULT_TRANSITION },
  account: { fieldsRequired },
} = useAppConfig();
const { smAndUp } = useDisplay();
const uid = computed(() => get(auth.user$, "id"));
const { authProfile } = useTopics();
const { put: profileSave } = useDoc<ICompanyProfile>(() =>
  authProfile(uid.value)
);
const linkEmbed$ = ref();
const linkEditPage$ = ref();
const profileSettingsUpdate = async () => {
  console.log(`@profileSettingsUpdate`);
  try {
    const d = {
      ...(linkEmbed$.value
        ? { googleCalendarEmbedLink: linkEmbed$.value }
        : undefined),
      ...(linkEditPage$.value
        ? { googleCalendarEditPageLink: linkEditPage$.value }
        : undefined),
    };
    if (isEmpty(d)) return;
    await profileSave(d);
  } catch (error) {
    // pass
  }
};

const { watchProcessing } = useStoreAppProcessing();
const {
  accountArchive,
  accountDrop,
  accountSendVerifyEmailLink,
  accountUpgrade,
  profileFieldsIncomplete,
} = useQueryManageAccount();
const pc1 = useProcessMonitor();
watchProcessing(() => pc1.processing.value);
const toggleAccountArchivedStatus = useToggleFlag();
const toggleAccountRemovedStatus = useToggleFlag();
const toggleAccountUpgradedStatus = useToggleFlag();
const accountArchiveConfirmed = async () => {
  let result;
  try {
    pc1.begin();
    result = get(await accountArchive(), "data.accountsArchive");
    console.log({ result });
  } catch (error) {
    pc1.setError(error);
  } finally {
    pc1.done();
  }
  if (!pc1.error.value) {
    // success; logout; redirect
    pc1.successful();
    toggleAccountArchivedStatus.on();
    setTimeout(() => auth.logout(), 1012);
  }
};

const pwd = idGen().toLocaleLowerCase();
const pwd_input = ref();
const accountDeleteConfirmed = async () => {
  if (pwd !== pwd_input.value) return;
  console.log(`deleting account`);
  let result;
  try {
    pc1.begin();
    result = get(await accountDrop(), "data.accountsDrop");
  } catch (error) {
    pc1.setError(error);
  } finally {
    pc1.done();
  }
  if (!pc1.error.value) {
    pc1.successful();
    if (result) {
      // account deleted
      // signal status, logout, redirect
      toggleAccountRemovedStatus.on();
      setTimeout(() => reloadNuxtApp({ path: "/", persistState: false }), 1012);
    }
  }
};
const toggleVerifyEmailLinkStatusSuccess = useToggleFlag();
const accountSendVerifyEmailLinkConfirmed = async () => {
  let result;
  try {
    pc1.begin();
    result = get(
      await accountSendVerifyEmailLink(),
      "data.accountsSendVerifyEmailLink"
    );
  } catch (error) {
    pc1.setError(error);
  } finally {
    pc1.done();
  }
  if (!pc1.error.value) {
    pc1.successful();
    if (result) {
      // email verification link sent, show alert
      toggleVerifyEmailLinkStatusSuccess.on();
    }
  }
};

const profileComplete = computed(() => isEmpty(profileFieldsIncomplete.value));

const accountUpgradeConfirmed = async () => {
  console.log("--accountUpgradeConfirmed");
  let result;
  try {
    pc1.begin();
    result = get(await accountUpgrade(), "data.accountsUpgradeUserCompany");
  } catch (error) {
    pc1.setError(error);
  } finally {
    pc1.done();
  }
  if (!pc1.error.value) {
    pc1.successful();
    if (result) {
      // account upgraded to .company, alert status, redirect /
      toggleAccountUpgradedStatus.on();
      setTimeout(() => reloadNuxtApp({ path: "/" }), 1890);
    }
  }
};
// googleCalendarEmbedLink
// googleCalendarEditPageLink
// @@eos
</script>
<template>
  <section class="component--CompanyProfileConfig px-1 pb-12">
    <!-- status -->
    <VSnackbarStatusMessage
      v-model="toggleAccountArchivedStatus.isActive.value"
    >
      <p class="text-center">
        <strong> Nalog je uspešno deaktiviran. 🏠</strong>
      </p>
    </VSnackbarStatusMessage>
    <VSnackbarStatusMessage v-model="toggleAccountRemovedStatus.isActive.value">
      <p class="text-center">
        <strong> Nalog je uspešno obrisan. 🏠</strong>
      </p>
    </VSnackbarStatusMessage>
    <VSnackbarStatusMessage
      v-model="toggleVerifyEmailLinkStatusSuccess.isActive.value"
    >
      <p class="text-center">
        <strong
          >Link za potvrdu email adrese je uspešno poslat. Proverite svoj
          inbox.</strong
        >
      </p>
    </VSnackbarStatusMessage>
    <VSnackbarStatusMessage
      v-model="toggleAccountUpgradedStatus.isActive.value"
    >
      <p class="text-center">
        <strong>Vaš nalog je uspešno nadograđen. 🏠</strong>
      </p>
    </VSnackbarStatusMessage>

    <VCardTitle class="text-center text-disabled mt-5">
      <VIcon start icon="$iconWrench" class="opacity-30" />
      <em class="ms-1">Podešavanja aplikacije</em>
    </VCardTitle>

    <!-- verify email -->
    <VCard max-width="812" class="mx-auto mt-12 pa-3" elevation="1">
      <div v-if="!emailVerified">
        <VContainer>
          <VRow>
            <VCol sm="7">
              <VCardTitle class="d-flex items-center gap-3">
                <span> Potvrda email adrese </span>
                <small
                  style="font-size: 0.88rem"
                  class="text-body-2 font-italic !font-sans ms-1 text-disabled translate-y-px"
                >
                  {{ get(auth.user$, "email") }}
                </small>
              </VCardTitle>
              <VCardSubtitle class="ms-2"
                >😬 Još uvek niste potvrdili svoju email adresu.
              </VCardSubtitle>
              <VCardText>
                <p>
                  Potvrdite adresu elektronske pošte da kompletirate svoje
                  profil podatke.
                </p>
              </VCardText>
            </VCol>
            <VCol sm="5" class="d-flex items-center justify-center">
              <VBtn
                @click="accountSendVerifyEmailLinkConfirmed"
                variant="tonal"
                rounded
                size="large"
              >
                <VIcon start icon="$iconCheck" class="opacity-40" />
                <span>Potvrdi email adresu</span>
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>
      </div>
      <div v-else>
        <VCardTitle>
          <VIcon
            size="x-large"
            start
            color="success-darken-2"
            icon="$iconCheckboxOn"
          />
          <span class="ms-1">Email adresa je potvrđena.</span>
        </VCardTitle>
      </div>
    </VCard>

    <!-- profile complete -->
    <VCard
      max-width="812"
      class="mx-auto mt-12 pa-3"
      elevation="1"
      :class="[!auth.isCompany$ ? 'opacity-20' : undefined]"
    >
      <div v-if="!profileComplete">
        <VCardTitle>
          <VIcon size="x-large" start color="error" icon="$warning" />
          <span class="ms-1">Podaci profila nisu svi popunjeni.</span>
        </VCardTitle>
        <VCardText>
          <VCardSubtitle>Dodajte ova polja:</VCardSubtitle>
          <p>
            <VChipGroup :disabled="!auth.isCompany$" column color="error">
              <VChip
                v-for="field in profileFieldsIncomplete"
                :key="field"
                color="error"
                class="bg-error-lighten-1"
                :to="{ name: 'company-profile-id' }"
                >{{ get(fieldsRequired, field) || field }}</VChip
              >
            </VChipGroup>
          </p>
        </VCardText>
      </div>
      <div v-else>
        <VCardTitle>
          <VIcon
            size="x-large"
            start
            color="success-darken-2"
            icon="$iconCheckboxOn"
          />
          <span class="ms-1">Podaci profila su uredno popunjeni.</span>
        </VCardTitle>
      </div>
    </VCard>

    <!-- account upgrade -->
    <VCard
      max-width="812"
      class="mx-auto mt-12 pa-3"
      elevation="1"
      :class="[auth.isCompany$ ? 'opacity-20' : undefined]"
    >
      <VContainer>
        <VRow>
          <VCol sm="7">
            <VCardTitle> Nadogradnja naloga </VCardTitle>
            <VCardText>
              Ako želite da ulistate svoju robu potrebno je da prvo nadogradite
              svoj nalog. Nadogradnja je besplatna, i daje Vam opciju
              upravljanja lagerom. Sva naručena roba ostaje i dalje dostupna za
              pregled na nalogu.
            </VCardText>
          </VCol>
          <VCol sm="5" class="d-flex items-center justify-center">
            <VBtn
              :disabled="auth.isCompany$"
              color="success-darken-2"
              rounded
              variant="tonal"
              size="x-large"
              class="text-none"
            >
              <VIcon start icon="$iconAccountConfigure" size="large" />
              <span class="ms-1">Nadogradnja</span>
              <VMenu
                :transition="DEFAULT_TRANSITION"
                activator="parent"
                location="center"
                max-width="320"
              >
                <VSheet class="pa-5 space-y-5">
                  <VCardSubtitle>Potvrdi nadogradnju naloga</VCardSubtitle>
                  <VCardActions>
                    <VSpacer />
                    <VBtn
                      :disabled="auth.isCompany$"
                      @click="accountUpgradeConfirmed"
                      class="px-5"
                      variant="tonal"
                      size="large"
                      >ok</VBtn
                    >
                    <VSpacer />
                  </VCardActions>
                </VSheet>
              </VMenu>
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </VCard>

    <!-- google.calendar links -->
    <VForm
      :disabled="!auth.isCompany$"
      @submit.prevent="profileSettingsUpdate"
      autocomplete="off"
      class="mt-12"
      :class="!auth.isCompany$ ? 'opacity-40' : undefined"
    >
      <VCard
        max-width="812"
        :class="`mx-auto !p-2 sm:!p-4 mt-2 ${smAndUp ? 'mt-4' : undefined}`"
        position="relative"
      >
        <VCardItem class="mb-5">
          <em class="text-medium-emphasis">Integracija za Google kalendare</em>
          <template #append>
            <VBtn
              :disabled="!auth.isCompany$"
              rounded
              type="submit"
              color="primary"
              variant="tonal"
              size="x-large"
            >
              <VIcon start icon="$iconSave" />
              <strong>Sačuvaj</strong>
            </VBtn>
          </template>
        </VCardItem>

        <VCardText class="space-y-4">
          <VTextField
            name="google_calendar_embed_link"
            v-model="linkEmbed$"
            clearable
            hint="Link deljenog javnog kalendara za integracije sa google.calendar"
            label="google.calendar link za integraciju"
            variant="outlined"
            placeholder="https://calendar.google.com/calendar/embed?..."
          />
          <VTextField
            name="google_calendar_edit_page"
            v-model="linkEditPage$"
            clearable
            hint="Strana za ažuriranje deljenog google kalendara"
            label="google.calendar strana za ažuriranje kalendara"
            variant="outlined"
            placeholder="https://calendar.google.com/calendar/u/0?..."
          />
        </VCardText>
      </VCard>
    </VForm>

    <!-- danger zone -->
    <VCard
      color="error"
      variant="tonal"
      max-width="812"
      border
      class="border-error mx-auto mt-16 border-opacity-100"
    >
      <VList bg-color="transparent" class="divide-red-700 divide-y">
        <VListItem class="pa-3">
          <template #append>
            <VBtn size="large" variant="tonal" color="error" class="px-5">
              <span>Deaktiviraj nalog</span>
              <VMenu
                :transition="DEFAULT_TRANSITION"
                activator="parent"
                location="center"
                max-width="320"
              >
                <VSheet class="pa-5 space-y-5">
                  <VCardSubtitle>Potvrdi deaktivaciju naloga</VCardSubtitle>
                  <VCardActions>
                    <VSpacer />
                    <VBtn
                      @click="accountArchiveConfirmed"
                      class="px-5"
                      variant="tonal"
                      size="large"
                      >ok</VBtn
                    >
                    <VSpacer />
                  </VCardActions>
                </VSheet>
              </VMenu>
            </VBtn>
          </template>
          <VCardTitle>Deaktivacija naloga</VCardTitle>
          <VCardText class="mt-1">
            Nalog će biti arhiviran i neaktivan. Podaci neće biti izbrisani sa
            web servera. U narednom periodu možete ga ponovo aktivirati.
          </VCardText>
        </VListItem>

        <VListItem>
          <template #append>
            <VBtn size="large" variant="tonal" color="error" class="px-5">
              <span>Obriši nalog</span>
              <VMenu
                :transition="DEFAULT_TRANSITION"
                activator="parent"
                location="center"
                width="320"
                :close-on-content-click="false"
              >
                <VSheet class="pa-5 space-y-5">
                  <VCardSubtitle class="d-flex flex-col text-center space-y-2">
                    <span>Šifra za brisanje naloga:</span>
                    <small>{{ pwd }}</small>
                  </VCardSubtitle>
                  <VCardActions class="d-flex flex-col">
                    <VTextField
                      v-model.trim="pwd_input"
                      class="grow w-full"
                      label="Šifra"
                      variant="underlined"
                      clearable
                    />
                    <VBtn
                      @click="accountDeleteConfirmed"
                      :disabled="pwd != pwd_input"
                      class="px-5 align-self-end"
                      variant="tonal"
                      size="large"
                    >
                      <VIcon start icon="$iconTrash" />
                      OK
                    </VBtn>
                  </VCardActions>
                </VSheet>
              </VMenu>
            </VBtn>
          </template>
          <VCardTitle class="text-error">Brisanje naloga</VCardTitle>
          <VCardText>
            Komanda je destruktivna. Jednom kada izbrišete nalog, nema povratka.
            Budite sigurni.
          </VCardText>
        </VListItem>
      </VList>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
