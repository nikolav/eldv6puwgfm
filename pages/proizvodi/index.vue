<script setup lang="ts">
// http://localhost:3000/proizvodi?slug=vestibulum-1-1
import { useDisplay } from "vuetify";
import type { IStorageFileInfo } from "@/types";
import { TOKEN_DEFAULT } from "@/config";
import { TopicRating, LikeDislike, TopicChat } from "@/components/app";

definePageMeta({
  layout: "blank",
});

const {
  layout: { CAROUSEL_NAV_OFFSET_product_page },
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  docs: { PRODUCT_IMAGES },
  key: {
    TOPIC_CHAT_PRODUCTS_prefix,
    PRODUCT_RATING_prefix,
    PRODUCTS_LIKES_prefix,
  },
  products: { categories: pCategories },
} = useAppConfig();

const { height: wHeight, mdAndUp } = useDisplay();
const auth = useStoreApiAuth();
const route = useRoute();

const { runSetup: setupUserDefault } = useRunSetupOnce(() =>
  auth.tokenPut(TOKEN_DEFAULT)
);
watchEffect(() => {
  if (auth.initialized$ && !auth.isAuth$) setupUserDefault();
});
const pid = computed(() =>
  Number(last(String(get(route.query, "slug")).split("-")))
);
// query products by ids: ID[]
const { products, products$ } = useQueryProductsOnly();
watchEffect(() => {
  if (!(0 < pid.value)) return;
  products.value = [pid.value];
});
// get product
const p$ = computed(() =>
  !isEmpty(products$) ? first(products$.value) : undefined
);
const com$ = computed(() => get(p$.value, "user"));
const pid$ = computed(() => get(p$.value, "id"));
const pCategory$ = computed(() =>
  get(find(pCategories, { value: get(p$.value, "tags[0]") }), "title")
);
// get p.images
const { topic$: topicProductImages, data: productImages } =
  useDocs<IStorageFileInfo>();
watchEffect(() => {
  if (!pid$.value) return;
  topicProductImages.value = `${PRODUCT_IMAGES}${pid$.value}`;
});
const { publicUrl } = useApiStorage(true, true);

// on images loaded: init carousel; run setup once
const imageFileIdCurrent = ref("");
const { runSetup: initCarousel } = useRunSetupOnce(() => {
  imageFileIdCurrent.value =
    get(sample(productImages.value), "data.file_id") || "";
});
watchEffect(() => {
  if (!isEmpty(productImages.value)) initCarousel();
});

