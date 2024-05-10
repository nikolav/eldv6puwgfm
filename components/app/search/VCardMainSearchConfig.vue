 <script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import type { IProduct } from "@/types";
import districtsSerbia from "~/assets/districts-serbia.json";

// defs
const props = defineProps<{
  close: () => void;
}>();
const {
  key: { PRODUCTS_SEARCH },
  products: { categories, searchSortBy },
} = useAppConfig();

// utils

// form
const { query$, products: productsSearchResult } = useQueryProductsSearch();
const {
  form,
  submit: searchFormSubmit,
  clear: searchFormClear,
} = useFormDataFields(
  "CCPC6684VsHx0IQ0e",
  {
    text: True,
    limit: True,
    district: True,
    category: True,
    priceMax: True,
    sortBy: True,
  },
  {
    onSubmit: (data) => {
      console.log({ "searching:products": data });
      query$.value = data;
    },
  }
);

// global cache
const productsSearchResutlt$ = useState(PRODUCTS_SEARCH, () => ({
  key: 0,
  products: <IProduct[]>[],
}));
onceMountedOn(true, () => {
  watch(productsSearchResult, async (products) => {
    productsSearchResutlt$.value = {
      key: Date.now(),
      products,
    };
    await navigateTo({ name: "pretraga-proizvoda" });
    await nextTick(() => setTimeout(props.close, 122));
  });
});

// @@eos
</script>
<template>
  <VForm
    class="ma-0 pa-0"
    @submit.prevent="searchFormSubmit"
    autocomplete="off"
  >
    <VCard
      border="s-xl"
      rounded="t-lg"
      variant="elevated"
      elevation="10"
      v-bind="$attrs"
      class="bg-image--search-config-01 *pa-3 border-primary border-opacity-100"
    >
      <VCardItem class="ps-5 pt-4">
        <VCardTitle>
          <h4
            class="d-inline-block scale-[91%] ms-1 text-h4 !font-sans opacity-50 font-italic"
          >
            Pretraga proizvoda
          </h4>
        </VCardTitle>
        <template #prepend>
          <VIcon
            class="ms-3 opacity-20 !text-stone-800"
            :size="36"
            icon="$iIconProductSearch"
          />
        </template>
        <template #append>
          <VBtn @click="close" icon variant="text">
            <VIcon icon="$close" size="large" />
          </VBtn>
        </template>
      </VCardItem>
      <!-- @@search:fields -->
      <VCardText>
        <VCol class="pa-4 *bg-green-100 space-y-4">
          <div class="grid grid-cols-[2fr,1fr] gap-5">
            <VTextField
              v-model="form.text.value"
              placeholder="meso, kajmak, dobra, mile, izuva"
              center-affix
              hide-spin-buttons
              clearable
              name="text"
              variant="underlined"
              label="Sadrži text"
            />
            <VTextField
              v-model.number="form.limit.value"
              placeholder="10"
              center-affix
              hide-spin-buttons
              name="limit_max"
              variant="plain"
              label="Najviše"
              prefix="#  "
              suffix="Proizvoda"
              type="number"
            />
          </div>
          <div class="grid grid-cols-[1fr,1fr] gap-5">
            <VSelect
              v-model="form.category.value"
              center-affix
              clearable
              label="Kategorija"
              variant="plain"
              :items="categories"
            />
            <VSelect
              v-model="form.district.value"
              name="district"
              center-affix
              clearable
              label="Okrug"
              variant="plain"
              :items="districtsSerbia"
            >
              <template #item="{ item, props }">
                <VListSubheader
                  v-if="item.raw.subheader"
                  :title="item.raw.title"
                />
                <VListItem v-bind="props" v-else :title="item.raw.title" />
              </template>
            </VSelect>
          </div>
          <div class="grid grid-cols-[1fr,1fr] gap-5 items-end mt-5">
            <VTextField
              v-model.number="form.priceMax.value"
              placeholder="4999"
              center-affix
              hide-spin-buttons
              clearable
              name="price_max"
              variant="outlined"
              label="Cena do"
              prefix="<  "
              suffix="RSD"
              type="number"
            />
            <VSelect
              v-model.number="form.sortBy.value"
              center-affix
              clearable
              name="sort"
              variant="plain"
              label="Poređaj po"
              :items="searchSortBy"
            />
          </div>
        </VCol>
      </VCardText>

      <!-- @@push actions end -->
      <VCardActions class="*mt-2 *pa-5 pb-8 px-10">
        <VBtn
          variant="plain"
          @click="searchFormClear"
          size="x-large"
          class="px-3"
        >
          <VIcon start icon="$iconEraser" />
          <span>Poništi</span>
        </VBtn>
        <VSpacer />
        <VBtn
          type="submit"
          class="px-6"
          size="x-large"
          color="primary"
          variant="elevated"
          rounded
        >
          <VIcon
            class="opacity-60"
            size="large"
            start
            icon="$iconSearchSettings"
          />
          <span style="font-size: 122%" class="translate-x-[2px] d-inline-block"
            >Traži</span
          >
        </VBtn>
      </VCardActions>
    </VCard>
  </VForm>
</template>
<style lang="scss" scoped>
.bg-image--search-config-01 {
  background: white url("~/assets/images/bg-serbia-03.png");
  background-size: cover;
  background-position-x: 8%;
}
</style>
