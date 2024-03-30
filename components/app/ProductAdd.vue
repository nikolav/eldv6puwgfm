<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { OrNoValue } from "@/types";

const props_ = defineProps<{ close: () => void }>();

const { smAndUp } = useDisplay();

const key_PRODUCT_ADD = "4r1Jt6kcp0";
const $$main = useStoreMain();
const productName$ = computed({
  get: () => $$main.get(`${key_PRODUCT_ADD}:name`),
  set: (val: string) => $$main.put({ [`${key_PRODUCT_ADD}:name`]: val }),
});
const productPrice$ = computed({
  get: () => $$main.get(`${key_PRODUCT_ADD}:price`),
  set: (val: OrNoValue<number>) =>
    $$main.put({ [`${key_PRODUCT_ADD}:price`]: val }),
});
const productCategory$ = computed({
  get: () => $$main.get(`${key_PRODUCT_ADD}:category`),
  set: (val: OrNoValue<string>) =>
    $$main.put({ [`${key_PRODUCT_ADD}:category`]: val }),
});
const productStock$ = computed({
  get: () => $$main.get(`${key_PRODUCT_ADD}:stock`),
  set: (val: OrNoValue<number>) =>
    $$main.put({ [`${key_PRODUCT_ADD}:stock`]: val }),
});
const productStockType$ = computed({
  get: () => $$main.get(`${key_PRODUCT_ADD}:stock-type`),
  set: (val: OrNoValue<string>) =>
    $$main.put({ [`${key_PRODUCT_ADD}:stock-type`]: val }),
});
const productOnSale$ = computed({
  get: () => $$main.get(`${key_PRODUCT_ADD}:on-sale`),
  set: (val: OrNoValue<boolean>) =>
    $$main.put({ [`${key_PRODUCT_ADD}:on-sale`]: val }),
});
const productDescription$ = computed({
  get: () => $$main.get(`${key_PRODUCT_ADD}:description`),
  set: (val: OrNoValue<string>) =>
    $$main.put({ [`${key_PRODUCT_ADD}:description`]: val }),
});
//
const fileImage01$ = ref();
const productImage01$ = ref();
watch(fileImage01$, async ([image1]) => {
  productImage01$.value = null == image1 ? undefined : await dataUrl(image1);
});
const fileImage02$ = ref();
const productImage02$ = ref();
watch(fileImage02$, async ([image2]) => {
  productImage02$.value = null == image2 ? undefined : await dataUrl(image2);
});

const submitProductAdd = async () => {
  console.log(`@submitProductAdd`);
};
const fieldsReset = () => {
  productName$.value = "";
  productPrice$.value = undefined;
  productCategory$.value = undefined;
  productStock$.value = undefined;
  productStockType$.value = undefined;
  fileImage01$.value = [];
  fileImage02$.value = [];
  productOnSale$.value = undefined;
  productDescription$.value = undefined;
};

