<script setup lang="ts">
import type { OrNoValue, ITopicChatMessage } from "@/types";
import {
  ChatControllsBasic,
  ChatRenderSimpleList,
  LightboxProductImages,
  LikeDislikeStatus,
  NoDataProducts,
  ProductAdd,
  ProductsEdit,
  ProvideProductLikeDislikeTopic,
  ProvideProductMessagesCount,
  ProvideProductRatingTopic,
  ProvideProductsTotalAmountOrdered,
  TopicRatingStatus,
  VBtnTogglePackagesPromoted,
  VBtnFabPaketiUplata,
} from "@/components/app";
import { useDisplay } from "vuetify";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

useHead({
  title: "Lager",
});

const {
  key: { PRODUCT_SELECTED },
  app: { DEFAULT_TRANSITION },
  products: { perPage },
} = useAppConfig();

const { smAndUp, width, xs } = useDisplay();

const auth = useStoreApiAuth();
const {
  products: products$,
  remove: productsRemove,
  reload: productsReload,
} = useProducts();

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
const { productChat } = useTopics();
const channelProductChat = computed(() =>
  productChat(get(product_.value, "id"))
);
const {
  data: dataProductChat,
  remove: productChatRemoveMessage,
  length: productChatLength,
} = useDocs<ITopicChatMessage>(channelProductChat);
const chat = computed(() => docsSortedDesc(dataProductChat.value));

onMounted(() => {
  selectedProduct$.value = null;
});
const productIsSelected = (id: number) => id === selectedProduct$.value;

const toggleScreenProductRemove = useToggleFlag();
const submitProductsRemove = async () => {
  let res;

  const ID = selectedProduct$.value;

  try {
    res = ID && (await productsRemove(ID));
  } catch (error) {
    // pass
  }
  // unselect if product removed
  if (get(res, "data.productsRm.id")) {
    selectedProduct$.value = null;
  }
  toggleScreenProductRemove.off();
};

const statusToggleProductAdded = useToggleFlag();

