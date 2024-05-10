 <script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import districtsSerbia from "~/assets/districts-serbia.json";
// defs
const props = defineProps<{
  close: () => void;
}>();
const {
  app: { DEFAULT_TRANSITION },
  products: { categories },
} = useAppConfig();

// utils
// const search$$ = useStoreSearchConfig();
// form
const {
  form,
  submit: searchFormSubmit,
  clear: searchFormClear,
} = useFormDataFields(
  "CCPC6684VsHx0IQ0e",
  {
    text: True,
    district: True,
    category: True,
    priceMax: True,
  },
  {
    onSubmit: (data) => {
      console.log({ data });
    },
  }
);

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
      class="*pa-3 border-primary border-opacity-100"
    >
      <VCardItem class="ps-5">
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
          <VTextField
            v-model="form.text.value"
            center-affix
            hide-spin-buttons
            clearable
            name="text"
            variant="underlined"
            label="Sadrži text"
          />
          <div class="grid grid-cols-[1fr,1fr] gap-5">
            <VSelect
              v-model="form.category.value"
              center-affix
              clearable
              label="Kategorija"
              variant="solo-filled"
              :items="categories"
            />
            <VSelect
              v-model="form.district.value"
              name="district"
              center-affix
              clearable
              label="Okrug"
              variant="solo-filled"
              :items="districtsSerbia"
            />
          </div>
          <div class="grid grid-cols-[1fr,1fr] gap-5 items-end mt-5">
            <VTextField
              v-model.number="form.priceMax.value"
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
              v-model.number="form.priceMax.value"
              center-affix
              clearable
              name="sort"
              variant="underlined"
              label="Poređaj po"
              :items="[
                {
                  title: '🙂 Najjeftinije',
                  value: 0,
                },
                {
                  title: '💰 Najskuplje',
                  value: 1,
                },
                {
                  title: '🌟 Najbolja ocena',
                  value: 2,
                },
                {
                  title: '👍🏻 Pozitivno',
                  value: 3,
                },
                {
                  title: '🔊 Najvise komentara',
                  value: 4,
                },
              ]"
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
        <VBtn class="px-6" size="x-large" color="primary" variant="elevated">
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
</style>
