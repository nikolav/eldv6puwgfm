<script setup lang="ts">
// "name": "pogaca, domaca, ispod saca",
// "description": null,
// "price": null,
// "stockType": null,
// "stock": null,
// "onSale": false,

import { useDisplay } from "vuetify";

import type { OrNoValue } from "@/types";

const props_ = defineProps<{
  product_id: OrNoValue<number>;
  close: () => void;
}>();

const { smAndUp } = useDisplay();

const {
  key: { PRODUCT_EDIT, APP_PROCESSING },
  docs: { PRODUCT_IMAGES },
  products: { fields: FIELDS, categories: CATEGORIES, PRODUCT_CATEGORY_prefix },
} = useAppConfig();
const FIELDS_updatable = FIELDS.filter((field) => "category" !== field);

const { products: products$, upsert: productsUpsert } = useProducts();

// load product
const product$ = computed(() =>
  find(products$.value, { id: props_.product_id })
);
const pid$ = computed(() => get(product$.value, "id"));

// product category
const category$ = computed(() => {
  if (!isEmpty(pid$.value)) {
    const category_ = find(get(product$.value, "tags"), (tag: string) =>
      tag.startsWith(PRODUCT_CATEGORY_prefix)
    );
    return find(CATEGORIES, (node) => node.value === category_);
  }
});

// manage product images
const { remove: productImagesRemove, upload, publicUrl, IO } = useApiStorage();
const {
  topic$,
  data: productImages$,
  reload: productImagesReload,
  tags,
} = useDocs();
watch(pid$, (pid) => {
  if (isEmpty(pid)) return;
  topic$.value = `${PRODUCT_IMAGES}${pid}`;
});
useIOEvent(toValue(IO), productImagesReload);

// cache updated product info
const $$main = useStoreMain();
const productData = reduce(
  FIELDS_updatable,
  (data, field) => {
    data[field] = computed({
      get: () => $$main.get(`${PRODUCT_EDIT}:${field}`),
      set: (val) => $$main.put({ [`${PRODUCT_EDIT}:${field}`]: val }),
    });
    return data;
  },
  <Record<string, Ref>>{}
);

// init product cache @mounted
const { runSetup: initProductCache } = useRunSetupOnce(() => {
  FIELDS_updatable.forEach((field) => {
    productData[field].value = get(product$.value, field);
  });
});
onMounted(() => {
  watch(pid$, (pid) => {
    if (isEmpty(pid)) return;
    initProductCache();
  });
});

const $$flags = useStoreFlags();

const fileImage1$ = ref();

const submitProductsEdit = async () => {
  const err = new Error("--submitProductsEdit");
  let pid;
  let resUpload;
  let res;

  try {
    $$flags.on(APP_PROCESSING);

    pid = toValue(pid$);
    if (!pid) throw err;

    const form = reduce(
      FIELDS_updatable,
      (data, field) => {
        data[field] = productData[field].value;
        return data;
      },
      <Record<string, any>>{}
    );
    if (isEmpty(form)) throw err;

    const resUpdate = await productsUpsert(form, pid);
    if (!isEmpty(get(resUpdate, "data.productsUpsert.id"))) {
      console.log({ resUpdate });
    }

    const file1 = get(toValue(fileImage1$), "[0]");
    if (file1) {
      resUpload = await upload({
        image: {
          file: file1,
          data: {},
        },
      });
    }
    const docIdImage1 = Number(get(resUpload, "image.id"));
    if (docIdImage1) {
      res = get(
        await tags(docIdImage1, { [`${PRODUCT_IMAGES}${pid}`]: true }),
        `data.docsTags.${PRODUCT_IMAGES}${pid}`
      );
    }
  } catch (error) {
    // pass
    console.error(error);
  }

  if (res) productImagesReload();
  $$flags.off(APP_PROCESSING);
};

