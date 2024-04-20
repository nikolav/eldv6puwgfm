<script setup lang="ts">
import type { IProduct } from "@/types";
import { LikeDislike, TopicChat } from "@/components/app";

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
        <VCard v-bind="props_" rounded="lg" variant="elevated">
          <VImg
            max-height="192"
            :aspect-ratio="1"
            cover
            :src="productImageSrcSample$"
            class="position-relative"
          >
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
          <VCardTitle>
            {{ props.product.name }}
          </VCardTitle>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="primary-darken-1"
              variant="tonal"
              @click="cart.increase(props.product.id, 1)"
              ><VBadge color="error" v-if="cart.has(props.product.id)" inline>
                <template #badge>
                  <pre>{{ cart.store$.items[props.product.id] }}</pre>
                </template>
              </VBadge>
              <strong
                :class="
                  cart.store$.items[props.product.id] ? 'ms-1' : undefined
                "
                >Korpa</strong
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
