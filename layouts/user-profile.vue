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
    iconSize: "x-large",
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
      <div class="d-flex flex-col items-center gap-5 pt-5">
        <template v-for="node in menu" :key="node.page">
          <VBtn :to="{ name: node.to }" icon variant="text" color="on-primary">
            <VIcon :icon="node.icon" :size="node?.iconSize" />
            <VTooltip
              :offset="[3, 0]"
              location="end"
              :text="node.page"
              activator="parent"
              open-delay="345"
            />
          </VBtn>
        </template>
      </div>
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped></style>
