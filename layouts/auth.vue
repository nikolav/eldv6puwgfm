<script setup lang="ts">
import { useDisplay } from "vuetify";
import { ServiceDescriptionAuth } from "@/components/app";

const { width } = useDisplay();

const { routeNameByTitle, cache } = useAppMenu();

// #eos
</script>
<template>
  <section class="layout-auth *bg-red min-h-full bg-logo-kantar-01">
    <VToolbar
      flat
      color="rgba(255,255,255,.55)"
      class="backdrop-blur-sm"
      elevation="2"
    >
      <VBtn icon :to="{ name: routeNameByTitle(cache.get()) }"
        ><VIcon icon="$prev" size="x-large" />
        <VTooltip
          activator="parent"
          location="bottom"
          text="Nazad"
          open-delay="345"
        />
      </VBtn>
      <VSpacer />
      <NuxtLink :to="{ name: 'index' }">
        <VIcon
          :size="152"
          color="primary-lighten-1"
          icon="$iconLogoKantarH"
          class="hover:scale-105 transition-transform"
          :class="[322 < width ? undefined : 'scale-75 -translate-x-5']"
        />
      </NuxtLink>
      <VSpacer />
      <VBtn icon :to="{ name: routeNameByTitle(cache.get()) }"
        ><VIcon
          icon="$close"
          size="large"
          :class="322 < width ? undefined : '-translate-x-3'"
        />
      </VBtn>
    </VToolbar>

    <VMain>
      <VContainer
        class="*bg-red mt-2 mt-sm-8 *!px-0"
        :class="422 < width ? undefined : '!px-1'"
      >
        <slot />
      </VContainer>
    </VMain>
  </section>
</template>
<style lang="scss" scoped>
.bg-logo-kantar-01 {
  // background-image: url("~/assets/images/bg-auth-01.png");
  background-image: url("~/assets/images/shop-farmer-smart-03.png");
  background-position-y: 92%;
  background-size: cover;
}
</style>
