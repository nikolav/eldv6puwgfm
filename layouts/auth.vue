<script setup lang="ts">
import { ServiceDescriptionAuth } from "@/components/app";

const { routeNameByTitle, cache } = useAppMenu();
const route_ = useRoute();

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
          size="122"
          color="primary-lighten-1"
          icon="$iconLogoKantarH"
          class="hover:scale-105 transition-transform"
        />
      </NuxtLink>
      <VSpacer />
      <VBtn icon :to="{ name: routeNameByTitle(cache.get()) }"
        ><VIcon icon="$close" size="large" />
      </VBtn>
    </VToolbar>

    <VContainer class="*bg-red mt-md-12">
      <VRow justify="center">
        <VCol md="5" class="*bg-blue-200">
          <slot>
            <p>lorem</p>
          </slot>
        </VCol>
        <VCol md="7" class="*bg-red-200">
          <ServiceDescriptionAuth />
        </VCol>
      </VRow>
    </VContainer>
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