const ln = useProductPublicUrl(
  () => get(product_.value, "id"),
  () => get(product_.value, "name")
);
const goToPublicProductPage = async () => {
  if (!ln.value) return;
  return await navigateTo(ln.value, {
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
    <!-- @fab --paketi-uplate -->
    <template v-if="auth.isPremium">
      <Teleport to="body">
        <div class="__placer__ position-fixed bottom-12 end-5 z-[1]">
          <VBtnFabPaketiUplata />
        </div>
      </Teleport>
    </template>

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

    <!-- @@data --list-products -->
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
      <VCard max-width="912" class="mx-auto mt-2 mt-sm-8" rounded="t-lg">
        <!-- toolbar -->
        <VToolbar color="primary" flat class="px-2">
          <VToolbarTitle v-if="smAndUp">
            <VIcon start class="opacity-50" icon="$iconBoxes" />
            <strong class="ps-2 space-x-2">
              <em class="opacity-75">Lager</em>
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
          <divs :class="`pe-2 ${smAndUp ? 'space-x-5' : undefined}`">
            <!-- product.edit -->
            <VBtn
              @click="toggleProductsEdit.on"
              :disabled="null == selectedProduct$"
              icon
              ><VIcon icon="$edit" size="large" />
              <VTooltip
                activator="parent"
                location="bottom"
                open-delay="345"
                text="Ažuriraj..."
              />
            </VBtn>
            <!-- product.images -->
            <LightboxProductImages :product="product_">
              <template #activator="{ onClick, disabled: disabled_ }">
                <VBtn
                  @click="onClick"
                  :disabled="!selectedProduct$ || disabled_"
                  rounded="circle"
                  icon
                  ><VIcon icon="$iconImages" size="large" />
                  <VTooltip
                    open-delay="345"
                    activator="parent"
                    location="bottom"
                    text="Pogledaj slike..."
                  />
                </VBtn>
              </template>
            </LightboxProductImages>
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
                text="Prikaži stranu..." />
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
                text="Osveži listu." />
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
              ><VIcon icon="$iconPlusCircle" :size="48" />
              <VTooltip
                activator="parent"
                text="Ulistaj nov proizvod..."
                open-delay="345"
                location="bottom"
              />
            </VBtn>
          </divs>
          <VSpacer v-if="!smAndUp" />
        </VToolbar>

        <!-- @@products:manage -->
        <VDataIterator
          :items="products$"
          :items-per-page="perPage"
          :page="pageLager$"
        >
          <template #no-data>
            <NoDataProducts />
          </template>

          <template #default="{ items: products }">
            <VListItem class="ps-1 !bg-stone-100 pa-0 ma-0">
              <small class="font-mono opacity-30">Ref#</small>
              <template #append>
                <small
                  class="min-w-[64px] text-center d-inline-flex flex-col items-center opacity-50 leading-tight pe-3"
                  :class="[!auth.isGold ? '-translate-x-1' : undefined]"
                  style="font-size: 72%"
                >
                  <span>ukupno</span>
                  <span>poručeno</span>
                </small>
                <small
                  v-if="auth.isGold"
                  class="min-w-[64px] text-center d-inline-flex flex-col items-center opacity-50 leading-tight pe-2"
                  style="font-size: 72%"
                >
                  <span>promo</span>
                  <span>proizvod</span>
                </small>
              </template>
            </VListItem>
            <VList
              border="t"
              class="!bg-stone-50 mt-0 pt-0 border-primary border-opacity-100"
              density="comfortable"
              lines="one"
              color="primary-lighten-1"
            >
              <VListItem
                v-for="node in products"
                :key="node.raw.id"
                @click="selectedProduct$ = node.raw.id"
                :active="node.raw.id == selectedProduct$"
                class="ps-0"
              >
                <template #prepend>
                  <small
                    style="font-size: 72%"
                    class="opacity-40 font-mono min-w-[36px] ps-[5px] align-baseline"
                  >
                    #{{ node.raw.id }}
                  </small>
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
                <VListItemTitle class="*bg-red">
                  {{ node.raw.name }}</VListItemTitle
                >
                <template #append>
                  <div class="d-flex items-center gap-5 opacity-75">
                    <ProvideProductRatingTopic
                      :product="node.raw"
                      v-slot="{ topic }"
                    >
                      <TopicRatingStatus class="scale-[91%]" :topic="topic" />
                    </ProvideProductRatingTopic>
                    <ProvideProductLikeDislikeTopic
                      :product="node.raw"
                      v-slot="{ topic: topic_ }"
                    >
                      <LikeDislikeStatus class="scale-[91%]" :topic="topic_" />
                    </ProvideProductLikeDislikeTopic>
                    <ProvideProductMessagesCount
                      :product="node.raw"
                      v-slot="{ count }"
                    >
                      <VBadge
                        color="primary3"
                        :content="count"
                        class="opacity-30 scale-[88%]"
                      >
                        <strong>💬</strong>
                      </VBadge>
                    </ProvideProductMessagesCount>
                    <ProvideProductsTotalAmountOrdered
                      :product="node.raw"
                      v-slot="{ amount }"
                    >
                      <!-- @@ -->
                      <small
                        class="ms-3 d-inline-block min-w-[68px] text-center"
                        :class="[!auth.isGold ? '!min-w-[58px]' : undefined]"
                      >
                        <strong
                          style="font-size: 92% !important"
                          class="text-body-2 !font-sans !font-bold"
                          >{{ amount }}</strong
                        >
                        <span class="ms-[2px] opacity-50">{{
                          node.raw.stockType
                        }}</span>
                      </small>
                    </ProvideProductsTotalAmountOrdered>
                    <!-- @@ -->
                    <VBtnTogglePackagesPromoted
                      class="me-1"
                      v-if="auth.isGold"
                      :product="node.raw"
                    />
                  </div>
                </template>
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