const onClickProductImagesRemove = async (file_id: string) => {
  try {
    $$flags.on(APP_PROCESSING);
    await productImagesRemove(file_id);
  } catch (error) {
    // pass
  }
  $$flags.off(APP_PROCESSING);
};
// #eos
</script>
<template>
  <VSheet
    class="screen--prodcuts-edit fill-height d-flex flex-col"
    :rounded="0"
    :elevation="0"
  >
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
      <VSpacer v-if="smAndUp" />
      <VToolbarTitle class="ms-sm-8">
        <h2
          class="text-h5 !font-sans text-medium-emphasis items-center d-flex gap-4"
        >
          <VIcon
            start
            icon="$edit"
            size="small"
            color="primary-darken-2"
            class="!opacity-60"
          />
          <span>Uredi prozivod</span>
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
    <VForm
      @submit.prevent="submitProductsEdit"
      class="grow d-flex flex-col mt-sm-4"
    >
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
              v-model.trim="productData.name.value"
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
              v-model.number="productData.price.value"
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
              disabled
              center-affix
              label="Robna grupa *"
              class="sm:w-1/3"
              variant="solo"
              :model-value="category$"
            >
              <template #prepend>
                <VIcon
                  size="large"
                  color="primary-darken-2"
                  icon="$IconFolderFilled"
                  start
                />
              </template>
            </VSelect>

            <!-- @fields:stock-type .jm -->
            <VSpacer v-if="smAndUp" />
            <VSelect
              v-model="productData.stockType.value"
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
              v-model.number="productData.stock.value"
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
              <VRow justify="space-between">
                <VCol sm="4" class="*bg-red">
                  <VCheckbox
                    v-model="productData.onSale.value"
                    color="primary"
                    label="Rasprodaja"
                    class="ps-sm-4"
                  />
                </VCol>
                <VCol sm="7" class="*bg-red" offset-sm="1">
                  <VFileInput
                    v-model="fileImage1$"
                    label="Dodaj novu sliku proizvoda"
                    variant="solo"
                    density="comfortable"
                    class="text-truncate !text-sm"
                    @click:clear="fileImage1$ = []"
                    prepend-icon="$iconImage"
                    center-affix
                  />
                  <VImg
                    class="mx-auto d-block"
                    width="96"
                    :src="undefined"
                    max-height="96"
                  />
                </VCol>
              </VRow>
            </VContainer>
          </div>
          <!-- @@ -->
          <!-- @rows:4 -->
          <!-- images slider -->
          <VContainer
            v-if="!isEmpty(productImages$)"
            class="*d-flex *justify-between *items-center *sm:ps-5 mt-sm-n4"
            fluid
          >
            <VRow no-gutters>
              <VCol v-if="smAndUp" sm="2">
                <div
                  v-if="smAndUp"
                  class="w-[81px] h-[81px] *bg-red d-flex justify-center items-center"
                >
                  <VIcon
                    class="!-rotate-6 opacity-30"
                    color="primary-darken-2"
                    icon="$iconImages"
                    :size="40"
                  />
                </div>
              </VCol>
              <VCol sm="10">
                <VSlideGroup show-arrows class="ms-sm-n4">
                  <VSlideGroupItem
                    v-for="doc in productImages$"
                    :key="doc.data.id"
                  >
                    <VHover>
                      <template #default="{ isHovering, props }">
                        <VImg
                          rounded="lg"
                          v-bind="props"
                          cover
                          height="81"
                          width="81"
                          max-width="81"
                          :src="publicUrl(doc.data.file_id)"
                          class="me-4"
                        >
                          <VOverlay
                            scrim="red-lighten-3"
                            :model-value="isHovering"
                            contained
                            activator="parent"
                            persistent
                            @click.stop
                            class="d-flex justify-center items-center"
                          >
                            <VBtn
                              @click.stop="
                                onClickProductImagesRemove(doc.data.file_id)
                              "
                              icon
                              variant="tonal"
                              color="error"
                              size="large"
                            >
                              <VIcon icon="$iconTrash" size="x-large" />
                              <VTooltip
                                activator="parent"
                                location="bottom"
                                text="Ukloni sliku"
                                open-delay="345"
                              />
                            </VBtn>
                          </VOverlay>
                        </VImg>
                      </template>
                    </VHover>
                  </VSlideGroupItem>
                </VSlideGroup>
              </VCol>
            </VRow>
          </VContainer>
          <!-- @@ -->
          <!-- @rows:5 -->
          <div
            class="mx-auto mt-sm-3"
            :class="smAndUp ? 'min-w-[550px]' : 'w-100'"
          >
            <VTextarea
              class="pa-1"
              variant="underlined"
              clearable
              label="Opis, Detalji"
              v-model.trim="productData.description.value"
            />
          </div>
        </section>
      </div>
      <VToolbar flat color="transparent" class="pa-sm-4">
        <VBtn
          :size="smAndUp ? 'large' : undefined"
          variant="tonal"
          color="secondary-lighten-1"
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
          <strong>Sačuvaj</strong>
        </VBtn>
      </VToolbar>
    </VForm>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
