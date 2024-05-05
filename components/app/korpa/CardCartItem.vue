<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { mergeProps } from "vue";
import { useDisplay } from "vuetify";
import {
  LightboxProductImages,
  LikeDislikeStatus,
  ProductCategory,
  ProductImages,
  ProductPublicUrl,
  TopicChat,
  TopicRating,
  TopicRatingStatus,
  VChipProductCategory,
  VChipProductPrice,
  WithComPublicUrl,
} from "@/components/app";
const props = defineProps<{ pid: number }>();
const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
} = useAppConfig();
// refs, computes
// utils
const { smAndUp, width } = useDisplay();
// stores
const { ratingProduct, likesProduct, ratingCompany, productChat } = useTopics();
const cart = useStoreCart();
const { products$ } = useQueryProductsOnly(() => [props.pid]);
const product$ = computed(() => first(products$.value));
const com = useUserData(() => get(product$.value, "user.id"));
// helpers
// const sampleImage = (images: any) =>
//   !isEmpty(images)
//     ? resourceUrl(get(sample(images), "data.file_id"))
//     : DEFAULT_NO_PRODUCT_IMAGE_FOUND;
const sampleImage = (images: any) =>
  !isEmpty(images)
    ? resourceUrl(get(sample(images), "data.file_id"))
    : DEFAULT_NO_PRODUCT_IMAGE_FOUND;
