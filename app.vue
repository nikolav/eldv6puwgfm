<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
//
// });
import { SpinnerAppProcessing } from "@/components/ui";

const appMounted$ = useAppMounted();
onUnmounted(() => {
  appMounted$.value = false;
});

// theme
// import { type IThemeToggle } from "@/types";
const { theme } = useNuxtApp().$theme;

const { DARK, LIGHT } = useAppConfig().theme;
const htmlAttrs = computed(() => ({
  class: DARK === theme.value ? "dark" : LIGHT,
}));
useHead({
  titleTemplate: (ttl) => (!ttl ? ".NuxtApp" : `[${ttl}] | NuxtApp`),
  htmlAttrs,
});

// eos
</script>

<template>
  <VApp :theme="theme" id="app-main">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtLoadingIndicator color="red" />
    <SpinnerAppProcessing />
  </VApp>
</template>

<style>
.BLUR-enter-active,
.BLUR-leave-active {
  transition: all 0.33s;
}

.BLUR-leave-active {
  position: absolute;
  z-index: -1;
  width: 100%;
}

.BLUR-enter-from,
.BLUR-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
</style>
