<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
//
// });
import { SpinnerAppProcessing } from "@/components/ui";
import { Cart } from "@/components/app";

// theme
// import { type IThemeToggle } from "@/types";
const {
  $theme: { theme },
} = useNuxtApp();

const {
  theme: { DARK, LIGHT },
  io: { IOEVENT_PRODUCTS_CHANGE },
  key: { PRODUCTS_CHANGE, ORDER_SEND_STATUS },
} = useAppConfig();
const htmlAttrs = computed(() => ({
  class: DARK === theme.value ? "dark" : LIGHT,
}));
useHead({
  titleTemplate: (ttl) => (!ttl ? "kantar.rs" : `${ttl} | kantar.rs`),
  htmlAttrs,
});

const auth = useStoreApiAuth();
const { destroy: appMenuCacheDestroy } = useAppMenu();

const route = useRoute();
const isViewRoute = computed(() =>
  some(
    [reMatchViewUser, reMatchViewProduct],
    (re) => null != route.fullPath.match(re)
  )
);

watchEffect(async () => {
  console.log({ path: route.fullPath });
  if (isViewRoute.value) return;
  if (auth.isDefault$) await auth.logout();
});
watch(
  () => auth.isAuth$,
  async (isAuth) => {
    // @logout:hard-reload
    if (!isAuth) {
      console.log(`/app.vue: !isAuth`);
      appMenuCacheDestroy();
      return reloadNuxtApp({
        path: "/",
        persistState: false,
      });
    }

    // @auth:debug
    console.log({ user: auth.user$ });

    if (isViewRoute.value) return;

    // logout user:default from app:main
    if (auth.isDefault$) {
      // @@todo
      auth.tokenPut("");
      return await auth.logout();
    }

    // regular login; goto `index`
    await navigateTo({ name: "index" });
  }
);

const main$$ = useStoreMain();
useIOEvent(IOEVENT_PRODUCTS_CHANGE, () => {
  main$$.put({ [PRODUCTS_CHANGE]: Date.now() });
});

const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();

const cart = useStoreCart();

const flagOrderSendStatus$ = useGlobalFlag(ORDER_SEND_STATUS);

// @@eos
</script>

<template>
  <VApp :theme="theme" id="app-main">
    <!-- @signal:order-sent -->
    <VSnackbar
      v-model="flagOrderSendStatus$"
      color="transparent"
      variant="text"
    >
      <VAlert type="success" prominent elevation="4">
        <div class="d-flex justify-between items-center gap-4 sm:gap-8">
          <p>Narudžba je uspešno poslata.</p>
          <VBtn
            @click="flagOrderSendStatus$ = false"
            color="on-success"
            variant="tonal"
            >ok</VBtn
          >
        </div>
      </VAlert>
    </VSnackbar>

    <!-- @screen:cart -->
    <VDialog
      :model-value="cart.isOpen"
      persistent
      no-click-animation
      :transition="DEFAULT_TRANSITION"
      fullscreen
    >
      <Cart />
    </VDialog>

    <!-- @pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- @ui:status -->
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

.ChatItem-enter-active,
.ChatItem-leave-active {
  transition: all 0.5s ease-out;
}
.ChatItem-enter-from,
.ChatItem-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
