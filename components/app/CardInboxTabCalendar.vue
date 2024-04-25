<script setup lang="ts">
import type { ICompanyProfile } from "@/types";
import { GoogleCalendarIframe } from "@/components/app";
const {
  docs: { TAG_COMPANY_PROFILE_prefix },
} = useAppConfig();
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const { data } = useDoc<ICompanyProfile>(
  `${TAG_COMPANY_PROFILE_prefix}${uid.value}`
);
const linkGoogleCalendarEmbed$ = computed(
  () => get(data.value, "data.googleCalendarEmbedLink") || ""
);
const linkGoogleCalendarEditPage$ = computed(
  () => get(data.value, "data.googleCalendarEditPageLink") || ""
);

const goToUrediGoogleCalendar = async () =>
  await navigateTo(linkGoogleCalendarEditPage$.value, {
    external: true,
    open: { target: "_blank" },
  });
// @@eos
</script>
<template>
  <section class="component--CardInboxTabCalendar *bg-primary2 py-2">
    <VCard
      elevation="2"
      class="w-fit *h-fit mx-auto overflow-hidden"
      rounded="md"
    >
      <VToolbar flat density="compact" color="transparent" class="pt-1">
        <VToolbarTitle class="text-medium-emphasis d-flex items-center *bg-red">
          <VIcon
            class="opacity-40 -translate-y-[2px]"
            size="small"
            start
            icon="$iconAntena"
          />
          <em class="ps-2 *text-base">Najave, događaji, dnevni raspored</em>
        </VToolbarTitle>
        <VBtn
          @click="goToUrediGoogleCalendar"
          color="primary"
          icon
          variant="text"
        >
          <VTooltip
            activator="parent"
            open-delay="345"
            location="bottom"
            text="Ažuriraj kalendar..." />
          <VIcon icon="$edit"
        /></VBtn>
      </VToolbar>
      <div class="mt-2 px-2">
        <GoogleCalendarIframe :src="linkGoogleCalendarEmbed$" />
      </div>
    </VCard>
  </section>
</template>
<style lang="scss" scoped>
</style>
