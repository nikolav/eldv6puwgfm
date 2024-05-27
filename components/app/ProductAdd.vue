<script setup lang="ts">
import { useDisplay } from "vuetify";
import { VBtnCategorySelect } from "@/components/app";

const props_ = defineProps<{
  close: () => void;
  statusToggleProductAddedOn: () => void;
}>();

const { smAndUp } = useDisplay();

const {
  key: { PRODUCT_ADD },
  docs: { PRODUCT_IMAGES },
  products: {
    // categories: CATEGORIES,
    fields: FIELDS,
    PRODUCT_CATEGORY_prefix,
  },
  io: { IOEVENT_PRODUCT_IMAGES_CHANGE_prefix },
} = useAppConfig();

// formdata
const $$main = useStoreMain();
const product = reduce(
  FIELDS,
  (res, field) => {
    res[field] = computed({
      get: () => $$main.get(`${PRODUCT_ADD}:${field}`),
      set: (val) => $$main.put({ [`${PRODUCT_ADD}:${field}`]: val }),
    });
    return res;
  },
  <Record<string, Ref>>{}
);

// @file: image
const fileImage$ = ref();
const productImage$ = ref();
watch(fileImage$, async ([image]) => {
  productImage$.value = null == image ? undefined : await dataUrl(image);
});

const pid$ = ref();
const ptag$ = computed(() =>
  pid$.value ? `${PRODUCT_IMAGES}${pid$.value}` : ""
);
const ioEventPics$ = computed(() =>
  pid$.value ? `${IOEVENT_PRODUCT_IMAGES_CHANGE_prefix}${pid$.value}` : ""
);

const { upsert: productsUpsert } = useProducts();
const { upload } = useApiStorage();
const { tags, reload: productImagesReload } = useDocs(ptag$);

// reload @product:images updates
watchEffect(() => {
  useIOEvent(ioEventPics$.value, productImagesReload);
});

const fieldsReset = () => {
  fileImage$.value = [];
  product.name.value = undefined;
  product.price.value = undefined;
  product.category.value = undefined;
  product.stock.value = undefined;
  product.stockType.value = undefined;
  product.description.value = undefined;
};

const { watchProcessing } = useStoreAppProcessing();
const pc1 = useProcessMonitor();
watchProcessing(() => pc1.processing.value);
// @@submit
const submitProductAdd = async () => {
  const form = reduce(
    FIELDS,
    (data, field) => {
      const val =
        "category" !== field
          ? toValue(product[field])
          : `${PRODUCT_CATEGORY_prefix}${toValue(product[field])}`;
      if (null != val) {
        data[field] = val;
      }
      return data;
    },
    <Record<string, any>>{}
  );

  if (isEmpty(form)) return;

  try {
    pc1.begin();
    pid$.value = get(await productsUpsert(form), "data.productsUpsert.id");
    if (!pid$.value) throw "--error-submitProductAdd";

    // product saved, upload image
    const resUpload = await upload({
      image: {
        file: get(fileImage$.value, "[0]"),
        data: {},
      },
    });
    //
    const id1 = Number(get(resUpload, "image.id"));
    const ptag = ptag$.value;
    //
    if (id1) await tags(id1, { [ptag]: true });
  } catch (error) {
    console.log(`@catch: error`);
    console.error(error);
    pc1.setError(error);
  } finally {
    pc1.done();
  }
  if (!pc1.error.value) pc1.successful();
  if (pid$.value) {
    // show status snackbar
    props_.statusToggleProductAddedOn();
    // clear fields
    fieldsReset();
    // # close widget @product-add
    props_.close();
  }
};

// #eos
</script>
<template>
  <VSheet :rounded="0" :elevation="0" class="fill-height d-flex flex-col">
    <!-- @toolbar:top -->
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
        @click="fieldsReset"
      >
        <VIcon icon="$iconEraser" start size="large" />
        <strong>Poništi</strong>
      </VBtn>
      <VSpacer v-if="smAndUp" />
      <!-- <VSpacer v-if="smAndUp" /> -->
      <VBtn
        @click="submitProductAdd"
        :size="smAndUp ? 'x-large' : undefined"
        variant="elevated"
        class="*ms-4"
        color="primary"
        elevation="1"
      >
        <VIcon icon="$iconProductAdd" start size="x-large" />
        <strong>Ulistaj</strong>
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
      @submit.prevent="submitProductAdd"
      class="grow d-flex flex-col mt-sm-4"
    >
      <div class="grow">
        <!-- @@ -->
        <!-- @form:fields -->
        <section
          class="form--product-add mx-auto max-w-[812px] d-flex flex-col sm:gap-y-4"
        >
          <!-- @@ -->
          <!-- @rows:1 -->
          <div class="d-sm-flex justify-between items-center mt-sm-4">
            <!-- @fields:name -->
            <VTextField
              v-model="product.name.value"
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
              v-model.number="product.price.value"
              variant="underlined"
              label="Cena po JM."
              clearable
              type="number"
              hide-spin-buttons
              class="*max-w-48 ms-sm-4"
            >
              <template v-if="smAndUp" #append-inner>
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
            <VBtnCategorySelect v-model="product.category.value" />

            <!-- <VSelect
              v-model="product.category.value"
              center-affix
              label="Robna grupa *"
              :items="CATEGORIES"
              variant="solo"
              class="sm:w-1/3"
            >
              <template v-if="smAndUp" #prepend>
                <VIcon
                  size="large"
                  color="primary-darken-2"
                  icon="$IconFolderFilled"
                  start
                />
              </template>
            </VSelect> -->

            <!-- @fields:stock-type .jm -->
            <VSpacer v-if="smAndUp" />
            <VSelect
              v-model="product.stockType.value"
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
            <VSpacer v-if="smAndUp" />

            <!-- @fields:stock -->
            <VTextField
              v-model.number="product.stock.value"
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
              <VRow dense justify="space-between">
                <VCol sm="8" offset-sm="4" class="*bg-red">
                  <VFileInput
                    single-line
                    v-model="fileImage$"
                    label="Slika"
                    rounded
                    variant="solo-filled"
                    density="comfortable"
                    class="text-truncate !text-sm"
                    @click:clear="fileImage$ = []"
                    prepend-icon="$iconImage"
                    center-affix
                  />
                  <VImg
                    class="mx-auto d-block"
                    width="96"
                    :src="productImage$"
                    max-height="96"
                  />
                </VCol>
              </VRow>
            </VContainer>
          </div>
          <!-- @@ -->
          <!-- @rows:4 -->
          <div class="mx-auto" :class="smAndUp ? 'min-w-[550px]' : 'w-100'">
            <VTextarea
              class="pa-1"
              variant="underlined"
              clearable
              label="Detaljan opis "
              v-model="product.description.value"
            />
          </div>
        </section>
      </div>
    </VForm>
  </VSheet>
</template>
<style lang="scss" scoped></style>
