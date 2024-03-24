<script setup lang="ts">
import { AppBarMain } from "@/components/app";

definePageMeta({
  middleware: "authorized-company",
});

const { appBarHeight } = useAppConfig().layout;
const companyProfileDrawerWidth = 52;

const sidebarLinksCompanyProfile = [
  {
    icon: "$iconIdCardCompany",
    tooltip: "Profil",
    to: "company-profile",
    title: "profil",
  },
  {
    icon: "$iconCheck",
    tooltip: "Profil",
    to: "company-profile",
    title: "iRmgkW0YEZkeiaNprofil",
  },
  {
    icon: "$iconCheck",
    tooltip: "Profil",
    to: "company-profile",
    title: "UWURkgUfz5K4wzCprofil",
  },
  {
    icon: "$iconCheck",
    tooltip: "Profil",
    to: "company-profile",
    title: "fdQMUfwvV1zvbCOCjj42profil",
  },
  {
    icon: "$iconCheck",
    tooltip: "Profil",
    to: "company-profile",
    title: "DzXnNXzKBLgbrprofil",
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
      <VList class="mt-n2 text-center" variant="plain">
        <template v-for="node in sidebarLinksCompanyProfile" :key="node.title">
          <VListItem :to="{ name: node.to }" class="px-0 py-3 py-sm-4">
            <VIcon :icon="node.icon" size="large" />
            <VTooltip
            :offset="2"
              activator="parent"
              location="end center"
              :text="node.tooltip"
              open-delay="345"
            />
          </VListItem>
        </template>
      </VList>
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped>
</style>
