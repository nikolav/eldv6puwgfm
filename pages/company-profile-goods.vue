<script setup lang="ts">
import type { OrNoValue, TDocData, ITopicChatMessage } from "@/types";
import {
  ProductAdd,
  ProductsEdit,
  ChatRenderSimpleList,
  ChatControllsBasic,
} from "@/components/app";
import { useDisplay } from "vuetify";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

useHead({
  title: "lager",
});

const {
  key: { PRODUCT_SELECTED, APP_PROCESSING, TOPIC_CHAT_PRODUCTS_prefix },
  app: { DEFAULT_TRANSITION },
  docs: { PRODUCT_IMAGES },
  products: { perPage },
  urls: { productPages, appPublic },
} = useAppConfig();

const { smAndUp, width, xs } = useDisplay();

const appProcessing$ = useGlobalFlag(APP_PROCESSING);
const {
  products: products$,
  remove: productsRemove,
  reload: productsReload,
  loading: productsProcessing,
} = useProducts();
watchEffect(() => {
  appProcessing$.value = productsProcessing.value;
});

const toggleProductAdd = useToggleFlag();
const toggleProductsEdit = useToggleFlag();

const { length: paginationLength$, page$: pageLager$ } = usePaginateData({
  data: products$,
  perPage,
});

const $$main = useStoreMain();
const selectedProduct$ = computed({
  get: () => $$main.get(PRODUCT_SELECTED),
  set: (val: OrNoValue<number>) => {
    $$main.put({
      [PRODUCT_SELECTED]: val !== $$main.get(PRODUCT_SELECTED) ? val : null,
    });
  },
});
const product_ = computed(() =>
  find(products$.value, { id: selectedProduct$.value })
);
const channelProductChat = computed(() =>
  product_.value
    ? `${TOPIC_CHAT_PRODUCTS_prefix}${get(product_.value, "id")}`
    : ""
);
const {
  topic$: topicChat$,
  data: dataProductChat,
  remove: productChatRemoveMessage,
  loading: productChatLoading,
  length: productChatLength,
} = useDocs<ITopicChatMessage>();
watchEffect(() => {
  appProcessing$.value = productChatLoading.value;
});
watchEffect(() => {
  topicChat$.value = channelProductChat.value;
});
const chat = computed(() => docsSortedDesc(dataProductChat.value));

onMounted(() => {
  selectedProduct$.value = null;
});
const productIsSelected = (id: number) => id === selectedProduct$.value;

const { topic$, data: productImages$ } = useDocs();
watch(selectedProduct$, (pid) => {
  if (!pid) return;
  topic$.value = `${PRODUCT_IMAGES}${pid}`;
});

const { publicUrl } = useApiStorage();
const { $lightbox } = useNuxtApp();
const showSelectedProductImages = () =>
  $lightbox.open(
    map(productImages$.value, (node) => {
      return {
        type: "image",
        src: publicUrl(get(node, "data.file_id")),
        caption: get(product_.value, "name"),
      };
    })
  );

const toggleScreenProductRemove = useToggleFlag();
const submitProductsRemove = async () => {
  let res;

  const ID = selectedProduct$.value;

  try {
    if (!isNumeric(ID)) throw "--error";
    appProcessing$.value = true;
    res = await productsRemove(Number(ID));
  } catch (error) {
    // pass
  }
  // unselect if product removed
  if (get(res, "data.productsRm.id")) {
    selectedProduct$.value = null;
  }
  appProcessing$.value = false;
  toggleScreenProductRemove.off();
};

const statusToggleProductAdded = useToggleFlag();

const productToSlug = () =>
  words(get(product_.value, "name"))
    .concat(get(product_.value, "id") || "")
    .join("-");
