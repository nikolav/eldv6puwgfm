<script setup lang="ts">
import { AppBarMain } from "@/components/app";
import { useDisplay } from "vuetify";

const { smAndUp } = useDisplay();

const { appBarHeight } = useAppConfig().layout;
const companyProfileDrawerWidth = 52;

const sidebarLinksCompanyProfile = [
  {
    // icon: "$iconHome",
    // tooltip: "Pregled",
    icon: "$iconFactory",
    tooltip: "Primljene narudžbe",
    to: "company-profile",
    title: "profil",
    size: "large",
    text: "Primljene narudžbe",
  },
  {
    icon: "$iconChatBubbles",
    tooltip: "Inbox",
    to: "company-profile-inbox",
    title: "inbox",
    size: 22,
    text: "Sanduče",
  },
  {
    icon: "$iconChecklist",
    tooltip: "Moje narudžbenice",
    // to: "user-orders",
    to: "user-orders-com",
    title: "narudzbenice",
    size: 22,
    text: "Naručena roba",
  },
  {
    icon: "$iconIdCardCompany",
    tooltip: "Lična karta",
    to: "company-profile-id",
    title: "profil-id",
    size: 24,
    text: "Podaci o gazdinstvu",
  },

  {
    icon: "$iconBox",
    tooltip: "Ponuda/Asortiman",
    to: "company-profile-goods",
    title: "asortiman",
    size: 22,
    text: "Asortiman",
  },
  {
    icon: "$iconCheck",
    tooltip: "Recepti",
    to: "recepti-uredi",
    title: "recepti-uredi",
    text: "Recepti",
    addClass: "!opacity-20",
  },
  {
    icon: "$iconSettings",
    tooltip: "Podešavanja",
    to: "company-profile-config",
    title: "So6pM8ilgo2AT",
    class: "mt-auto !opacity-20",
    text: "Podešavanja",
  },
];

const { profileFieldsIncomplete } = useQueryManageAccount();
const profileComplete = computed(() => isEmpty(profileFieldsIncomplete.value));

// #eos
</script>
<template>
  <section class="layout--company-profile *bg-red fill-height">
    <AppBarMain :height="appBarHeight" />
    <!-- :width="companyProfileDrawerWidth" -->
    <VNavigationDrawer
      color="primary-darken-1"
      permanent
      location="start"
      rounded="0"
      elevation="1"
    >
      <div
        class="d-flex flex-col gap-y-2 sm:gap-y-6 h-[90vh]"
        :class="smAndUp ? 'mt-4' : undefined"
      >
        <template
          v-for="(node, i) in sidebarLinksCompanyProfile"
          :key="node.title"
        >
          <VBtn
            :class="[
              isLastIndex(sidebarLinksCompanyProfile, i)
                ? smAndUp
                  ? node.class
                  : undefined
                : undefined,
              node.addClass,
            ]"
            :color="
              'profil-id' == node.title && !profileComplete
                ? 'error-lighten-2'
                : 'on-primary'
            "
            variant="plain"
            :to="{ name: node.to }"
            class="text-none justify-start ms-1"
          >
            <VIcon start :icon="node.icon" :size="node.size" />
            <span class="ms-3">{{ node.text }}</span>
            <VBadge
              v-if="'profil-id' == node.title && !profileComplete"
              inline
              :content="profileFieldsIncomplete.length || ''"
              color="error"
              class="ms-1"
            />
            <VTooltip
              v-if="'profil-id' == node.title && !profileComplete"
              :offset="3"
              activator="parent"
              location="end"
              text="Dopunite svoj profil"
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
<style lang="scss" scoped></style>