// #eos
</script>
<template>
  <VSheet :rounded="0" :elevation="0" class="fill-height d-flex flex-col">
    <!-- @toolbar -->
    <VToolbar flat color="transparent">
      <VBtn @click="props_.close" icon variant="text" size="large">
        <VIcon icon="$prev" size="large" />
        <VTooltip
          activator="parent"
          text="Nazad"
          open-delay="345"
          location="bottom"
        />
      </VBtn>
      <VToolbarTitle class="ms-sm-8">
        <h2
          class="text-h5 !font-sans text-medium-emphasis items-center d-flex gap-4"
        >
          <VIcon
            start
            icon="$iconProductAdd"
            color="primary-darken-2"
            class="!opacity-60"
          />
          <span>Ulistaj prozivod</span>
        </h2>
      </VToolbarTitle>
      <VSpacer v-if="smAndUp" />
      <VBtn @click="props_.close" icon variant="text" size="large">
        <VIcon icon="$close" size="large" />
        <VTooltip
          activator="parent"
          text="Zatvori"
          open-delay="345"
          location="bottom"
        />
      </VBtn>
    </VToolbar>

    <!-- @form -->
    <VForm @submit.prevent="submitProductAdd" class="grow d-flex flex-col">
      <div class="grow *bg-red">
        <!-- @@ -->
        <!-- @form:fields -->
        <section
          class="form--product-add mx-auto max-w-[796px] d-flex flex-col *sm:gap-y-2"
        >
          <!-- @@ -->
          <!-- @rows:1 -->
          <div class="d-sm-flex justify-between items-center mt-sm-4">
            <!-- @fields:name -->
            <VTextField
              v-model.trim="productName$"
              variant="underlined"
              label="Naziv *"
              clearable
              :class="smAndUp ? 'w-2/3' : undefined"
            >
              <template #prepend>
                <VIcon
                  color="primary-darken-2"
                  icon="$iconTag"
                  size="large"
                  start
                />
              </template>
            </VTextField>
            <!-- @fields:price -->
            <VTextField
              v-model.number="productPrice$"
              variant="underlined"
              label="Cena po JM."
              clearable
              type="number"
              hide-spin-buttons
              class="*max-w-48 ms-4"
            >
              <template #append-inner>
                <VIcon
                  color="primary-darken-2"
                  icon="$iconRSD"
                  class="!opacity-30"
                />
              </template>
            </VTextField>
          </div>
          <!-- @@ -->
          <!-- @rows:2 -->
          <div class="d-sm-flex justify-between items-center mt-4">
            <!-- @fields:category -->
            <VSelect
              v-model="productCategory$"
              center-affix
              label="Robna grupa *"
              :items="['foo1', 'foo2', 'bar']"
              variant="solo"
              class="sm:w-1/3"
            >
              <template #prepend>
                <VIcon color="primary-darken-2" icon="$iconCategory" start />
              </template>
            </VSelect>

            <!-- @fields:stock-type .jm -->
            <VSpacer v-if="smAndUp" />
            <VSelect
              v-model="productStockType$"
              variant="underlined"
              :items="[
                {
                  title: 'KOM.',
                  value: 'kom',
                },
                {
                  title: 'KG.',
                  value: 'kg',
                },
              ]"
              :class="smAndUp ? 'w-32' : undefined"
            >
              <template #prepend-inner>
                <pre class="font-italic opacity-30">JM.</pre>
              </template>
            </VSelect>

            <!-- @fields:stock -->
            <VTextField
              v-model.number="productStock$"
              type="number"
              variant="underlined"
              label="Zaliha"
              clearable
              class="sm:w-1/4 ms-4"
              hide-spin-buttons
            >
              <template #append-inner>
                <VIcon
                  color="primary-darken-2"
                  icon="$iconBattery"
                  end
                  class="!opacity-30"
                  size="small"
                />
              </template>
            </VTextField>
          </div>
          <!-- @@ -->
          <!-- @rows:3 -->
          <div class="mt-2">
            <VContainer fluid>
              <VRow dense>
                <VCol sm="4" class="*bg-red">
                  <VCheckbox
                    v-model="productOnSale$"
                    color="primary"
                    label="Rasprodaja"
                  />
                </VCol>
                <VCol sm="4" class="*bg-red">
                  <VFileInput
                    v-model="fileImage01$"
                    label="Slika, 1."
                    variant="solo"
                    density="comfortable"
                    class="text-truncate !text-sm"
                    @click:clear="fileImage01$ = []"
                    prepend-icon="$iconImage"
                    center-affix
                  />
                  <VImg
                    class="mx-auto d-block"
                    width="96"
                    :src="productImage01$"
                    max-height="96"
                  />
                </VCol>
                <VCol sm="4" class="*bg-red">
                  <VFileInput
                    v-model="fileImage02$"
                    label="Slika, 2."
                    variant="solo"
                    density="comfortable"
                    class="text-truncate !text-sm"
                    @click:clear="fileImage02$ = []"
                    prepend-icon="$iconImage"
                    center-affix
                  />
                  <VImg
                    :src="productImage02$"
                    class="mx-auto d-block"
                    width="96"
                    max-height="96"
                  />
                </VCol>
              </VRow>
            </VContainer>
          </div>
          <!-- @@ -->
          <!-- @rows:3 -->
          <div class="mx-auto sm:w-[550px]">
            <VTextarea
              class="pa-1"
              variant="underlined"
              clearable
              label="Opis, Detalji"
              v-model.trim="productDescription$"
            />
          </div>
        </section>
      </div>
      <VToolbar flat color="transparent" class="pa-sm-4">
        <VBtn
          :size="smAndUp ? 'large' : undefined"
          variant="tonal"
          color="secondary-lighten-1"
          @click="fieldsReset"
        >
          <VIcon icon="$iconEraser" start size="large" />
          <strong>Resetuj</strong>
        </VBtn>
        <VSpacer />
        <VBtn
          :size="smAndUp ? 'large' : undefined"
          variant="elevated"
          type="submit"
          class="*ms-4"
          color="primary"
          elevation="1"
        >
          <VIcon icon="$iconSave" start size="large" />
          <strong>Ulistaj</strong>
        </VBtn>
      </VToolbar>
    </VForm>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
