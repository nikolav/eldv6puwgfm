<script setup lang="ts">
import { GoogleCalendarIframe } from "@/components/app";
const {
  links: {
    external: { SRC_GOOGLE_CALENDAR_IFRAME, GOOGLE_CALENDAR_EDIT_PAGE },
  },
} = useAppConfig();
const goToUrediGoogleCalendar = async () =>
  await navigateTo(GOOGLE_CALENDAR_EDIT_PAGE, {
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
        <GoogleCalendarIframe :src="SRC_GOOGLE_CALENDAR_IFRAME" />
      </div>
    </VCard>
  </section>
</template>
<style lang="scss" scoped>
</style>
