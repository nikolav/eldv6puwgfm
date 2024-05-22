<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { IUser, IOrder } from "@/types";
// import { Dump } from "@/components/dev";
import {
  LightboxProductImages,
  ProductPublicUrl,
  ProductsForOrderWithDetails,
  ProvideChatData,
  TopicRatingStatus,
  VChipProductCategory,
  VChipProductPrice,
  VChipProductPriceBase,
  WithComProfile,
  WithComPublicUrl,
  NoDataOrdersPlaced,
  WithProfileData,
  AvatarThumb,
} from "@/components/app";
import { VListItem } from "vuetify/lib/components/index.mjs";

const PRODUCTS_LIST_OFFSET_BOTTOM = 18;
definePageMeta({
  middleware: "authorized",
  layout: "user-profile",
});

// const route = useRoute();
const auth = useStoreApiAuth();
if (auth.isCompany$) setPageLayout("company-profile");

const {
  app: { DEFAULT_NO_IMAGE, DEFAULT_TRANSITION },
} = useAppConfig();

// refs, computes
const uid$ = computed(() => get(auth.user$, "id"));
const oid$ = ref();
const order_ = ref();
// order related items
const orderCompanies = ref(<IUser[]>[]);
const orderProducts = ref();
const orderTotal = ref();
const {
  companies: companiesForOrder,
  products: productsOnOrder,
  totalOriginal,
} = useQueryProductsOnOrderWithDetails(order_);
watchEffect(() => {
  orderCompanies.value = companiesForOrder.value;
  orderProducts.value = productsOnOrder.value;
  orderTotal.value = totalOriginal.value;
});
// ui
const boxProductsList = ref();

// utils
const { height: wheight } = useDisplay();
const { $formated_DMMMYYYY, $productPriceForOrder, $calcOrderTotalOriginal } =
  useNuxtApp();
const { ratingCompany, chatOrder: topicChatOnOrder, CHAT_MAIN } = useTopics();
const { top: boxProductsListTop } = useElementBounding(boxProductsList);
const topicChatMain = useGlobalVariable(CHAT_MAIN);

// stores
const { orders, reload: ordersReload } = useQueryOrdersByUser(uid$);
watchEffect(() => {
  order_.value = find(orders.value, { id: oid$.value });
});

// computes
const {
  length: paginationLength,
  page$,
  perPage,
} = usePaginateData({
  data: orders,
  perPage: 5,
});
const boxProductsListHeight = computed(
  () => wheight.value - boxProductsListTop.value - PRODUCTS_LIST_OFFSET_BOTTOM
);

// watches
onceMountedOn(true, () => nextTick(ordersReload));

onceMountedOn(
  () => 0 < orders.value?.length,
  () =>
    nextTick(() => {
      {
        if (0 < oid$.value) return;
        console.log(`@init:orderProducts`);
        // set latest o:id
        const oLatest = last(
          sortBy(orders.value, (node: IOrder) => new Date(node["created_at"]))
        );
        oid$.value = get(oLatest, "id");
      }
    })
);

const { savePdf, printPdf } = useSavePdf();

// #eos
</script>
<template>
  <section class="page--user-orders">
    <!-- hides scrollbars -->
    <Html class="overflow-hidden" />

    <div class="__placer__ *bg-red max-w-[912px] mx-auto mt-2 mt-sm-8">
      <!-- @@orders -->
      <VDataIterator
        v-model="oid$"
        :page="page$"
        :items="dataSortedByDateDesc(orders)"
        :items-per-page="perPage"
      >
        <template #no-data>
          <NoDataOrdersPlaced />
        </template>

        <!-- @@toolbar -->
        <template #header>
          <VCard
            v-if="!isEmpty(orders)"
            class="pa-2 d-flex items-center"
            rounded="pill"
            color="on-primary"
            elevation="1"
          >
            <!-- @@doesnt show orig price -->
            <!-- orderTotal -->
            <VChipProductPrice
              v-if="orderTotal"
              :price-only="
                priceFormatLocale(
                  $calcOrderTotalOriginal(order_, orderProducts)
                )
              "
            >
              <VTooltip
                text="Ukupna vrednost naručene robe"
                location="bottom"
                activator="parent"
                open-delay="222"
              />
            </VChipProductPrice>

            <!-- @@ -->
            <VBtn
              :disabled="isEmpty(companiesForOrder)"
              class="ms-12 -rotate-2"
              icon
              variant="text"
              density="comfortable"
              color="primary-darken-1"
            >
              <VIcon size="x-large" icon="$iconInvoice" />
              <VMenu
                activator="parent"
                location="end"
                open-on-click
                :transition="DEFAULT_TRANSITION"
                :close-on-content-click="false"
                :offset="[-48, 24]"
              >
                <template #default="{ isActive }">
                  <VCard rounded="t-lg" width="355" max-width="355">
                    <VCardItem
                      class="bg-primary-lighten-1 *d-flex *items-center"
                    >
                      <pre
                        style="font-size: 88%"
                        class="text-body-2 d-inline-flex me-5 opacity-30"
                      >