// @@
</script>
<template>
  <section class="component--CardCartItem">
    <!-- 
      keeps 'html' scrollbars on; 
       layout jumpes when hiding it to open lightbox 
    -->
    <!-- <Html :style="`overflow: scroll;`" /> -->

    <!-- @item:container -->
    <div class="d-flex items-center justify-between sm:gap-4">
      <!-- @item:card-h -->
      <VHover close-delay="345" open-delay="678">
        <template #default="{ isHovering: itemIsHovering, props: props_ }">
          <VCard
            rounded="lg"
            v-bind="mergeProps(props_, $attrs)"
            class="!bg-white/75 grow d-flex"
            :class="525 < width ? undefined : 'flex-col'"
            :density="width < 288 ? 'compact' : undefined"
            :height="555 < width ? 140 : undefined"
            :max-height="555 < width ? 140 : undefined"
          >
            <!-- @item:card:image -->
            <div v-if="833 < width" class="self-stretch">
              <LightboxProductImages :product="product$">
                <template #activator="{ onClick, images }">
                  <VHover open-delay="345">
                    <template #default="{ isHovering, props: props_ }">
                      <VImg
                        v-bind="props_"
                        @click.stop="onClick"
                        :src="sampleImage(images)"
                        class="h-100 cursor-pointer hover:scale-[101%] transition-transform position-relative"
                        width="177"
                        cover
                      >
                        <VFadeTransition>
                          <VIcon
                            size="large"
                            color="white"
                            v-if="isHovering"
                            icon="$iconImages"
                            class="position-absolute top-1 start-1 z-[1] opacity-60"
                          />
                        </VFadeTransition>
                      </VImg>
                    </template>
                  </VHover>
                </template>
              </LightboxProductImages>
              <!-- </ProductImages> -->
            </div>

            <!-- @item:card:description -->
            <div
              class="grow *bg-red"
              :class="width < 281 ? 'text-end' : undefined"
            >
              <div
                class="d-flex items-center gap-6"
                :class="522 < width ? undefined : '!items-start flex-col'"
              >
                <TopicRating
                  v-if="product$?.id"
                  class="*bg-red ps-2"
                  small
                  :topic="ratingProduct(product$.id)"
                />
                <LikeDislikeStatus
                  v-if="product$?.id"
                  :class="533 < width ? undefined : 'ps-4'"
                  :topic="likesProduct(product$.id)"
                />
              </div>
              <ProductPublicUrl
                :product="product$"
                v-slot="{ url: productUrl }"
              >
                <VCardTitle
                  class="text-truncate *bg-red text-start"
                  :class="width < 389 ? '!text-sm' : undefined"
                >
                  <NuxtLink :to="productUrl" external target="_blank">
                    <a class="link--prominent text-primary">
                      {{ get(product$, "name") }}
                    </a>
                  </NuxtLink>
                </VCardTitle>
              </ProductPublicUrl>
              <div class="d-flex">
                <VChipProductCategory
                  class="ms-5"
                  size="small"
                  :product="product$"
                />
              </div>
              <VCardSubtitle class="*bg-red ps-6 d-flex items-center mt-3">
                <VIcon
                  class="opacity-30"
                  start
                  size="small"
                  icon="$iconDowntown"
                />
                <TopicRatingStatus :topic="ratingCompany(com.uid$.value)" />
                <WithComPublicUrl
                  :company-id="com.uid$.value"
                  :company-name="com.companyName.value"
                  v-slot="{ companyUrl }"
                >
                  <NuxtLink :to="companyUrl" external target="_blank">
                    <a class="text-primary-darken-1 link--prominent-base">
                      <em class="text-body-2 ms-3 align-middle !font-sans">
                        {{ com.companyName.value || "" }}</em
                      >
                      <VIcon
                        end
                        icon="$iconExternalLink"
                        size="x-small"
                        class="opacity-50"
                      />
                    </a>
                  </NuxtLink>
                </WithComPublicUrl>
              </VCardSubtitle>
            </div>

            <div
              class="*bg-primary3 grid grid-cols-[auto,1fr] grid-rows-2 pe-3"
              :class="
                922 < width
                  ? undefined
                  : `justify-items-end ${
                      492 < width ? undefined : 'mt-4 !max-w-[301px]'
                    }`
              "
            >
              <!-- @item:qty:cell-ts -->
              <div
                class="*bg-red d-flex items-center justify-center"
                :class="
                  922 < width
                    ? 'w-[256px] sm:me-3'
                    : 652 < width
                    ? 'w-[148px]'
                    : 'w-[112px]'
                "
              >
                <VTextField
                  :model-value="cart.store$.items[props.pid]"
                  @update:model-value="(value) => cart.put(props.pid, value)"
                  hide-details
                  label="Količina"
                  variant="outlined"
                  density="compact"
                  type="number"
                  class="*bg-lime"
                  hide-spin-buttons
                  center-affix
                >
                  <template #prepend>
                    <VChipProductPrice
                      v-if="922 < width"
                      class="me-2 !min-w-[91px]"
                      size="small"
                      :product="product$"
                    />
                  </template>
                  <template #append-inner>
                    <pre style="font-size: 81%" class="opacity-50">{{
                      product$?.stockType || ""
                    }}</pre>
                  </template>
                </VTextField>
              </div>
              <!-- @item:qty:cell-te -->
              <div class="d-flex items-center justify-end">
                <VBtn
                  icon
                  @click="cart.increase(props.pid)"
                  variant="text"
                  color="primary"
                >
                  <VIcon size="x-large" icon="$plus" />
                </VBtn>
              </div>

              <!-- @item:qty:cell-bs -->
              <div
                class="*bg-red d-flex items-center justify-end sm:me-3 *px-3 *pt-2"
                :class="
                  922 < width
                    ? 'w-[256px]'
                    : 652 < width
                    ? 'w-[148px]'
                    : 'w-[132px]'
                "
              >
                <TopicChat
                  :title="product$?.name"
                  :topic="productChat(product$?.id)"
                  class="ms-1 me-auto invisible"
                  :class="itemIsHovering ? '!visible' : undefined"
                />

                <VTextField
                  class="scale-[85%] -translate-y-1 *bg-red"
                  style="max-width: 138px"
                  disabled
                  :model-value="
                    priceFormatLocale(
                      cart.store$.items[props.pid] * Number(product$?.price)
                    )
                  "
                  hide-details
                  label="Iznos"
                  variant="underlined"
                  density="compact"
                  hide-spin-buttons
                  center-affix
                  readonly
                >
                  <template #append-inner>
                    <pre style="font-size: 81%" class="opacity-50">din</pre>
                  </template>
                </VTextField>
              </div>
              <!-- @item:qty:cell-be -->
              <div class="d-flex items-center justify-end">
                <VBtn
                  icon
                  @click="cart.increase(props.pid, -1)"
                  variant="text"
                  color="error"
                  ><VIcon size="x-large" icon="$minus"
                /></VBtn>
              </div>
            </div>
          </VCard>
        </template>
      </VHover>

      <!-- @@ -->
      <!-- @item:drop-product -->
      <VBtn
        v-if="333 < width"
        icon
        variant="tonal"
        color="error-darken-2"
        @click="cart.drop(props.pid)"
        size="small"
        class="opacity-30 hover:opacity-80"
      >
        <VTooltip
          activator="parent"
          open-delay="345"
          location="bottom"
          text="Izbaci proizvod iz korpe"
        />
        <VIcon size="large" icon="$iconTrash" />
      </VBtn>
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style> 