const linkExternalProductPage = () => {
  if (!product_.value) return;
  return `${trimEnd(appPublic, "/")}/${trim(
    productPages,
    "/"
  )}?slug=${encodeURIComponent(productToSlug())}`;
};
const goToPublicProductPage = async () => {
  const ln = linkExternalProductPage();
  if (!ln) return;
  return await navigateTo(ln, {
    external: true,
    open: { target: "_blank" },
  });
};
const toggleProductChat = useToggleFlag();
const toggleChatControlls = useToggleFlag();
// @@eos
</script>
<template>
  <section class="page--company-profile-goods">
    <!-- @com.channel:product -->
    <VNavigationDrawer
      v-model="toggleProductChat.isActive.value"
      location="end"
      :width="xs ? width : 412"
      :order="-1"
      absolute
      temporary
    >
      <Teleport to="body">
        <VSlideYReverseTransition>
          <VBtn
            color="on-primary"
            size="x-large"
            variant="elevated"
            elevation="4"
            v-if="toggleProductChat.isActive.value"
            class="z-[9999] bottom-10 end-8"
            position="fixed"
            icon
          >
            <VIcon color="primary" size="x-large" icon="$iconPaperPlane" />
            <VMenu
              v-model="toggleChatControlls.isActive.value"
              :close-on-content-click="false"
              transition="slide-y-reverse-transition"
              width="333"
              activator="parent"
              location="top"
              :offset="[24, 12]"
            >
              <ChatControllsBasic
                @message-saved="toggleChatControlls.off"
                :topic="channelProductChat"
              >
                <template #submit-btn>
                  <VBtn
                    size="large"
                    variant="text"
                    color="primary"
                    type="submit"
                    >ok</VBtn
                  >
                </template>
              </ChatControllsBasic>
            </VMenu>
          </VBtn>
        </VSlideYReverseTransition>
      </Teleport>
      <ChatRenderSimpleList
        :remove="productChatRemoveMessage"
        :chat="chat"
        class="max-h-full pa-2"
      />
      <!-- @@todo -->
    </VNavigationDrawer>

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
            '{{ get(product_, "name") }}'
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

    <!-- @alert:product-added -->
    <VSnackbar
      v-model="statusToggleProductAdded.isActive.value"
      color="transparent"
      variant="text"
    >
      <VAlert type="success" prominent elevation="4">
        <div class="d-flex justify-between items-center gap-4 sm:gap-8">
          <p>Proizvod je uspešno ulistan.</p>
          <VBtn
            @click="statusToggleProductAdded.off"
            color="on-success"
            variant="tonal"
            >ok</VBtn
          >
        </div>
      </VAlert>
    </VSnackbar>

    <!-- @@screen --product-create -->
    <VDialog
      persistent
      no-click-animation
      :transition="DEFAULT_TRANSITION"
      fullscreen
      v-model="toggleProductAdd.isActive.value"
    >
      <ProductAdd
        :statusToggleProductAddedOn="statusToggleProductAdded.on"
        :close="toggleProductAdd.off"
      />
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
    <div class="px-2 px-sm-6 mt-2 mt-sm-4">
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
      <VCard max-width="812" class="mx-auto">
        <VToolbar height="48" color="primary" flat>
          <VToolbarTitle v-if="smAndUp">
            <VIcon start size="small" class="opacity-50" icon="$iconBoxes" />
            <strong class="ps-2 space-x-2">
              <em>Lager</em>
              <VBadge
                v-if="0 < products$.length"
                inline
                color="primary-lighten-1"
                class="-translate-y-[2px]"
              >
                <template #badge>
                  <pre>{{ products$.length }}</pre>
                </template>
              </VBadge>
            </strong>
          </VToolbarTitle>

          <!-- push right @sm+ -->
          <VSpacer v-if="!smAndUp" />

          <!-- @@products:controlls -->
          <VToolbarItems :class="`*pe-2 ${smAndUp ? 'space-x-4' : undefined}`">
            <!-- product.edit -->
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
            <!-- product.images -->
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
            <!-- @@product public link -->
            <VBtn
              @click="goToPublicProductPage"
              :disabled="null == selectedProduct$"
              rounded="circle"
              icon
            >
              <VTooltip
                activator="parent"
                open-delay="345"
                location="bottom"
                text="Strana proizvoda..." />
              <VIcon icon="$iconExternalLink"
            /></VBtn>
            <!-- product com.channel -->
            <VBtn
              @click="toggleProductChat.on"
              :disabled="null == selectedProduct$"
              rounded="circle"
              icon
            >
              <VTooltip
                activator="parent"
                open-delay="345"
                location="bottom"
                text="Poruke..."
              />

              <VBadge color="primary3" :model-value="0 < productChatLength">
                <template #badge>
                  <pre>{{ productChatLength }}</pre>
                </template>
                <VIcon icon="$iconChatDots" />
              </VBadge>
            </VBtn>
            <!-- products reload -->
            <VBtn rounded="circle" icon @click="productsReload">
              <VTooltip
                activator="parent"
                open-delay="345"
                location="bottom"
                text="Osveži listu proizvoda." />
              <VIcon icon="$loading"
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
          <VSpacer v-if="!smAndUp" />
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
