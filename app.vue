<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
//
// });
import { SpinnerAppProcessing } from "@/components/ui";

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

const auth = useStoreApiAuth();
const { destroy: appMenuCacheDestroy } = useAppMenu();

onMounted(() => {
  watch(
    () => auth.isAuth$,
    async (isAuth) => {
      if (!isAuth) {
        // @logout
        console.log(`@app-vue: !isAuth`);
        appMenuCacheDestroy();
        return reloadNuxtApp({
          path: "/",
          persistState: false,
        });
      }
      // @login
      console.log(`@app-vue: isAuth`);
      console.log({ user: auth.user$ });
      await navigateTo({ name: "index" });
    }
  );
});

// eos
</script>

<template>
  <VApp :theme="theme" id="app-main">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtLoadingIndicator color="red" />
    <SpinnerAppProcessing :opacity="0.99" size="1.55rem" />
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
