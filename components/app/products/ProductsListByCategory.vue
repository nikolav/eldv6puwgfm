<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useAppMenu } from "@/composables/app";
import { CardProductDisplay } from "@/components/app";


// get page query param, default to current$
//  figure out subtree nodes,
//   send categories from node subtree, node inclusive


const route = useRoute();
const { lgAndUp } = useDisplay();

// utils
const { current$, menuTopCategoryByPageTitle } = useAppMenu();
const { nodeByValue, nodeMain } = useStoreMenuCategoriesFull();

// get search term
//  query.q || cache@current-page-title
const c$ = computed(
  () =>
    String(route.query?.q || "") || menuTopCategoryByPageTitle(current$.value)
);
const {
  products: { PRODUCT_CATEGORY_prefix },
} = useAppConfig();

// calc prefixed categoris from subtree
//   ['@product:category:A'...]
const qcategories = computed(() => {
  if (!c$.value) return;
  let node =
    nodeMain.ls().find((node) => c$.value === node.value()?.category) ||
    nodeByValue(c$.value);

  if (node)
    return node.lsa([node]).map((node) => {
      const val = node.value();
      return `${PRODUCT_CATEGORY_prefix}${val.category || val.value}`;
    });
});

// stores
const { products, reload } = useQueryProductsByCategory(qcategories);

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
<style lang="scss" scoped></style>
