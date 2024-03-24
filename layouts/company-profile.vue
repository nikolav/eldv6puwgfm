<script setup lang="ts">
import { AppBarMain } from "@/components/app";
const { appBarHeight } = useAppConfig().layout;
const companyProfileDrawerWidth = 52;

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
      <VList class="mt-n2 text-center">
        <template v-for="n in 10" :key="n">
          <VListItem link>{{ n }}</VListItem>
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
