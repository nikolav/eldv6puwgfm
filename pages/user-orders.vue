<script setup lang="ts">
import { useDisplay } from "vuetify";
import { Dump } from "@/components/dev";
import {
  ProductsForOrderWithDetails,
  LightboxProductImages,
  ProductPublicUrl,
  VChipProductCategory,
  TopicRatingStatus,
  WithComProfile,
  WithComPublicUrl,
  VChipProductPrice,
  VChipProductPriceBase,
  ChatControllsBasic,
  TopicChatButtonBase,
  ChatRenderSimpleList,
} from "@/components/app";

const PRODUCTS_LIST_OFFSET_BOTTOM = 18;
definePageMeta({
  layout: "user-profile",
  middleware: "authorized",
});

const {
  app: { DEFAULT_NO_IMAGE },
} = useAppConfig();
const auth = useStoreApiAuth();

// computes, refs
const uid$ = computed(() => get(auth.user$, "id"));
const oid$ = ref();
const orderCompanies = ref();
const orderProducts = ref();
const orderTotal = ref();
const boxProductsList = ref();

// utils
const { height: wheight } = useDisplay();
const { $formated_DMMMYYYY, $productPriceForOrder, $calcOrderTotalOriginal } =
  useNuxtApp();
const { ratingCompany } = useTopics();
const { top: boxProductsListTop } = useElementBounding(boxProductsList);

const boxProductsListHeight = computed(
  () => wheight.value - boxProductsListTop.value - PRODUCTS_LIST_OFFSET_BOTTOM
);

// stores
const { orders, reload: ordersReload } = useQueryOrdersByUser(uid$);
const {
  length: paginationLength,
  page$,
  perPage,
} = usePaginateData({
  data: orders,
  perPage: 5,
});

const order_ = computed(() => find(orders.value, { id: oid$.value }));
const toggleOrdersChat = useToggleFlag();
// #eos
</script>
 <template>
  <section class="page--user-orders">
    <VBtn @click="toggleOrdersChat"> ok </VBtn>
    <!-- <Dump :data="{ chat$ }" /> -->
    <VNavigationDrawer
      order="-1"
      location="right"
      width="420"
      v-model="toggleOrdersChat.isActive.value"
      elevation="3"
      temporary
    >
      <VSheet class="__placer__ pa-2 bg-red">
        <TopicChatButtonBase
          topic="demo233"
          :is-active="toggleOrdersChat.isActive.value"
        />
        <!-- <ChatRenderSimpleList :chat="chat$" :remove="noop" /> -->
      </VSheet>
    </VNavigationDrawer>

    <!-- hides scrollbars -->
    <Html class="overflow-hidden" />
    <!-- <Dump :data="{ orderCompanies }" /> -->
    <div class="__placer__ *bg-red max-w-[912px] mx-auto mt-2 mt-sm-8">
      <!-- @@orders -->
      <VDataIterator
        v-model="oid$"
        :page="page$"
        :items="dataSortedByDateDesc(orders)"
        :items-per-page="perPage"
      >
        <!-- @@toolbar -->
        <template #header>
          <VCard
            class="pa-2 d-flex items-center"
            rounded="pill"
            color="on-primary"
            elevation="1"
          >
            <VChipProductPrice
              v-if="orderTotal"
              :price-only="priceFormatLocale(orderTotal)"
            >
              <VTooltip
                text="Ukupna vrednost naručene robe"
                location="bottom"
                activator="parent"
                open-delay="222"
              />
            </VChipProductPrice>
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
                <VCardTitle class="opacity-80">
                  <h4>Naručena roba:</h4>
                </VCardTitle>
                <template v-if="0 < orderProducts?.length">
                  <VSheet
                    ref="boxProductsList"
                    border="t"
                    class="__placer__ py-2 ps-0 pe-1 scrollbar-thin-light overflow-auto space-y-2"
                    :height="boxProductsListHeight"
                  >
                    <!-- @@order:product:details -->
                    <VSheet
                      elevation="1"
                      rounded="lg2"
                      max-height="92"
                      height="92"
                      v-for="p in orderProducts"
                      :key="p.id"
                      class="d-flex overflow-hidden !bg-slate-50"
                    >
                      <!-- @@image -->
                      <div class="fill-height">
                        <LightboxProductImages :product="p">
                          <template #activator="{ onClick, images, disabled }">
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
                                          get(sample(images), 'data.file_id')
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
                          <ProductPublicUrl :product="p" v-slot="{ url }">
                            <NuxtLink :to="url" external target="_blank">
                              <a class="text-primary link--prominent-base">
                                {{ p?.name || "" }}
                              </a>
                            </NuxtLink>
                          </ProductPublicUrl>
                        </h2>
                        <div class="__placer__ ms-n2 d-flex items-center">
                          <VChipProductCategory
                            class="scale-[92%]"
                            :product="p"
                          />
                          <VChipProductPriceBase
                            class="opacity-90 scale-[92%] ms-n1"
                            size="x-small"
                            :price-only="$productPriceForOrder(order_, p) || 0"
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
                            <WithComProfile
                              :user-id="p.user.id"
                              v-slot="{ profile }"
                            >
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
                                  <a class="text-primary link--prominent-base">
                                    {{ profile?.name || "" }}
                                  </a>
                                  <VIcon
                                    size="x-small"
                                    class="-translate-y-px ms-1 opacity-40"
                                    icon="$iconExternalLink"
                                  />
                                </NuxtLink>
                              </WithComPublicUrl>
                            </WithComProfile>
                          </small>
                        </div>
                      </div>
                      <div
                        class="pa-0 fill-height *min-w-[92px] *bg-primary3 d-flex flex-col items-end"
                      >
                        <span>FOO</span>

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
                      <ProductsForOrderWithDetails
                        :order="find(orders, { id: node.raw.id })"
                        v-slot="{ total, companies, products }"
                      >
                        <VListItem
                          color="primary"
                          :active="oid$ == node.raw.id"
                          @click="
                            () => {
                              oid$ = node.raw.id;
                              orderProducts = products;
                              orderCompanies = companies;
                              orderTotal = total;
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
 <style lang="scss" scoped>
</style>
