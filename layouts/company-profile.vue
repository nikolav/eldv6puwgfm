<script setup lang="ts">
import { AppBarMain } from "@/components/app";
import { useDisplay } from "vuetify";

const { smAndUp } = useDisplay();

const { appBarHeight } = useAppConfig().layout;
const companyProfileDrawerWidth = 52;

const sidebarLinksCompanyProfile = [
  {
    icon: "$iconHome",
    tooltip: "Pregled",
    to: "company-profile",
    title: "profil",
    size: 34,
  },
  {
    icon: "$iconChatBubbles",
    tooltip: "Inbox",
    to: "company-profile-inbox",
    title: "inbox",
    size: 26,
  },
  {
    icon: "$iconIdCardCompany",
    tooltip: "Lična karta",
    to: "company-profile-id",
    title: "profil-id",
    size: "large",
  },
  {
    icon: "$iconBox",
    tooltip: "Ponuda/Asortiman",
    to: "company-profile-goods",
    title: "asortiman",
    size: undefined,
  },
  {
    icon: "$iconCheck",
    tooltip: "Profil",
    to: "company-profile",
    title: "UWURkgUfz5K4wzCprofil",
    size: "large",
  },
  {
    icon: "$iconCheck",
    tooltip: "Profil",
    to: "company-profile",
    title: "fdQMUfwvV1zvbCOCjj42profil",
    size: "large",
  },
  {
    icon: "$iconSettings",
    tooltip: "Podešavanja",
    to: "company-profile-config",
    title: "So6pM8ilgo2AT",
    class: "mt-auto !opacity-20",
  },
];

// #eos
</script>
<template>
  <section class="layout--company-profile *bg-red fill-height">
    <AppBarMain :height="appBarHeight" />
    <VNavigationDrawer
      color="primary-darken-1"
      permanent
      location="start"
      :width="companyProfileDrawerWidth"
    >
      <div
        class="d-flex flex-col gap-y-2 sm:gap-y-4 text-center items-center h-[88vh] *bg-red"
        :class="smAndUp ? 'mt-4' : undefined"
      >
        <template
          v-for="(node, i) in sidebarLinksCompanyProfile"
          :key="node.title"
        >
          <VBtn
            :class="
              isLastIndex(sidebarLinksCompanyProfile, i)
                ? smAndUp
                  ? node.class
                  : undefined
                : undefined
            "
            color="on-primary"
            variant="plain"
            :to="{ name: node.to }"
            icon
          >
            <VIcon :icon="node.icon" :size="node.size" />
            <VTooltip
              :offset="3"
              activator="parent"
              location="end"
              :text="node.tooltip"
              open-delay="345"
            />
          </VBtn>
        </template>
      </div>
    </VNavigationDrawer>
    <VMain class="*bg-red fill-height">
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped>
</style>
