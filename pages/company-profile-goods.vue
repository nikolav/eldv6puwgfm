<script setup lang="ts">
import type { OrNoValue } from "@/types";
import { ProductAdd, ProductsEdit } from "@/components/app";
import { useDisplay } from "vuetify";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

useHead({
  title: "lager",
});


const { smAndUp } = useDisplay();

const { products: products$, remove: productsRemove } = useProducts();

const toggleProductAdd = useToggleFlag();
const toggleProductsEdit = useToggleFlag();

const {
  key: { PRODUCT_SELECTED, APP_PROCESSING },
  app: { DEFAULT_TRANSITION },
  docs: { PRODUCT_IMAGES },
  products: { perPage },
} = useAppConfig();
const $$main = useStoreMain();

const pageLager$ = ref(1);
const paginationLength$ = computed(() =>
  Math.ceil(products$.value.length / perPage)
);

const selectedProduct$ = computed({
  get: () => $$main.get(PRODUCT_SELECTED),
  set: (val: OrNoValue<number>) => {
    $$main.put({
      [PRODUCT_SELECTED]: val !== $$main.get(PRODUCT_SELECTED) ? val : null,
    });
  },
});
onMounted(() => {
  selectedProduct$.value = null;
});
const productIsSelected = (id: number) => id === selectedProduct$.value;

const { topic$, data: productImages$ } = useDocs();
watch(selectedProduct$, (pid) => {
  if (!pid) return;
  topic$.value = `${PRODUCT_IMAGES}${pid}`;
});

const { $lightbox } = useNuxtApp();
const { publicUrl } = useApiStorage();
const showSelectedProductImages = () => {
  const caption = get(
    find(products$.value, { id: selectedProduct$.value }),
    "name"
  );
  $lightbox.open(
    map(productImages$.value, (node) => {
      return {
        type: "image",
        src: publicUrl(get(node, "data.file_id")),
        caption,
      };
    })
  );
};

const toggleScreenProductRemove = useToggleFlag();
const $$flags = useStoreFlags();
const submitProductsRemove = async () => {
  let res;

  const ID = selectedProduct$.value;

  try {
    if (!isNumeric(ID)) throw "--error";
    $$flags.on(APP_PROCESSING);
    res = await productsRemove(Number(ID));
  } catch (error) {
    // pass
  }
  // unselect if product removed
  if (get(res, "data.productsRm.id")) {
    selectedProduct$.value = null;
  }
  $$flags.off(APP_PROCESSING);
  toggleScreenProductRemove.off();
};

// #eos
</script>
<template>
  <section class="page--company-profile-goods">
    <!-- @@confirm --product-remove -->
    <VBottomSheet
      v-model="toggleScreenProductRemove.isActive.value"
      :inset="smAndUp"
      scrim="red-lighten-3"
      min-height="196"
    >
      <VCard class="grow pa-2" rounded="t">
        <VBtn
          @click="toggleScreenProductRemove.off"
          icon
          variant="plain"
          class="position-absolute top-px end-px"
        >
          <VIcon icon="$close" />
        </VBtn>

        <VCardTitle class="text-center">
          <h2>
            Obriši proizvod,
            <pre class="text-disabled d-inline-block">