const carouselNav = ref();
const { height: carouselNavHeight } = useElementSize(carouselNav);
const carouselHeight = computed(
  () =>
    wHeight.value - carouselNavHeight.value - CAROUSEL_NAV_OFFSET_product_page
);
// @@eos
</script>
<template>
  <section class="page--proizvodi fill-height ma-0 pa-0 *bg-red">
    <VContainer fluid class="*bg-red ma-0 pa-0 fill-height">
      <VRow class="*bg-lime ma-0 pa-0 fill-height" no-gutters>
        <!-- col.product:gallery -->
        <VCol cols="12" md="6" class="*bg-blue-200 ma-0 pa-0">
          <VHover>
            <template #default="{ isHovering, props: props_ }">
              <!-- image gallery .left -->
              <VSheet class="ma-2 overflow-hidden" rounded>
                <VImg
                  :height="carouselHeight"
                  :src="DEFAULT_NO_PRODUCT_IMAGE_FOUND"
                  v-if="isEmpty(productImages)"
                />
                <VCarousel
                  v-else
                  :height="carouselHeight"
                  v-model="imageFileIdCurrent"
                  v-bind="props_"
                  continuous
                  mandatory
                  hide-delimiters
                  show-arrows="hover"
                  :cycle="!isHovering"
                  :interval="8901"
                >
                  <VCarouselItem
                    cover
                    v-for="node in productImages"
                    :key="node.id"
                    :src="publicUrl(get(node, 'data.file_id'))"
                    :value="get(node, 'data.file_id')"
                  />
                </VCarousel>
              </VSheet>
              <div ref="carouselNav" class="mx-2 overflow-hidden pa-2">
                <VSlideGroup
                  v-if="productImages.length"
                  show-arrows
                  mandatory
                  v-model="imageFileIdCurrent"
                  center-active
                >
                  <VSlideGroupItem
                    v-for="node in productImages"
                    :key="node.id"
                    :value="get(node, 'data.file_id')"
                  >
                    <VHover>
                      <template #default="{ isHovering, props: props_ }">
                        <VSheet
                          v-bind="props_"
                          width="92"
                          height="92"
                          rounded
                          class="overflow-hidden first:!ms-0 ms-2 cursor-pointer transition"
                          :class="
                            isHovering ||
                            imageFileIdCurrent == get(node, 'data.file_id')
                              ? 'opacity-100 scale-105'
                              : 'opacity-70 scale-100'
                          "
                        >
                          <VImg
                            class="w-full h-full"
                            cover
                            @click.stop="
                              imageFileIdCurrent = get(node, 'data.file_id')
                            "
                            :src="publicUrl(get(node, 'data.file_id'))"
                          />
                        </VSheet>
                      </template>
                    </VHover>
                  </VSlideGroupItem>
                </VSlideGroup>
              </div>
            </template>
          </VHover>
        </VCol>
        <!-- col.product:data -->
        <VCol
          cols="12"
          md="6"
          class="*bg-green-200 ma-0 pa-0"
        >
          <!-- @btn:links prodavac, korpa -->
          <Teleport to="body">
            <div
              class="position-fixed z-[9999] *bg-red w-full d-flex"
              :class="mdAndUp ? 'bottom-12 *bg-lime w-1/2 end-0' : 'top-4'"
            >
              <VSpacer />
              <VBtn rounded="circle" color="white" size="122" elevation="5">
                <VAvatar
                  image="https://nikolav.rs/nikolav.me.0.jpg"
                  size="120"
                />
                <VTooltip location="end" open-delay="345" activator="parent">
                  <em>Proizvođač</em>
                  <VIcon
                    class="-translate-y-[2px] opacity-40"
                    icon="$iconExternalLink"
                    end
                    size="large"
                  />
                </VTooltip>
              </VBtn>
              <VSpacer />
              <VSpacer />
              <VBtn
                icon
                rounded="circle"
                color="white"
                size="122"
                elevation="5"
              >
                <VIcon icon="$iconKorpaKantar" size="120" />
              </VBtn>
              <VSpacer />
            </div>
          </Teleport>
          <div class="d-flex items-center justify-between px-1 pe-4 *mb-4">
            <TopicRating text :topic="`${PRODUCT_RATING_prefix}${pid$}`" />
            <TopicChat
              class="ms-auto"
              :title="p$?.name"
              :topic="`${TOPIC_CHAT_PRODUCTS_prefix}${pid$}`"
            />
            <LikeDislike
              class="ms-[1.22rem]"
              :topic="`${PRODUCTS_LIKES_prefix}${pid$}`"
            />
          </div>
          <div class="px-2 mt-6">
            <div class="d-flex items-center pe-2">
              <VChip size="small" v-if="pCategory$">
                <template #prepend>
                  <VIcon
                    size="small"
                    start
                    icon="$IconFolderFilled"
                    class="!opacity-40 ps-[2px]"
                  />
                </template>
                <small class="*text-medium-emphasis">{{ pCategory$ }}</small>
              </VChip>
              <VChip size="small" class="ms-6">
                <template #prepend>
                  <VIcon
                    size="x-large"
                    start
                    icon="$iconBattery"
                    class="!opacity-40 ps-1"
                  />
                </template>
                <small class="text-medium-emphasis">Zaliha</small>
                <strong class="font--bold ms-1 tracking-wider"
                  >{{ p$?.stock }}{{ p$?.stockType }}</strong
                >
              </VChip>
              <VSpacer />
              <VChip
                size="x-large"
                color="primary3-darken-1"
                variant="elevated"
              >
                <template #prepend>
                  <VIcon
                    start
                    icon="$iconRSD"
                    class="!opacity-40 ps-[5px] translate-y-[2px]"
                    size="large"
                  />
                </template>
                <span class="align-bottom">
                  <strong class="text-[112%]">{{ p$?.price }}</strong
                  ><small class="ms-[4px] text-medium-emphasis"
                    >/{{ p$?.stockType }}</small
                  >
                </span>
              </VChip>
            </div>
            <h1 class="text-truncate !font-sans text-h4 font-weight-bold mt-4">
              {{ p$?.name }}
            </h1>
            <VDivider thickness="2" class="border-opacity-50" />
            <VSheet
              class="mx-auto pa-4 overflow-auto scrollbar-thin-light indent-2 sm:prose"
            >
              <p class="!max-h-[211px]">{{ p$?.description }}</p>
            </VSheet>
          </div>
        </VCol>
      </VRow>
    </VContainer>
    <!-- <VBtn :to="{ name: 'index' }">home</VBtn> -->
    <!-- <small>
      <pre>{{
        JSON.stringify(
          {
            com$,
            pCategory$,
            p$,
            productImages,
            query: route.query,
          },
          null,
          2
        )
      }}</pre>
    </small> -->
  </section>
</template>
<style lang="scss" scoped>
.font--bold {
  font-weight: bold !important;
}
</style>
