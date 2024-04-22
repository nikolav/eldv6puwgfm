<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { ICompanyProfile } from "@/types";
definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});
const { smAndUp } = useDisplay();
const {
  key: { APP_PROCESSING },
  docs: { TAG_COMPANY_PROFILE_prefix },
} = useAppConfig();
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const {
  data: profileData,
  put: profileSave,
  loading,
} = useDoc<ICompanyProfile>(`${TAG_COMPANY_PROFILE_prefix}${uid.value}`);
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

const appProcessing$ = useGlobalFlag(APP_PROCESSING);
// googleCalendarEmbedLink
// googleCalendarEditPageLink
watchEffect(() => {
  appProcessing$.value = loading.value;
});
// @@eos
</script>
<template>
  <section class="component--CompanyProfileConfig px-1">
    <VForm @submit.prevent="profileSettingsUpdate" autocomplete="off">
      <VCard
        max-width="812"
        :class="`mx-auto !p-2 sm:!p-4 mt-2 ${smAndUp ? 'mt-4' : undefined}`"
        position="relative"
      >
        <VCardItem class="mb-2">
          <em class="text-medium-emphasis">Razna podešavanja aplikacije</em>
          <template #append>
            <VBtn type="submit" color="primary" variant="text" size="x-large">
              <VIcon start icon="$iconSave" />
              <strong>Sačuvaj</strong>
            </VBtn>
          </template>
        </VCardItem>

        <VCardText class="space-y-4">
          <VTextField
            name="google_calendar_embed_link"
            v-model.trim="linkEmbed$"
            clearable
            hint="Link deljenog javnog kalendara za intgracije sa google.calendar"
            label="google.calendar link za integraciju"
            variant="outlined"
            placeholder="https://calendar.google.com/calendar/embed?..."
          />
          <VTextField
            name="google_calendar_edit_page"
            v-model.trim="linkEditPage$"
            clearable
            hint="Strana za ažuriranje deljenog google kalendara"
            label="google.calendar strana za ažuriranje kalendara"
            variant="outlined"
            placeholder="https://calendar.google.com/calendar/u/0?..."
          />
        </VCardText>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped>
</style>
