<script setup lang="ts">
// http://localhost:3000/proizvodi?slug=vestibulum-1-1
import { useDisplay } from "vuetify";
import type { IStorageFileInfo, ITopicChatMessage } from "@/types";
import { TOKEN_DEFAULT } from "@/config";

definePageMeta({
  layout: "blank",
});

const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  docs: { PRODUCT_IMAGES },
  key: { TOPIC_CHAT_PRODUCTS_prefix },
} = useAppConfig();

const { height: wHeight } = useDisplay();
const auth = useStoreApiAuth();
const route = useRoute();

const { runSetup: setupUserDefault } = useRunSetupOnce(() =>
  auth.tokenPut(TOKEN_DEFAULT)
);
watchEffect(() => {
  if (auth.initialized$ && !auth.token$) setupUserDefault();
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
const pid$ = computed(() => get(p$.value, "id"));
// get p.images
const { topic$: topicProductImages, data: productImages } =
  useDocs<IStorageFileInfo>();
watchEffect(() => {
  if (!pid$.value) return;
  topicProductImages.value = `${PRODUCT_IMAGES}${pid$.value}`;
});
const { publicUrl } = useApiStorage(true, true);
// get p.channel
const { topic$: topciProductChannel, data: chat } =
  useDocs<ITopicChatMessage>();
watchEffect(() => {
  if (!pid$.value) return;
  topciProductChannel.value = `${TOPIC_CHAT_PRODUCTS_prefix}${pid$.value}`;
});

// on images loaded: init carousel; run setup once
const imageFileIdCurrent = ref("");
const { runSetup: initCarousel } = useRunSetupOnce(() => {
  imageFileIdCurrent.value =
    get(sample(productImages.value), "data.file_id") || "";
});
watchEffect(() => {
  if (!isEmpty(productImages.value)) initCarousel();
});

const CAROUSEL_NAV_OFFSET = 42;
const carouselNav = ref();
const { height: carouselNavHeight } = useElementSize(carouselNav);
const carouselHeight = computed(
  () => wHeight.value - carouselNavHeight.value - CAROUSEL_NAV_OFFSET
);
// @@eos
</script>
<template>
  <section class="page--proizvodi fill-height ma-0 pa-0 *bg-red">
    <VContainer fluid class="bg-red ma-0 pa-0 fill-height">
      <VRow class="bg-lime ma-0 pa-0 fill-height" no-gutters>
        <!-- col.product:gallery -->
        <VCol cols="12" md="6" class="bg-blue-200 ma-0 pa-0">
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
                          class="overflow-hidden first:!ms-0 ms-2 cursor-pointer transition-opacity"
                          :class="
                            isHovering ||
                            imageFileIdCurrent == get(node, 'data.file_id')
                              ? 'opacity-100'
                              : 'opacity-70'
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
        <VCol cols="12" md="6" class="bg-green-200 ma-0 pa-0">2</VCol>
      </VRow>
    </VContainer>
    <!-- <VBtn :to="{ name: 'index' }">home</VBtn> -->
    <!-- <small>
      <pre>{{
        JSON.stringify(
          {
            carouselHeight,
            carouselNavHeight,
            imageFileIdCurrent,
            p$,
            productImages,
            chat,
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
</style>
