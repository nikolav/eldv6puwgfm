<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import districtsSerbia from "~/assets/districts-serbia.json";
import { useDisplay } from "vuetify";
import type { IProduct } from "@/types";

// defs
const props = defineProps<{
  close: () => void;
}>();
const {
  key: { PRODUCTS_SEARCH },
  products: { categories, searchSortBy },
} = useAppConfig();

const { width, smAndUp } = useDisplay();

// utils
const { categoriesTopInclusive } = useStoreMenuCategoriesFull();

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
      // console.log({ data });
      // transform .category field to mapped categories from subtree
      const q = transform(
        data,
        (data, value, field: string) => {
          data[field] =
            "category" !== field
              ? value
              : value
              ? categoriesTopInclusive(afterLastColon(value))
              : undefined;
          return data;
        },
        <Record<string, any>>{}
      );
      // console.log({ "searching:products": q });
      query$.value = q;
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
      class="bg-image--search-config-01 *pa-3 border-primary border-opacity-100"
      v-bind="$attrs"
    >
      <VCardItem class="ps-5 pt-4">
        <VCardTitle>
          <h4
            class="d-inline-block scale-[91%] ms-1 !font-sans opacity-50 font-italic"
            :class="482 < width ? 'text-h4' : undefined"
          >
            {{ 322 < width ? "Pretraga proizvoda" : "Pretraga" }}
          </h4>
        </VCardTitle>
        <template #prepend>
          <VIcon
            v-if="472 < width"
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
          <div
            :class="
              482 < width ? 'grid grid-cols-[2fr,1fr] gap-5' : 'd-flex flex-col'
            "
          >
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
          <div
            :class="
              482 < width ? 'grid grid-cols-[2fr,1fr] gap-5' : 'd-flex flex-col'
            "
          >
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
          <div
            :class="
              482 < width
                ? 'mt-5 items-end grid grid-cols-[2fr,1fr] gap-5'
                : 'd-flex flex-col'
            "
          >
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
      <VCardActions
        class="*mt-2 *pa-5 pb-8"
        :class="smAndUp ? 'px-10' : 'px-5'"
      >
        <VBtn
          variant="plain"
          @click="searchFormClear"
          :size="444 < width ? 'x-large' : undefined"
          class="px-3"
        >
          <VIcon v-if="382 < width" start icon="$iconEraser" />
          <span>Poništi</span>
        </VBtn>
        <VSpacer />
        <VBtn
          type="submit"
          class="px-6"
          :size="444 < width ? 'x-large' : undefined"
          color="primary"
          variant="elevated"
          rounded
        >
          <VIcon
            v-if="382 < width"
            class="opacity-60"
            size="large"
            icon="$iconSearchSettings"
            start
          />
          <span
            style="font-size: 122%"
            class="d-inline-block"
            :class="382 < width ? 'translate-x-[2px]' : undefined"
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
