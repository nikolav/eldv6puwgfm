<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { ICompanyProfile, IStorageFileInfo } from "@/types";
import { TOKEN_DEFAULT } from "@/config";
import {
  TopicRating,
  LikeDislike,
  TopicChat,
  GoogleCalendarIframe,
} from "@/components/app";

definePageMeta({
  layout: "blank",
});

const { smAndUp, height: wHeight } = useDisplay();

const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND, DEFAULT_TRANSITION },
  docs: { TAG_COMPANY_PROFILE_prefix, COM_PHOTOS_prefix },
  key: { COM_LIKES_prefix, TOPIC_CHAT_COM_prefix, COM_RATING_prefix },
  urls: { QUERY },
  layout: { CAROUSEL_NAV_OFFSET_product_page },
} = useAppConfig();

const auth = useStoreApiAuth();
const route = useRoute();

const { runSetup: setupUserDefault } = useRunSetupOnce(() =>
  auth.tokenPut(TOKEN_DEFAULT)
);
watchEffect(() => {
  if (auth.initialized$ && !auth.isAuth$) setupUserDefault();
});

const uid_ = Number(last(String(get(route.query, QUERY)).split("-")));
const { user: comUser } = useQueryUsersSingle(uid_);
const { data: comProfile } = useDoc<ICompanyProfile>(
  `${TAG_COMPANY_PROFILE_prefix}${uid_}`
);
// const products = computed(() => get(comUser.value, "products") || []);
const { data: comPhotos } = useDocs<IStorageFileInfo>(
  `${COM_PHOTOS_prefix}${uid_}`
);
const { publicUrl } = useApiStorage(true, true);

// on images loaded: init carousel; run setup once
const imageFileIdCurrent = ref("");
const { runSetup: initCarousel } = useRunSetupOnce(() => {
  imageFileIdCurrent.value = get(sample(comPhotos.value), "data.file_id") || "";
});
watchEffect(() => {
  if (!isEmpty(comPhotos.value)) initCarousel();
});

const carouselNav = ref();
const { height: carouselNavHeight } = useElementSize(carouselNav);
const carouselHeight = computed(
  () =>
    wHeight.value - carouselNavHeight.value - CAROUSEL_NAV_OFFSET_product_page
);

const pageTitle = computed(() =>
  startCase(get(comProfile.value, "data.name") || "")
);
useHead({
  title: pageTitle,
});
const comName_ = computed(() => get(comProfile.value, "data.name"));
// const comOwner_ = computed(
//   () =>
//     `${get(comProfile.value, "data.ownerFirstName")} ${get(
//       comProfile.value,
//       "data.ownerLastName"
//     )}`
// );
// const comAbout_ = computed(() => get(comProfile.value, "data.about"));
// const comDeliver_ = computed(() => get(comProfile.value, "data.delivery"));
// const comPin_ = computed(() => get(comProfile.value, "data.pin"));
// const comTel_ = computed(() => get(comProfile.value, "data.phone"));
// const comAddress_ = computed(() => get(comProfile.value, "data.address"));
// const comDistrict_ = computed(() => get(comProfile.value, "data.district"));

const googleCalendarIframe = ref();
const { width: googleCalendarIframeWidth } =
  useElementSize(googleCalendarIframe);
// @@eos
</script>
<template>
  <section class="page--gazdinstvo:q fill-height pa-0 ma-0">
    <VContainer fluid class="*bg-red ma-0 pa-0 fill-height">
      <VRow class="*bg-lime ma-0 pa-0 fill-height" no-gutters>
        <!-- col.product:data -->
        <VCol cols="12" md="6" class="*bg-green-200 ma-0 pa-0">
          <!-- @row:1 social, rating, calendar -->
          <div class="d-flex items-center justify-between px-1 pe-4 *mb-4">
            <TopicRating
              :small="!smAndUp ? true : undefined"
              text
              :topic="`${COM_RATING_prefix}${uid_}`"
            />
            <TopicChat
              class="ms-auto"
              :title="comName_"
              :topic="`${TOPIC_CHAT_COM_prefix}${uid_}`"
            />
            <LikeDislike
              class="ms-[1.22rem]"
              :topic="`${COM_LIKES_prefix}${uid_}`"
            />
            <VBtn
              elevation="2"
              variant="elevated"
              color="primary-lighten-1"
              icon
              rounded="circle"
              size="42"
              class="ms-[1.22rem]"
            >
              <VTooltip
                activator="parent"
                location="bottom"
                open-delay="345"
                text="Naš raspored događanja..."
              />
              <VAvatar color="primary-lighten-1" style="font-size: 1.22rem"
                ><strong class="-translate-y-px">📆</strong></VAvatar
              >
              <VMenu
                activator="parent"
                :close-on-content-click="false"
                :transition="DEFAULT_TRANSITION"
                location="center"
              >
                <VSheet :width="googleCalendarIframeWidth + 16" class="pa-2">
                  <GoogleCalendarIframe ref="googleCalendarIframe" />
                </VSheet>
              </VMenu>
            </VBtn>
          </div>
          <!-- @row:2 -->
          <div class="px-2 mt-6">
            <h1>{{ comName_ }}</h1>
          </div>
        </VCol>

        <!-- col.product:gallery -->
        <VCol cols="12" md="6" class="*bg-blue-200 ma-0 pa-0">
          <VHover>
            <template #default="{ isHovering, props: props_ }">
              <!-- image gallery .left -->
              <VSheet class="ma-2 overflow-hidden" rounded>
                <VImg
                  :height="carouselHeight"
                  :src="DEFAULT_NO_PRODUCT_IMAGE_FOUND"
                  v-if="isEmpty(comPhotos)"
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
                    v-for="node in comPhotos"
                    :key="node.id"
                    :src="publicUrl(get(node, 'data.file_id'))"
                    :value="get(node, 'data.file_id')"
                  />
                </VCarousel>
              </VSheet>
              <div ref="carouselNav" class="mx-2 overflow-hidden pa-2">
                <VSlideGroup
                  v-if="comPhotos.length"
                  show-arrows
                  mandatory
                  v-model="imageFileIdCurrent"
                  center-active
                >
                  <VSlideGroupItem
                    v-for="node in comPhotos"
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
      </VRow>
    </VContainer>
  </section>
</template>
<style lang="scss" scoped>
</style>
