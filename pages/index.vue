<script setup lang="ts">
// https://github.com/surmon-china/videojs-player
// import { VideoPlayer } from "@videojs-player/vue";

import { useDisplay } from "vuetify";
import { CardProductDisplay } from "@/components/app";

const cart = useStoreCart();

const { lgAndUp } = useDisplay();

const { products$ } = useQueryProductsAll();

// #eos
</script>

<template>
  <section id="page-demo" class="*pa-2 *pa-md-4">
    <VContainer fluid class="products--list">
      <VRow dense>
        <VCol
          :class="lgAndUp ? 'cols5' : undefined"
          :sm="4"
          :md="3"
          lg="auto"
          v-for="p in products$"
          :key="p.id"
        >
          <CardProductDisplay :product="p" />
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>

<style scoped lang="scss">
.products--list .cols5 {
  width: 20% !important;
  max-width: 20% !important;
  flex-basis: 20% !important;
}
</style>
