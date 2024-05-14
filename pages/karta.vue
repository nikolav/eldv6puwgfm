<script setup lang="ts">
import {
  SerbiaMapSVG,
  ProvideProfileDataFull,
  AvatarThumb,
  TopicRatingStatus,
  LikeDislikeStatus,
  TopicChat,
  ProductImages,
  AddToCartButtonPrimary,
  ProductPublicUrl,
  VChipDistrict,
  LightboxProductImages,
  HeaderProminent,
} from "@/components/app";
import { LightboxImages } from "@/components/ui";
// import { Dump } from "@/components/dev";

// const CARD_WIDTH = 912;
const MAP_HEIGHT = 512;
const PRODUCT_SLIDE_RATIO = 177 / 211;
const PRODUCT_SLIDE_SIZE = 211;

const PRODUCT_SLIDE_SIZE_h = PRODUCT_SLIDE_RATIO * 211;

definePageMeta({
  scrollToTop: false,
});

const {
  key: { MAP_DISTRICT_ACTIVE },
  app: { DEFAULT_NO_IMAGE },
} = useAppConfig();

const companyActiveID$ = ref();
const productActiveID$ = ref();
const mapDistrictActive$ = useGlobalVariable(MAP_DISTRICT_ACTIVE);
const district_ = computed(() => get(mapDistrictActive$.value, "search"));

const { companies, loading: lsLoading } = useQueryCompaniesList(district_);

const districtHovered$ = ref();
const companySelected_ = computed(() =>
  find(companies.value, { id: companyActiveID$.value })
);
const { profile: companySelectedProfile_ } = useProfileData(
  () => companyActiveID$.value
);
const comName = computed(() => companySelectedProfile_.value?.name || "");
const comAbout = computed(() => companySelectedProfile_.value?.about || "");
// utils
const sampleImageSrc = (images: any) =>
  resourceUrl(get(sample(images), "data.file_id")) || DEFAULT_NO_IMAGE;
// map height
const containerMap = ref();
const { height: heightMap } = useElementSize(containerMap);

