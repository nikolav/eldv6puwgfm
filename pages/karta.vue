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
} from "@/components/app";
import { LightboxImages } from "@/components/ui";
import { Dump } from "@/components/dev";

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

// temp
// const data$ = computed(() =>
//   !isEmpty(companies.value) ? lsRepeat(first(companies.value), 12) : undefined
// );
// utils
const sampleImageSrc = (images: any) =>
  resourceUrl(get(sample(images), "data.file_id")) || DEFAULT_NO_IMAGE;
// map height
const containerMap = ref();
const { height: heightMap } = useElementSize(containerMap);

const ds$ = ref();
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
  <section class="page--karta">
    <VSheet max-width="912" class="mx-auto pa-2" elevation="1">
      <div class="grid grid-cols-[1fr,auto]">
        <!-- @@ -->
        <!-- proizvodjaci -->
        <div
          :style="`height: ${heightMap}px`"
          class="*bg-blue overflow-auto scrollbar-thin-light *border-t"
        >
          <VDataIterator
            v-model="companyActiveID$"
            :items="companies"
            :items-per-page="-1"
            :loading="lsLoading"
          >
            <!-- @@todo -->
            <template #no-data>
              <p>--no-data</p>
            </template>
            <template #default="{ items }">
              <VList class="space-y-2">
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
                    }"
                  >
                    <VListItem
                      @click="companyActiveID$ = node.raw.id"
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
                        <VListItemSubtitle class="ps-3 d-flex items-center">
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
                            :topic="topicCompanyRating.value"
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
            color-active="#e0b700"
            height="512"
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
              <VSheet height="177" width="211" class="px-[2px]">
                <VImg rounded class="fill-height" :src="DEFAULT_NO_IMAGE" />
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
                    <ProductImages :product="node.raw" v-slot="{ images }">
                      <VSlideGroupItem :value="node.raw.id">
                        <VHover open-delay="122" close-delay="122">
                          <template #default="{ props: props2, isHovering }">
                            <VSheet
                              height="177"
                              width="211"
                              class="px-[2px]"
                              v-bind="props2"
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
                                    height="175"
                                    width="209"
                                  >
                                    <NuxtLink
                                      :to="productPublicUrl"
                                      external
                                      target="_blank"
                                    >
                                      <VBtn icon variant="plain" color="white">
                                        <VIcon
                                          size="large"
                                          icon="$iconExternalLink"
                                        />
                                      </VBtn>
                                    </NuxtLink>
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

    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi autem
      officiis quo, vel reprehenderit ex tempora. Distinctio minima ducimus vel
      ut perspiciatis quidem. Corrupti ab odit dolores provident eum quis
      tenetur suscipit numquam. In, ad. Soluta accusamus delectus eos culpa quos
    </p>
  </section>
</template>
<style lang="scss" scoped>
</style>
