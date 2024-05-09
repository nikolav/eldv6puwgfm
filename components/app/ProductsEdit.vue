<script setup lang="ts">
// "name",
// "category",
// "price",
// "stockType",
// "stock",
// "onSale",
// "description",

import { useDisplay } from "vuetify";
import type { OrNoValue } from "@/types";

// defs
const props_ = defineProps<{
  product_id: OrNoValue<number>;
  close: () => void;
}>();
const {
  key: { PRODUCT_EDIT, APP_PROCESSING },
  docs: { PRODUCT_IMAGES },
  products: { fields: FIELDS, categories: CATEGORIES, PRODUCT_CATEGORY_prefix },
  io: { IOEVENT_PRODUCT_IMAGES_CHANGE_prefix },
} = useAppConfig();
const FIELDS_updatable = FIELDS;

// utils
const { smAndUp } = useDisplay();

// stores
const { products: products$, upsert: productsCommit } = useProducts();
// manage product images
const { remove: productImagesRemove, upload, publicUrl, IO } = useApiStorage();
const {
  topic$,
  data: productImages$,
  reload: productImagesReload,
  tags,
} = useDocs();

// computes
const product$ = computed(() =>
  find(products$.value, { id: props_.product_id })
);
const pid$ = computed(() => get(product$.value, "id"));

const category$ = ref();
const categoryTag = () =>
  find(get(product$.value, "tags"), (tag: string) =>
    tag.startsWith(PRODUCT_CATEGORY_prefix)
  );
watchEffect(() => {
  if (!pid$.value) return;
  category$.value = categoryTag();
});

// emited @manage/product:images
const ioEventPics$ = computed(() =>
  pid$.value ? `${IOEVENT_PRODUCT_IMAGES_CHANGE_prefix}${pid$.value}` : ""
);
watch(pid$, (pid) => {
  topic$.value = pid ? `${PRODUCT_IMAGES}${pid}` : "";
});
watchEffect(() => {
  useIOEvent(ioEventPics$.value, productImagesReload);
});
useIOEvent(IO.value, productImagesReload);

// forms
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
const productDataInitFromStore = () => {
  FIELDS_updatable.forEach((field) => {
    if (field !== "category") {
      productData[field].value = get(product$.value, field);
      return;
    }
    category$.value = categoryTag();
  });
};
// update formdata @combobox change
watchEffect(() => {
  if (!category$.value) return;
  productData.category.value = category$.value;
});

// init product cache @mounted
// onceMountedOn(pid$, productDataInitFromStore);
const { runSetup: initProductCache } = useRunSetupOnce(
  productDataInitFromStore
);
onMounted(() => {
  watch(pid$, (pid) => {
    if (!pid) return;
    initProductCache();
  });
});

// refs/flags
const fileImage1$ = ref();
const $$flags = useStoreFlags();
const toggleSnackbarProductEditStatus = useToggleFlag();

// handlers
const submitProductsEdit = async () => {
  let pid;
  let resUpload;

  let statusSuccess_ = true;
  const err = new Error("--submitProductsEdit");

  try {
    pid = pid$.value;
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

    $$flags.on(APP_PROCESSING);
    // @debug
    // await productsCommit(form, pid);
    console.log({ "@product:updated": await productsCommit(form, pid) });

    const file1 = get(toValue(fileImage1$), "[0]");
    if (file1) {
      resUpload = await upload({
        image: {
          file: file1,
        },
      });
    }
    const docIdImage1 = Number(get(resUpload, "image.id"));
    if (docIdImage1)
      await tags(docIdImage1, { [`${PRODUCT_IMAGES}${pid}`]: true });
  } catch (error) {
    // pass
    statusSuccess_ = false;
  }
  $$flags.off(APP_PROCESSING);
  if (statusSuccess_) toggleSnackbarProductEditStatus.on();
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
// @@eos
</script>
<template>
  <VSheet
    class="screen--prodcuts-edit fill-height d-flex flex-col"
    :rounded="0"
    :elevation="0"
  >
    <!-- @signal-status, --product-updated -->
    <VSnackbar
      v-model="toggleSnackbarProductEditStatus.isActive.value"
      color="transparent"
      variant="text"
    >
      <VAlert type="success" prominent elevation="4">
        <div class="d-flex justify-between items-center gap-4 sm:gap-8">
          <p>Proizvod je uspešno ažuriran.</p>
          <VBtn
            @click="toggleSnackbarProductEditStatus.off"
            color="on-success"
            variant="tonal"
            >ok</VBtn
          >
        </div>
      </VAlert>
    </VSnackbar>

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
      <VBtn
        :size="smAndUp ? 'large' : undefined"
        variant="text"
        color="secondary-lighten-1"
        @click="productDataInitFromStore"
      >
        <VIcon icon="$iconEraser" start size="large" />
        <strong>Poništi</strong>
      </VBtn>
      <VSpacer v-if="smAndUp" />
      <VBtn
        @click="submitProductsEdit"
        :size="smAndUp ? 'large' : undefined"
        variant="elevated"
        type="submit"
        class="*ms-4 px-5"
        color="primary"
        elevation="2"
      >
        <VIcon icon="$edit" start size="large" />
        <strong>Ažuriraj</strong>
      </VBtn>
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
      <div class="*grow *bg-red">
        <!-- @@ -->
        <!-- @form:fields -->
        <section
          class="form--product-add mx-auto max-w-[796px] d-flex flex-col sm:gap-y-3"
        >
          <!-- @@ -->
          <!-- @rows:1 -->
          <div class="d-sm-flex justify-between items-center mt-sm-4">
            <!-- @fields:name -->
            <VTextField
              v-model="productData.name.value"
              variant="underlined"
              label="Naziv *"
              clearable
              :class="smAndUp ? 'w-2/3' : undefined"
            >
              <template v-if="smAndUp" #prepend>
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
              class="*max-w-48 ms-sm-4"
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
            <!-- :disabled="false" -->
            <VSelect
              :items="CATEGORIES"
              v-model="category$"
              center-affix
              label="Robna grupa *"
              class="sm:w-1/3"
              variant="solo"
            >
              <template v-if="smAndUp" #prepend>
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
              class="sm:w-1/4 ms-sm-4"
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
                    class="*ps-sm-4"
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
              v-model="productData.description.value"
            />
          </div>
        </section>
      </div>
    </VForm>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
