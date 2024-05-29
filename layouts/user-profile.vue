<script setup lang="ts">
import { AppBarMain } from "@/components/app";

// defs
const {
  layout: { appBarHeight, userProfileDrawerWidth },
} = useAppConfig();
const menu = [
  {
    page: "Narudžbenice",
    icon: "$iconChecklist",
    iconSize: 24,
    to: "user-orders",
    text: "Naručena roba",
  },
  {
    page: "Moj profil",
    icon: "$iconUserCircle",
    iconSize: 24,
    to: "user-profile",
    text: "Moj profil",
  },
  {
    page: "Recepti",
    icon: "$iconCheck",
    iconSize: "x-large",
    to: "recepti-uredi",
    text: "Recepti",
    addClass: "!opacity-20",
  },
  {
    type: "spacer",
  },
  {
    page: "Podešavanja",
    icon: "$iconSettings",
    iconSize: "x-large",
    to: "company-profile-config",
    class: "opacity-20",
    text: "Podešavanja",
  },
];

// #eos
</script>
<template>
  <section class="layout--user-profile">
    <AppBarMain :height="appBarHeight" />
    <!-- :width="userProfileDrawerWidth" -->
    <VNavigationDrawer
      color="primary"
      permanent
      location="start"
      class="*bg-red"
    >
      <div class="d-flex flex-col gap-5 pt-5 fill-height pb-3">
        <template v-for="node in menu" :key="node.page">
          <VBtn
            v-if="'spacer' != node.type"
            :active="false"
            :to="{ name: node.to }"
            variant="text"
            color="on-primary"
            :class="[node.class, node.addClass]"
            class="justify-start ms-1 text-none"
          >
            <VIcon start :icon="node.icon" :size="node?.iconSize" />
            <!-- 
                <VTooltip
                :offset="[3, 0]"
                location="end"
                :text="node.page"
                activator="parent"
                open-delay="345"
              /> 
            -->
            <span class="ms-1">{{ node.text }}</span>
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