#{{ selectedProduct$ }}</pre
            >
            :
          </h2>
        </VCardTitle>

        <VCardText>
          <p
            class="text-center text-truncate font-italic text-body-1 !font-sans"
          >
            '{{ get(find(products$, { id: selectedProduct$ }), "name") }}'
          </p>
        </VCardText>
      </VCard>
      <VToolbar color="surface" class="px-2 px-sm-6 pb-sm-4">
        <VForm @submit.prevent="submitProductsRemove" class="d-inline-block">
          <VBtn color="error" type="submit" size="large" variant="text">
            <VIcon size="large" start icon="$iconTrash" />
            <strong>Obriši</strong>
          </VBtn>
        </VForm>
        <VSpacer />
        <VBtn
          @click="toggleScreenProductRemove.off"
          size="large"
          variant="tonal"
          >Odustani</VBtn
        >
      </VToolbar>
    </VBottomSheet>

    <!-- @@screen --product-create -->
    <VDialog
      persistent
      no-click-animation
      :transition="DEFAULT_TRANSITION"
      fullscreen
      v-model="toggleProductAdd.isActive.value"
    >
      <ProductAdd :close="toggleProductAdd.off" />
    </VDialog>

    <!-- @@screen --product-edit -->
    <VDialog
      persistent
      no-click-animation
      :transition="DEFAULT_TRANSITION"
      fullscreen
      v-model="toggleProductsEdit.isActive.value"
    >
      <ProductsEdit
        :product_id="selectedProduct$"
        :close="toggleProductsEdit.off"
      />
    </VDialog>
    <div class="px-2 px-sm-6 mt-2 mt-sm-8">
      <VPagination
        v-if="1 < paginationLength$"
        id="products-pagination"
        :length="paginationLength$"
        v-model="pageLager$"
        variant="text"
        rounded="circle"
        active-color="primary"
      />

      <!-- @@products:crud -->
      <VCard max-width="956" class="mx-auto">
        <VToolbar height="48" color="primary" flat>
          <VToolbarTitle>
            <VIcon start size="small" class="opacity-50" icon="$iconBoxes" />
            <strong class="ps-2 space-x-2">
              <span>Lager</span>
              <VBadge
                v-if="0 < products$.length"
                inline
                floating
                color="primary-lighten-1"
                class="-translate-y-[2px]"
              >
                <template #badge>
                  <pre>{{ products$.length }}</pre>
                </template>
              </VBadge>
            </strong>
          </VToolbarTitle>

          <!-- @@products:controlls -->
          <VToolbarItems class="space-x-4 *pe-2">
            <VBtn
              @click="toggleProductsEdit.on"
              :disabled="null == selectedProduct$"
              rounded="circle"
              icon
              ><VIcon icon="$edit" />
              <VTooltip
                activator="parent"
                location="bottom"
                open-delay="345"
                text="Ažuriraj proizvod..."
              />
            </VBtn>
            <VBtn
              @click="showSelectedProductImages"
              :disabled="
                null == selectedProduct$ || !(0 < productImages$.length)
              "
              rounded="circle"
              icon
              ><VIcon icon="$iconImages" />
              <VTooltip
                open-delay="345"
                activator="parent"
                location="bottom"
                text="Pogledaj slike proizvoda..."
              />
            </VBtn>
            <VBtn :disabled="null == selectedProduct$" rounded="circle" icon
              ><VIcon icon="$iconLink" size="large"
            /></VBtn>
            <VBtn
              color="error"
              :disabled="null == selectedProduct$"
              rounded="circle"
              icon
              @click="toggleScreenProductRemove.on"
              ><VIcon icon="$iconTrash"
            /></VBtn>
            <VBtn
              @click="toggleProductAdd.on"
              class="*ms-4"
              rounded="circle"
              icon
              color="success"
              ><VIcon icon="$iconPlusCircle" :size="35" />
              <VTooltip
                activator="parent"
                text="Ulistaj nov proizvod..."
                open-delay="345"
                location="bottom"
              />
            </VBtn>
          </VToolbarItems>
        </VToolbar>

        <!-- @@products:table -->
        <VDataIterator
          :items="products$"
          :items-per-page="perPage"
          :page="pageLager$"
        >
          <template #no-data>
            <p>no data</p>
          </template>

          <template #default="{ items: products }">
            <VList density="comfortable" lines="one" color="primary-lighten-1">
              <VListItem
                v-for="node in products"
                :key="node.raw.id"
                @click="selectedProduct$ = node.raw.id"
                :active="node.raw.id == selectedProduct$"
              >
                <template #prepend>
                  <VIcon
                    size="large"
                    :color="
                      productIsSelected(node.raw.id)
                        ? 'primary-darken-1'
                        : undefined
                    "
                    :icon="
                      productIsSelected(node.raw.id)
                        ? '$iconCheckboxOn'
                        : '$iconCheckboxOff'
                    "
                  />
                </template>
                <VListItemTitle> {{ node.raw.name }}</VListItemTitle>
              </VListItem>
            </VList>
          </template>
        </VDataIterator>
      </VCard>
    </div>
  </section>
</template>
<style lang="scss" scoped>
// #products-pagination .v-pagination__list {
//   justify-content: start;
// }
</style>
