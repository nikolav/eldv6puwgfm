<script setup lang="ts">
// import { Dump } from "@/components/dev";
import { useDisplay } from "vuetify";
import { useAppMenu } from "@/composables/app";
import { CardProductDisplay } from "@/components/app";

// utils
const { current$, productCategoryByPageTitle } = useAppMenu();
const { lgAndUp } = useDisplay();

// sotres
const { products, reload } = useQueryProductsByCategory(() =>
  productCategoryByPageTitle(current$.value)
);

// #eos
</script>
<template>
  <section class="comoponent--ProductsListByCategory">
    <VContainer fluid class="products--list">
      <VRow dense>
        <VCol
          :class="lgAndUp ? 'cols5' : undefined"
          :sm="4"
          :md="3"
          lg="auto"
          v-for="p in products"
          :key="p.id"
        >
          <CardProductDisplay @product-photos-change="reload" :product="p" />
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>
<style lang="scss" scoped>
</style>
