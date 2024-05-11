<script setup lang="ts">
import type { IProduct } from "@/types";
import { useDisplay } from "vuetify";
// import { Dump } from "@/components/dev";
import { CardProductDisplay } from "@/components/app";

definePageMeta({
  scrollToTop: false,
});
const { lgAndUp } = useDisplay();
const {
  key: { PRODUCTS_SEARCH },
} = useAppConfig();
const res = useState(PRODUCTS_SEARCH);
const products = computed<IProduct[]>(() => get(res.value, "products") || []);

// @@eos
</script>
<template>
  <section class="page--preraga-proizvoda">
    <div class="ps-5 *bg-red">
      <VCardTitle class="d-flex items-center gap-8 ms-2">
        <VBadge
          color="primary"
          v-if="products?.length"
          :content="products.length"
          class="scale-[122%]"
        />
        <h2 class="text-h5 !font-sans font-italic opacity-75">
          <span v-if="1 < products?.length">
            Proizvoda odgovaraju pretrazi:
          </span>
          <span v-else-if="1 == products?.length">
            Proizvod odgovara pretrazi:
          </span>
          <span v-else>Nisu pronađeni takvi proizvodi.</span>
        </h2>
      </VCardTitle>
      <VDivider class="border-opacity-75" length="88%" />
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
            <CardProductDisplay @product-photos-change="noop" :product="p" />
          </VCol>
        </VRow>
      </VContainer>
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style>
