<script setup lang="ts">
import { AppBarMain } from "@/components/app";

// defs
const {
  layout: { appBarHeight, userProfileDrawerWidth },
} = useAppConfig();
const menu = [
  {
    page: "Moj profil",
    icon: "$iconUserCircle",
    iconSize: 35,
    to: "user-profile",
  },
  {
    page: "Narudžbenice",
    icon: "$iconChecklist",
    iconSize: "large",
    to: "user-orders",
  },
  {
    page: "Recepti",
    icon: "$iconCheck",
    iconSize: "x-large",
    to: "recepti-uredi",
  },
  {
    type: "spacer",
  },
  {
    page: "Podešavanja",
    icon: "$iconSettings",
    iconSize: "x-large",
    to: "company-profile-config",
    class: "opacity-20"
  },
];

// #eos
</script>
<template>
  <section class="layout--user-profile">
    <AppBarMain :height="appBarHeight" />
    <VNavigationDrawer
      color="primary"
      permanent
      location="start"
      :width="userProfileDrawerWidth"
      class="*bg-red"
    >
      <div class="d-flex flex-col items-center gap-5 pt-5 fill-height pb-3">
        <template v-for="node in menu" :key="node.page">
          <VBtn
            v-if="'spacer' != node.type"
            :active="false"
            :to="{ name: node.to }"
            icon
            variant="text"
            color="on-primary"
            :class="node.class"
          >
            <VIcon :icon="node.icon" :size="node?.iconSize" />
            <VTooltip
              :offset="[3, 0]"
              location="end"
              :text="node.page"
              activator="parent"
              open-delay="345"
            />
          </VBtn>
          <VSpacer v-else />
        </template>
      </div>
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped></style>
