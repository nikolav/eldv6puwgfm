<script setup lang="ts">
import { mergeProps } from "vue";
import type { IProduct } from "@/types";
import {
  LikeDislike,
  TopicChat,
  WithComProfile,
  WithComPublicUrl,
  GetCategoryTitleFromTag,
  VChipProductPrice,
} from "@/components/app";

const props = defineProps<{ product: IProduct }>();

const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  docs: { PRODUCT_IMAGES },
  key: { PRODUCTS_LIKES_prefix, TOPIC_CHAT_PRODUCTS_prefix },
} = useAppConfig();

const { data: docsImages$ } = useDocs(`${PRODUCT_IMAGES}${props.product.id}`);
const { publicUrl, reload: reloadAll } = useApiStorage(true, true);
watch(docsImages$, reloadAll);

const productImageSrcSample$ = computed(() =>
  isEmpty(docsImages$.value)
    ? DEFAULT_NO_PRODUCT_IMAGE_FOUND
    : publicUrl(get(sample(docsImages$.value), "data.file_id"))
);

const cart = useStoreCart();
// @@eos
</script>
<template>
  <section class="component--CardProductDisplay">
    <VHover open-delay="456">
      <template #default="{ isHovering, props: props_ }">
        <VCard
          v-bind="mergeProps($attrs, props_)"
          rounded="lg"
          variant="elevated"
          :elevation="isHovering ? 4 : 2"
          class="pa-0"
        >
          <WithComProfile :user-id="props.product.user_id" v-slot="{ profile }">
            <WithComPublicUrl
              :company-id="props.product.user_id"
              :company-name="profile?.name"
              v-slot="{ companyUrl }"
            >
              <VImg
                max-height="252"
                :aspect-ratio="1"
                cover
                :src="productImageSrcSample$"
                class="position-relative"
              >
                <!-- PDisplay:toolbar -->
                <div
                  class="position-absolute top-px start-1/2 -translate-x-[50%] d-flex items-center gap-4 justify-end"
                  :class="isHovering ? 'visible' : 'invisible'"
                >
                  <TopicChat
                    :topic="`${TOPIC_CHAT_PRODUCTS_prefix}${props.product.id}`"
                    :title="props.product.name"
                  />
                  <LikeDislike
                    :topic="`${PRODUCTS_LIKES_prefix}${props.product.id}`"
                  />
                </div>
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
                    <VAvatar
                      color="white"
                      size="97"
                      image="https://nikolav.rs/nikolav.me.0.jpg"
                    />
                    <VTooltip
                      activator="parent"
                      open-delay="672"
                      location="bottom"
                    >
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
                    <small
                      class="*text-medium-emphasis translate-y-px px-[2px]"
                      >{{ profile?.district }}</small
                    >
                  </VChip>
                </div>
                <VCardTitle
                  style="font-size: 88%"
                  class="ms-3 text-medium-emphasis pb-1"
                >
                  {{ profile?.name }}
                </VCardTitle>
                <VCardTitle class="pt-2 pe-0 ps-3" style="font-size: 128%">
                  {{ props.product.name }}
                  <!-- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis illo aperiam aut quidem ipsum enim distinctio, alias molestiae inventore impedit est asperiores unde sunt praesentium? Labore, sint sed! Incidunt, neque! -->
                </VCardTitle>
                <VChipGroup column class="ms-2">
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
              <VCardText class="mt-2 line-clamp-3 *text-truncate">
                {{ props.product.description }}
              </VCardText>
              <VCardActions class="pa-4 mt-5">
                <VChipProductPrice :product="props.product" />
                <VSpacer />
                <VBtn
                  class="px-4 group/btn-korpa"
                  color="transparent"
                  variant="flat"
                  border
                  size="large"
                  rounded="pill"
                  @click="cart.increase(props.product.id, 1)"
                >
                  <strong class="ms-1">Korpa</strong>
                  <VBadge
                    v-if="cart.store$.items[props.product.id]"
                    color="primary3-darken-1"
                    inline
                    class="ms-1"
                  >
                    <template #badge>
                      <pre>{{ cart.store$.items[props.product.id] }}</pre>
                    </template>
                  </VBadge>
                  <VIcon
                    v-else
                    end
                    icon="$iconKantarKorpa2"
                    size="29"
                    class="opacity-80 group-hover/btn-korpa:opacity-100 group-hover/btn-korpa:-rotate-1 group-hover/btn-korpa:scale-110 transition-transform"
                  />
                </VBtn>
              </VCardActions>
            </WithComPublicUrl>
          </WithComProfile>
        </VCard>
      </template>
    </VHover>
  </section>
</template>
<style lang="scss" scoped>
</style>