#{{ oid$ }}</pre
                      >
                      <em class="opacity-75">Gazdinstva:</em>
                      <template #append>
                        <VBtn
                          @click="isActive.value = false"
                          color="on-primary"
                          icon
                          variant="plain"
                          class="translate-x-2"
                          density="comfortable"
                        >
                          <VIcon icon="$close" />
                        </VBtn>
                      </template>
                    </VCardItem>
                    <div class="py-3">
                      <template v-for="com in companiesForOrder" :key="com.id">
                        <WithProfileData
                          :user-id="com.id"
                          v-slot="{ profile, avatar, publicUrl }"
                        >
                          <VListItem>
                            <template #prepend>
                              <AvatarThumb :force="avatar" />
                            </template>
                            <VListItemTitle class="ps-3">
                              <NuxtLink :to="publicUrl" target="_blank">
                                <a class="link--prominent-base text-primary">
                                  {{ profile?.name }}
                                </a>
                              </NuxtLink>
                            </VListItemTitle>
                            <template #append>
                              <VBtn
                                @click="
                                  () =>
                                    savePdf({
                                      filename: `#${oid$}:${profile?.name}.pdf`,
                                      data: {
                                        template: 'order-items',
                                        oid: oid$,
                                        uid: com.id,
                                      },
                                    })
                                "
                                color="primary"
                                icon
                                variant="text"
                                density="comfortable"
                              >
                                <VIcon icon="$iconFileDownload" />
                              </VBtn>
                              <VBtn
                                @click="
                                  () =>
                                    printPdf({
                                      data: {
                                        template: 'order-items',
                                        oid: oid$,
                                        uid: com.id,
                                      },
                                    })
                                "
                                color="primary"
                                icon
                                variant="text"
                                density="comfortable"
                                class="ms-3"
                              >
                                <VIcon icon="$iconPrint" />
                              </VBtn>
                            </template>
                          </VListItem>
                        </WithProfileData>
                      </template>
                    </div>
                  </VCard>
                </template>
              </VMenu>
              <VTooltip
                text="Fakture"
                location="bottom"
                activator="parent"
                open-delay="345"
              />
            </VBtn>

            <VSpacer />
            <VPagination
              v-if="1 < paginationLength"
              size="small"
              density="comfortable"
              v-model="page$"
              :length="paginationLength"
              :total-visible="6"
              variant="plain"
              active-color="primary"
              color="on-primary"
              rounded="circle"
            >
              <template #item="{ isActive, props, page }">
                <VBtn
                  v-bind="props"
                  rounded="circle"
                  variant="elevated"
                  :elevation="isActive ? 2 : 1"
                  density="comfortable"
                  icon
                  size="small"
                  ><span class="font-sans opacity-80">{{ page }}</span></VBtn
                >
              </template>
            </VPagination>
          </VCard>
        </template>

        <template #default="{ items }">
          <VContainer fluid>
            <VRow dense>
              <!-- @@col:left -->
              <VCol cols="7">
                <VCardTitle class="opacity-80 d-flex items-center ps-0">
                  <VIcon
                    class="opacity-40"
                    icon="$iconBasketFull"
                    size="x-large"
                  />
                  <h4 class="ms-4 translate-y-1">Naručena roba:</h4>
                </VCardTitle>
                <template v-if="0 < orderProducts?.length">
                  <VSheet
                    ref="boxProductsList"
                    border="t"
                    class="__placer__ py-2 ps-0 pe-1 scrollbar-thin-light overflow-auto space-y-2"
                    :height="boxProductsListHeight"
                  >
                    <!-- @@order:product:details --card -->
                    <template v-for="p in orderProducts" :key="p.id">
                      <VHover open-delay="222">
                        <template
                          #default="{ props: props_, isHovering: isHovering_ }"
                        >
                          <WithComProfile
                            :user-id="p.user.id"
                            v-slot="{ profile }"
                          >
                            <VSheet
                              v-bind="props_"
                              elevation="1"
                              rounded="lg2"
                              max-height="92"
                              height="92"
                              class="d-flex overflow-hidden !bg-slate-50"
                            >
                              <!-- @@image -->
                              <div class="fill-height">
                                <LightboxProductImages :product="p">
                                  <template
                                    #activator="{ onClick, images, disabled }"
                                  >
                                    <VHover open-delay="222">
                                      <template
                                        #default="{ props: props_, isHovering }"
                                      >
                                        <VImg
                                          v-bind="props_"
                                          cover
                                          width="116"
                                          class="fill-height cursor-pointer hover:scale-[102%] transition-transform"
                                          position="relative"
                                          @click="onClick"
                                          :src="
                                            !disabled
                                              ? resourceUrl(
                                                  get(
                                                    sample(images),
                                                    'data.file_id'
                                                  )
                                                )
                                              : DEFAULT_NO_IMAGE
                                          "
                                        >
                                          <VFadeTransition>
                                            <VIcon
                                              v-if="isHovering"
                                              class="opacity-50 z-[1] position-absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
                                              size="55"
                                              color="white"
                                              icon="$iconImages"
                                            />
                                          </VFadeTransition>
                                        </VImg>
                                      </template>
                                    </VHover>
                                  </template>
                                </LightboxProductImages>
                              </div>
                              <!-- @@details:body -->
                              <div class="*bg-red grow ps-3 pt-1">
                                <h2 class="w-full text-truncate">
                                  <ProductPublicUrl
                                    :product="p"
                                    v-slot="{ url }"
                                  >
                                    <NuxtLink
                                      :to="url"
                                      external
                                      target="_blank"
                                    >
                                      <a
                                        class="text-primary link--prominent-base"
                                      >
                                        {{ p?.name || "" }}
                                      </a>
                                    </NuxtLink>
                                  </ProductPublicUrl>
                                </h2>
                                <div
                                  class="__placer__ ms-n2 d-flex items-center"
                                >
                                  <VChipProductCategory
                                    class="scale-[92%]"
                                    :product="p"
                                  />
                                  <VChipProductPriceBase
                                    class="opacity-90 scale-[92%] ms-n1"
                                    size="x-small"
                                    :price-only="
                                      $productPriceForOrder(order_, p) || 0
                                    "
                                  >
                                    <template #append>
                                      <small>/{{ p?.stockType }}</small>
                                    </template>
                                  </VChipProductPriceBase>
                                </div>
                                <div class="pt-3">
                                  <small
                                    class="scale-[95%] d-inline-flex items-center gap-2"
                                  >
                                    <VIcon
                                      class="opacity-30"
                                      size="small"
                                      icon="$iconDowntown"
                                    />
                                    <!-- @@ -->
                                    <TopicRatingStatus
                                      size="x-small"
                                      :topic="ratingCompany(p.user.id)"
                                    />
                                    <WithComPublicUrl
                                      :company-id="p.user.id"
                                      :company-name="profile?.name"
                                      v-slot="{ companyUrl }"
                                    >
                                      <NuxtLink
                                        :to="companyUrl"
                                        external
                                        target="_blank"
                                      >
                                        <a
                                          class="text-primary link--prominent-base"
                                        >
                                          {{ profile?.name || "" }}
                                        </a>
                                        <VIcon
                                          size="x-small"
                                          class="-translate-y-px ms-1 opacity-40"
                                          icon="$iconExternalLink"
                                        />
                                      </NuxtLink>
                                    </WithComPublicUrl>
                                  </small>
                                </div>
                              </div>
                              <div
                                class="pa-0 fill-height *min-w-[92px] *bg-primary3 d-flex flex-col items-end"
                              >
                                <!-- @@btn:chat -->
                                <ProvideChatData
                                  :topic="
                                    topicChatOnOrder(
                                      order_?.id,
                                      p.user.id,
                                      uid$
                                    )
                                  "
                                  v-slot="{ length: currentChatLength }"
                                >
                                  <VBtn
                                    @click="
                                      topicChatMain = topicChatOnOrder(
                                        order_?.id,
                                        p.user.id,
                                        uid$
                                      )
                                    "
                                    class="ma-1 z-[1] transition-opacity"
                                    :class="
                                      isHovering_ ? 'opacity-100' : 'opacity-40'
                                    "
                                    density="comfortable"
                                    icon
                                    variant="text"
                                  >
                                    <VBadge
                                      :model-value="0 < currentChatLength"
                                      :content="currentChatLength"
                                      color="primary3"
                                      location="top start"
                                      :offset-y="5"
                                    >
                                      <VIcon :size="28" icon="$iconChatDots" />
                                    </VBadge>
                                    <VTooltip
                                      text="Poruka prodavcu..."
                                      activator="parent"
                                      open-delay="345"
                                      location="bottom"
                                    />
                                  </VBtn>
                                </ProvideChatData>

                                <VSpacer />
                                <div
                                  style="font-size: 88%"
                                  class="opacity-95 scale-[87%] text-end pa-0 font-sans"
                                >
                                  <p>
                                    <strong
                                      >{{ p?.amount
                                      }}<span
                                        class="opacity-40 translate-x-[2px] d-inline-block"
                                        >{{ p?.stockType }}</span
                                      ></strong
                                    >
                                  </p>
                                  <p>
                                    <strong>
                                      {{
                                        priceFormatLocale(
                                          $calcOrderTotalOriginal(order_, [p])
                                        )
                                      }}<span
                                        class="opacity-40 translate-x-[2px] d-inline-block"
                                        >RSD</span
                                      >
                                    </strong>
                                  </p>
                                </div>
                              </div>
                            </VSheet>
                          </WithComProfile>
                        </template>
                      </VHover>
                    </template>
                  </VSheet>
                </template>
              </VCol>

              <!-- @@col:right -->
              <VCol cols="5" class="pa-0 px-2">
                <VCard min-height="240" rounded="lg" elevation="2">
                  <VCardTitle class="bg-primary d-flex items-center">
                    <span class="opacity-40">Moje narudžbe:</span>
                    <VBadge
                      class="scale-[88%] d-inline-block opacity-80 ms-1"
                      color="primary-lighten-2"
                      inline
                      :content="orders.length"
                    />
                    <VSpacer />
                    <VBtn
                      @click="ordersReload"
                      density="comfortable"
                      color="on-primary"
                      icon
                      variant="plain"
                      class="*ms-auto"
                    >
                      <VIcon icon="$loading" />
                      <VTooltip
                        location="bottom"
                        text="Osveži listu"
                        open-delay="345"
                        activator="parent"
                      />
                    </VBtn>
                  </VCardTitle>
                  <!-- @@orders:list:right -->
                  <VList mandatory class="py-0" density="compact">
                    <template v-for="node in items" :key="node.raw.id">
                      <!-- v-model="op$[node.raw.id]" -->
                      <ProductsForOrderWithDetails
                        :order="find(orders, { id: node.raw.id })"
                        v-slot="{ total, products }"
                      >
                        <!-- orderProducts = products;
                      orderCompanies = companies;
                      orderTotal = total; -->
                        <VListItem
                          color="primary"
                          :active="oid$ == node.raw.id"
                          @click="
                            () => {
                              oid$ = node.raw.id;
                            }
                          "
                          class="ps-3 pe-1"
                        >
                          <template #append>
                            <small>
                              <VBadge
                                :model-value="!!products?.length"
                                :content="products.length"
                                inline
                                color="primary3"
                                class="opacity-50 scale-75 font-mono"
                              />
                            </small>
                          </template>
                          <template #prepend>
                            <span class="d-inline-flex w-[72px] items-center">
                              <small style="font-size: 71%" class="opacity-50"
                                >#{{ node.raw.id }}</small
                              >
                              <VSpacer />
                              <VCheckboxBtn
                                readonly
                                class="scale-[111%]"
                                true-icon="$iconCheckboxOn"
                                false-icon="$iconCheckboxOff"
                                :model-value="oid$ == node.raw.id"
                              />
                            </span>
                          </template>
                          <div
                            class="d-flex items-center ps-1"
                            :class="
                              oid$ == node.raw.id ? 'opacity-100' : 'opacity-50'
                            "
                          >
                            <small class="d-inline-block ms-[2px]">{{
                              $formated_DMMMYYYY(node.raw.created_at)
                            }}</small>
                            <VSpacer />
                            <em class="me-1" style="font-size: 75%"
                              >{{ priceFormatLocale(total) }} RSD</em
                            >
                          </div>
                        </VListItem>
                      </ProductsForOrderWithDetails>
                    </template>
                  </VList>
                </VCard>
              </VCol>
            </VRow>
          </VContainer>
        </template>
      </VDataIterator>
    </div>
  </section>
</template>
<style lang="scss" scoped></style>
