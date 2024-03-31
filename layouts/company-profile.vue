<script setup lang="ts">
import { AppBarMain } from "@/components/app";

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
    icon: "$iconCheck",
    tooltip: "Profil",
    to: "company-profile",
    title: "DzXnNXzKBLgbrprofil",
    size: "large",
  },
];

// #eos
</script>
<template>
  <section class="layout--company">
    <AppBarMain :height="appBarHeight" />
    <VNavigationDrawer
      color="primary-darken-1"
      permanent
      location="start"
      :width="companyProfileDrawerWidth"
    >
      <div
        class="d-flex flex-col mt-4 gap-y-2 sm:gap-y-4 text-center items-center"
      >
        <template v-for="node in sidebarLinksCompanyProfile" :key="node.title">
          <VBtn
            color="on-primary-darken-1"
            variant="plain"
            :to="{ name: node.to }"
            icon
          >
            <VIcon :icon="node.icon" :size="node.size" />
            <VTooltip
              :offset="3"
              activator="parent"
              location="end center"
              :text="node.tooltip"
              open-delay="345"
            />
          </VBtn>
        </template>
      </div>
      <!-- <VList class="mt-n2 text-center" variant="plain">
        <template v-for="node in sidebarLinksCompanyProfile" :key="node.title">
          <VListItem :to="{ name: node.to }" class="px-0 py-3 py-sm-4">
            <VIcon :icon="node.icon" :size="node.size" />
            <VTooltip
              :offset="2"
              activator="parent"
              location="end center"
              :text="node.tooltip"
              open-delay="345"
            />
          </VListItem>
        </template>
      </VList> -->
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped>
</style>
