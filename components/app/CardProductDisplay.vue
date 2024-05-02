<script setup lang="ts">
// init
import { mergeProps } from "vue";
import type { IProduct, IStorageFileInfo } from "@/types";
import {
  LikeDislike,
  TopicChat,
  GetCategoryTitleFromTag,
  VChipProductPrice,
  CardProductDisplayToolbarSocial,
  TopicRating,
} from "@/components/app";
const props = defineProps<{ product: IProduct }>();
const emit = defineEmits<{
  (e: "productPhotosChange"): void;
}>();

// defs
const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND, DEFAULT_NO_IMAGE },
  docs: { PRODUCT_IMAGES },
  key: { PRODUCT_RATING_prefix },
} = useAppConfig();

// stores
const { data: docsImages$ } = useDocs<IStorageFileInfo>(
  `${PRODUCT_IMAGES}${props.product.id}`
);
const { publicUrl } = useApiStorage(true, true);
watch(docsImages$, () => emit("productPhotosChange"));

const uid = computed(() => props.product.user_id);
const { profile, companyPublicUrl: companyUrl } = useUserData(uid);

const productImageSrcSample$ = computed(() =>
  isEmpty(docsImages$.value)
    ? DEFAULT_NO_PRODUCT_IMAGE_FOUND
    : publicUrl(get(sample(docsImages$.value), "data.file_id"))
);
const productPublicUrl_ = useProductPublicUrl(
  () => props.product?.id,
  props.product?.name
);
// @@
const avatarUrl = computed(
   () => publicUrl(get(profile.value, "avatar.data.file_id")) || DEFAULT_NO_IMAGE
);

const cart = useStoreCart();
// @@eos
</script>
<template>
  <section class="component--CardProductDisplay">
    <VHover open-delay="567">
      <template #default="{ isHovering, props: props_ }">
        <VCard
          v-bind="mergeProps($attrs, props_)"
          rounded="lg"
          variant="elevated"
          :elevation="isHovering ? 4 : 2"
          class="pa-0"
        >
          <VToolbar
            density="compact"
            elevation="2"
            :class="isHovering ? '!visible' : ''"
            class="top-0 inset-x-0 z-10 invisible"
            color="#f5f5f480"
            absolute
          >
            <VToolbarTitle> @@ </VToolbarTitle>

            <CardProductDisplayToolbarSocial :product="props.product" />
          </VToolbar>
          <VImg
            max-height="320"
            :aspect-ratio="1"
            cover
            :src="productImageSrcSample$"
            class="position-relative"
          >
            <!-- PDisplay:toolbar -->
          </VImg>
          <!-- content:div -->
          <div class="ma-0 pa-0 w-full *bg-red position-relative">
            <!-- avatar:link -->
            <NuxtLink :to="companyUrl" external target="_blank">
              <VBtn
                rounded="circle"
                class="end-[17px] top-[-66px] position-absolute z-[1]"
                size="101"
                icon
                color="white"
                elevation="5"
                variant="tonal"
              >
                <!-- @@avatar -->
                <VAvatar color="white" size="97" :image="avatarUrl" />
                <VTooltip activator="parent" open-delay="672" location="bottom">
                  <div class="d-flex items-center gap-2">
                    <em class="opacity-40" style="font-size: 95%"
                      >Gazdinstvo:
                    </em>
                    <strong
                      class="d-inline-block text-truncate max-w-[256px]"
                      style="font-weight: bold !important"
                    >
                      {{ profile?.name }}
                    </strong>
                    <VIcon
                      size="small"
                      class="opacity-40 ms-2"
                      end
                      icon="$iconExternalLink"
                    />
                  </div>
                </VTooltip>
              </VBtn>
            </NuxtLink>
            <div class="--placer ps-4 pt-3 pb-0">
              <VChip elevation="1" size="small" color="primary-darken-1">
                <template #prepend>
                  <VIcon
                    start
                    icon="$iconLocation"
                    class="!opacity-40 ps-[2px]"
                  />
                </template>
                <small class="*text-medium-emphasis translate-y-px px-[2px]">{{
                  profile?.district
                }}</small>
              </VChip>
            </div>
            <VCardTitle
              style="font-size: 88%"
              class="ms-3 text-medium-emphasis pb-1"
            >
              {{ profile?.name }}
            </VCardTitle>
            <div class="spacer--TopicRating ps-2 pt-3">
              <TopicRating
                small
                :topic="`${PRODUCT_RATING_prefix}${props.product.id}`"
              />
            </div>
            <VCardTitle class="pt-1 pe-0 ps-3" style="font-size: 128%">
              <!-- @@ -->
              <NuxtLink :to="productPublicUrl_" external target="_blank">
                <a
                  class="d-inline-block transition-transform hover:scale-[102%] text-decoration-underline text-primary-darken-1 cursor-pointer"
                >
                  {{ props.product.name }}
                </a>
              </NuxtLink>
              <!-- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis illo aperiam aut quidem ipsum enim distinctio, alias molestiae inventore impedit est asperiores unde sunt praesentium? Labore, sint sed! Incidunt, neque! -->
            </VCardTitle>
            <VChipGroup column class="ms-2 pt-3">
              <VChip size="x-small" :link="false">
                <template #prepend>
                  <VIcon
                    start
                    icon="$iconBattery"
                    class="!opacity-40 ps-[2px]"
                  />
                </template>
                <small class="text-medium-emphasis">Zaliha</small>
                <strong class="font--bold ms-1 tracking-wider"
                  >{{ props.product.stock
                  }}{{ props.product.stockType }}</strong
                >
              </VChip>
              <VChip size="x-small" :link="false">
                <template #prepend>
                  <VIcon
                    start
                    icon="$iconFolderFilled"
                    class="!opacity-40 ps-[2px]"
                  />
                </template>
                <small class="*text-medium-emphasis ms-[.11rem]">
                  <GetCategoryTitleFromTag
                    :category-tag="first(props.product.tags)"
                    v-slot="{ category }"
                  >
                    {{ category }}
                  </GetCategoryTitleFromTag>
                </small>
              </VChip>
            </VChipGroup>
          </div>
          <VCardText class="mt-2 line-clamp-4 *text-truncate">
            {{ props.product.description }}
          </VCardText>
          <VCardActions class="pa-4 mt-5 d-block">
            <div class="d-flex justify-end">
              <VChipProductPrice :product="props.product" />
            </div>
            <VBtn
              @click="cart.increase(props.product.id, 1)"
              block
              class="*px-4 group/btn-korpa mt-4 justify-end pe-7"
              color="transparent"
              variant="flat"
              border
              size="x-large"
              rounded="xl"
            >
              <div class="*bg-red space-x-3 position-absolute start-7 pa-0">
                <VIcon
                  icon="$iconKantarKorpa2"
                  size="39"
                  class="opacity-80 group-hover/btn-korpa:opacity-100 group-hover/btn-korpa:-rotate-1 group-hover/btn-korpa:scale-[118%] transition-transform"
                />

                <VAvatar
                  density="comfortable"
                  v-if="cart.store$.items[props.product.id]"
                  color="primary3-darken-1"
                  inline
                >
                  <pre>{{ cart.store$.items[props.product.id] }}</pre>
                </VAvatar>
              </div>
              <em
                class="d-inline-block tracking-[.122rem]"
                style="font-size: 112%"
                >Korpa</em
              >
            </VBtn>
          </VCardActions>
        </VCard>
      </template>
    </VHover>
  </section>
</template>
<style lang="scss" scoped>
</style>
