<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
// });

import { SpinnerAppProcessing } from "@/components/ui";
import { Cart, TopicChatSidebarMain } from "@/components/app";
import { PROFILE, AVATAR } from "@/src";

// defs
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

// flags
const flagOrderSendStatus$ = useGlobalFlag(ORDER_SEND_STATUS);

// utils
const route = useRoute();
const auth = useStoreApiAuth();
const cart = useStoreCart();
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

      // # redirect to index if auth updated at login pages
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
const { profile } = useUserData(() => get(auth.user$, "id"));
const avatarUrl = computed(() =>
  resourceUrl(get(profile.value, "avatar.data.file_id"))
);
provide(PROFILE, profile);
provide(AVATAR, avatarUrl);

watchEffect(() => {
  console.log({ profile: profile.value })
})

const gProductsChange$ = useGlobalVariable(PRODUCTS_CHANGE);
useIOEvent(IOEVENT_PRODUCTS_CHANGE, () => {
  gProductsChange$.value = Date.now();
});

// @@eos
</script>

<template>
  <VApp :theme="theme" id="app-main">
    <!-- @@chat:main -->
    <TopicChatSidebarMain />

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
    <!-- default dialog z-index [1004] -->
    <!--  hides h-scrollbar @cat:open -->
    <Html :style="cart.isOpen ? 'overflow: hidden !important' : undefined" />
    <VDialog
      :model-value="cart.isOpen"
      persistent
      no-click-animation
      :transition="DEFAULT_TRANSITION"
      fullscreen
      class="bg--cart-vector-01 cart--vdialog !z-[1234]"
      scrollable
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

/* name:Panel2 */
.Panel2-enter-active,
.Panel2-leave-active {
  transition: all 0.18s ease-out;
}

.Panel2-enter-from,
.Panel2-leave-to {
  opacity: 0;
  /* scale: 1.022; */
  filter: blur(0.33rem);
}
.Panel2-leave-active {
  position: absolute !important;
  width: 100%;
}

.products--list .cols5 {
  width: 20% !important;
  max-width: 20% !important;
  flex-basis: 20% !important;
}
</style>
