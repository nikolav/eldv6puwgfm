<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
// });

import { SpinnerAppProcessing } from "@/components/ui";
import { Cart } from "@/components/app";
import type { IAuthProfile } from "@/types";
import { PROFILE, AVATAR } from "@/src";

const {
  $theme: { theme },
} = useNuxtApp();

const {
  theme: { DARK, LIGHT },
  io: { IOEVENT_PRODUCTS_CHANGE },
  key: { PRODUCTS_CHANGE, ORDER_SEND_STATUS },
  app: { DEFAULT_TRANSITION },
} = useAppConfig();

const htmlAttrs = computed(() => ({
  class: DARK === theme.value ? "dark" : LIGHT,
}));
useHead({
  titleTemplate: (ttl) => (ttl ? `${ttl} | kantar.rs` : "kantar.rs"),
  htmlAttrs,
});

const auth = useStoreApiAuth();
const route = useRoute();
const { destroy: appMenuCacheDestroy } = useAppMenu();
// ensure defaultauth .readonly
onceOn(
  () => auth.initialized$ && !auth.isAuth$,
  () => {
    nextTick(() => {
      if (!auth.token$) auth.tokenPutDefault();
    });
  }
);
// auth update
watch(
  [() => auth.isAuth$, () => auth.isDefault$],
  async ([isAuth, isDefault]) => {
    if (!isDefault) {
      if (!isAuth) {
        appMenuCacheDestroy();
        return reloadNuxtApp({
          path: "/",
          persistState: false,
        });
      }

      if (["auth-register", "auth-login"].includes(String(route.name)))
        return await navigateTo({ name: "index" });

      // break
      return;
    }
    //
    // here default user, auth status change
  }
);

// # provides:profile
const { authProfile } = useTopics();
const { data } = useDoc<IAuthProfile>(() => authProfile(get(auth.user$, "id")));
const profile = computed(() => get(data.value, "data"));
// # provides:avatar
const { publicUrl } = useApiStorage();
const avatarUrl = computed(() =>
  publicUrl(get(profile.value, "avatar.data.file_id"))
);
provide(PROFILE, profile);
provide(AVATAR, avatarUrl);

const gProductsChange$ = useGlobalVariable(PRODUCTS_CHANGE);
useIOEvent(IOEVENT_PRODUCTS_CHANGE, () => {
  gProductsChange$.value = Date.now();
});

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
  transition: all 0.55s;
}

.BLUR-enter-from,
.BLUR-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}

.BLUR-leave-active {
  position: absolute;
  z-index: -1;
  width: 100%;
}

.ChatItem-enter-active,
.ChatItem-leave-active {
  transition: all 0.5s ease-out;
}
.ChatItem-enter-from,
.ChatItem-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.Panel1-enter-active,
.Panel1-leave-active {
  transition: all 0.18s ease-out;
}

.Panel1-enter-from,
.Panel1-leave-to {
  opacity: 0;
  scale: 1.022;
  filter: blur(0.33rem);
}
.Panel1-leave-active {
  position: absolute !important;
  width: 100%;
}
</style>