watch(
  [() => get(mapDistrictActive$.value, "search"), companies],
  ([ds, cs]) => {
    if (!ds || isEmpty(cs)) return;
    companyActiveID$.value = first(cs)?.id;
  }
);
watch(
  () => companySelected_.value?.products,
  (lsp) => {
    if (isEmpty(lsp)) return;
    productActiveID$.value = first(lsp)?.id;
  }
);
// #eos
</script>
<template>
  <section class="page--karta pb-12">
    <VContainer class="ma-0 pa-0 mx-auto mt-5">
      <HeaderProminent
        text="Sve iz prve ruke od naših najboljih proizvođača i zanatljia"
        class="ps-12 mt-12"
      >
        <template #prepend>
          <VIcon
            class="ms-5 opacity-20"
            style="font-size: 7.56rem"
            icon="$iconFarmhouse"
          />
        </template>
      </HeaderProminent>
      <VRow class="ma-0 pa-0">
        <!-- @@md:right -->
        <VCol :order="2" :order-lg="1" lg="9" class="ma-0 pa-0">
          <div class="__placer__ max-w-[912px] mx-auto">
            <VSheet
              border="s-lg"
              position="relative"
              class="pa-2 border-primary border-opacity-75"
              elevation="1"
              color="transparent"
              id="bg-image--Vdet0JPdArzEvadh"
              rounded
            >
              <VChipDistrict
                v-if="districtHovered$?.search || district_"
                class="position-absolute top-1 end-1 z-[1]"
                :district="`Okrug: ${districtHovered$?.search || district_}`"
              />

              <div class="grid grid-cols-[1fr,auto]">
                <!-- @@ -->
                <!-- proizvodjaci -->
                <div
                  :style="`height: ${heightMap}px`"
                  class="overflow-auto scrollbar-thin-light *border-t"
                >
                  <VDataIterator
                    v-model="companyActiveID$"
                    :items="companies"
                    :items-per-page="-1"
                    :loading="lsLoading"
                  >
                    <!-- @@todo -->
                    <template #no-data>
                      <VCardText class="text-center pa-12 opacity-75"
                        >Trenutno nemamo podatke za ovaj okrug.</VCardText
                      >
                    </template>
                    <template #default="{ items }">
                      <VList class="space-y-2 bg-transparent">
                        <template v-for="node in items" :key="node.raw.id">
                          <ProvideProfileDataFull
                            :user="node.raw"
                            v-slot="{
                              companyName,
                              avatar,
                              ownerFullName,
                              companyPublicUrl,
                              photos,
                              topicCompanyRating,
                              topicCompanyChat,
                              topicCompanyLikes,
                            }"
                          >
                            <VListItem
                              @click="
                                () => {
                                  companyActiveID$ = node.raw.id;
                                }
                              "
                              :active="companyActiveID$ == node.raw.id"
                              active-color="primary-darken-2"
                              link
                              elevation="2"
                              class="!bg-stone-50 mx-2 pa-2"
                              rounded
                            >
                              <template #prepend>
                                <LightboxImages :images="photos.value">
                                  <template #activator="{ onClick, disabled }">
                                    <AvatarThumb
                                      :class="[
                                        disabled ? undefined : 'cursor-pointer',
                                        disabled
                                          ? undefined
                                          : 'hover:scale-[105%] transition-transform',
                                      ]"
                                      @click="onClick"
                                      :size="81"
                                      :force="avatar.value"
                                    />
                                  </template>
                                </LightboxImages>
                              </template>
                              <template #append>
                                <div class="pe-2 d-flex items-center gap-8">
                                  <strong>
                                    <VBadge
                                      v-if="!isEmpty(node.raw.products)"
                                      :offset-x="-5"
                                      location="end"
                                      color="accent1"
                                      :content="len(node.raw.products)"
                                      class="opacity-70"
                                    >
                                      <VIcon
                                        color="primary-darken-2"
                                        size="x-large"
                                        icon="$iconBoxes"
                                      />
                                      <VTooltip
                                        open-delay="345"
                                        location="bottom"
                                        activator="parent"
                                        text="Ukupno proizvoda na lageru"
                                      />
                                    </VBadge>
                                  </strong>
                                  <TopicChat
                                    class="scale-110"
                                    :topic="topicCompanyChat.value"
                                    :title="companyName.value"
                                    color="primary2-darken-1"
                                  />
                                </div>
                              </template>

                              <div class="h-[81px] ps-1">
                                <VListItemTitle class="ps-2">
                                  <!-- @@ -->
                                  <NuxtLink
                                    :to="companyPublicUrl.value"
                                    external
                                    target="_blank"
                                  >
                                    <a
                                      class="text-primary-darken-2 link--prominent-base d-inline-block w-full"
                                    >
                                      <h2 class="text-truncate">
                                        {{ companyName.value }}
                                      </h2>
                                    </a>
                                  </NuxtLink>
                                </VListItemTitle>
                                <VListItemSubtitle
                                  class="ps-3 d-flex items-center"
                                >
                                  <VIcon
                                    icon="$iconOwner"
                                    size="small"
                                    class="opacity-40"
                                  />
                                  <h4 class="ms-2">
                                    {{ ownerFullName.value }}
                                  </h4>
                                </VListItemSubtitle>
                                <small
                                  class="mt-3 ps-2 *scale-[88%] d-inline-flex items-center gap-6"
                                >
                                  <TopicRatingStatus
                                    :topic="topicCompanyRating.value"
                                  />
                                  <LikeDislikeStatus
                                    class="-translate-y-[2px]"
                                    :topic="topicCompanyLikes.value"
                                  />
                                </small>
                              </div>
                            </VListItem>
                          </ProvideProfileDataFull>
                        </template>
                      </VList>
                    </template>
                  </VDataIterator>
                </div>

                <!-- mapa .rs -->
                <div
                  ref="containerMap"
                  class="ma-0 pa-0 d-flex items-center justify-center ps-5"
                >
                  <SerbiaMapSVG
                    :height="MAP_HEIGHT"
                    base-color="#0F5359"
                    :base-opacity="0.78"
                    color-active="#e0b700"
                    @click:district="(d) => (mapDistrictActive$ = d)"
                    v-model:hover-district="districtHovered$"
                  />
                </div>

                <!-- lista proizvoda -->
                <div
                  class="*bg-stone-50 col-span-2 *bg-red min-h-[122px] *border-t pt-2"
                >
                  <VDataIterator
                    :items="companySelected_?.products || []"
                    :items-per-page="-1"
                  >
                    <template #no-data>
                      <VSheet
                        :height="PRODUCT_SLIDE_SIZE_h"
                        :width="PRODUCT_SLIDE_SIZE"
                        color="transparent"
                      >
                        <VImg
                          rounded
                          class="fill-height"
                          :src="DEFAULT_NO_IMAGE"
                        />
                      </VSheet>
                    </template>
                    <template #default="{ items }">
                      <VSlideGroup
                        center-active
                        show-arrows
                        v-model.number="productActiveID$"
                      >
                        <template v-for="node in items" :key="node.raw.id">
                          <ProductPublicUrl
                            :product="node.raw"
                            v-slot="{ url: productPublicUrl }"
                          >
                            <ProductImages
                              :product="node.raw"
                              v-slot="{ images }"
                            >
                              <VSlideGroupItem :value="node.raw.id">
                                <VHover open-delay="122" close-delay="122">
                                  <template
                                    #default="{ props: props2, isHovering }"
                                  >
                                    <VSheet
                                      :height="PRODUCT_SLIDE_SIZE_h"
                                      :width="PRODUCT_SLIDE_SIZE"
                                      class="px-[2px]"
                                      v-bind="props2"
                                      color="transparent"
                                    >
                                      <VImg
                                        @click="productActiveID$ = node.raw.id"
                                        rounded
                                        class="fill-height position-relative"
                                        :src="sampleImageSrc(images)"
                                        :alt="node.raw.name"
                                        cover
                                      >
                                        <span
                                          style="font-size: 92% !important"
                                          class="py-1 ps-2 text-body-1 text-white !font-sans bg-black/50 d-inline-block text-truncate w-full"
                                        >
                                          {{ node.raw.name }}
                                        </span>
                                        <VOverlay
                                          :model-value="isHovering"
                                          contained
                                          class="justify-center items-center"
                                        >
                                          <VSheet
                                            class="d-flex flex-col items-end pa-1"
                                            color="transparent"
                                            :height="PRODUCT_SLIDE_SIZE_h - 2"
                                            :width="PRODUCT_SLIDE_SIZE - 2"
                                          >
                                            <div>
                                              <LightboxProductImages
                                                :product="node.raw"
                                              >
                                                <template
                                                  #activator="{
                                                    onClick,
                                                    disabled,
                                                  }"
                                                >
                                                  <VBtn
                                                    :disabled="disabled"
                                                    @click="onClick"
                                                    icon
                                                    variant="plain"
                                                    color="white"
                                                  >
                                                    <VIcon
                                                      size="large"
                                                      icon="$iconImages"
                                                    />
                                                  </VBtn>
                                                </template>
                                              </LightboxProductImages>
                                              <NuxtLink
                                                :to="productPublicUrl"
                                                external
                                                target="_blank"
                                              >
                                                <VBtn
                                                  icon
                                                  variant="plain"
                                                  color="white"
                                                >
                                                  <VIcon
                                                    size="large"
                                                    icon="$iconExternalLink"
                                                  />
                                                </VBtn>
                                              </NuxtLink>
                                            </div>
                                            <VSpacer />
                                            <AddToCartButtonPrimary
                                              @click.stop
                                              :product-id="node.raw.id"
                                              :size="52"
                                            />
                                          </VSheet>
                                        </VOverlay>
                                      </VImg>
                                    </VSheet>
                                  </template>
                                </VHover>
                              </VSlideGroupItem>
                            </ProductImages>
                          </ProductPublicUrl>
                        </template>
                      </VSlideGroup>
                    </template>
                  </VDataIterator>
                </div>
              </div>
            </VSheet>
          </div>
        </VCol>
        <VCol
          :order="1"
          :order-lg="2"
          lg="3"
          class="ma-0 pa-0 ps-lg-2 pb-2 pb-lg-0"
        >
          <VCard
            class="!bg-stone-50 *fill-height"
            min-width="333"
            min-height="122"
          >
            <VCardItem>
              <VCardTitle>{{ comName }}</VCardTitle>
            </VCardItem>
            <VCardText>{{ comAbout }}</VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>

    <!-- story -->
  </section>
</template>
<style lang="scss" scoped>
#bg-image--Vdet0JPdArzEvadh {
  background: white url("~/assets/images/bg-serbia-04.png");
  background-size: cover;
}
</style>
