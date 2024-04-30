<script setup lang="ts">
import type { IProduct } from "@/types";
import { LikeDislike, TopicChat } from "@/components/app";

const props = defineProps<{ product: IProduct }>();
const {
  // app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  // docs: { PRODUCT_IMAGES },
  key: { PRODUCTS_LIKES_prefix, TOPIC_CHAT_PRODUCTS_prefix },
} = useAppConfig();

// @@eos
</script>
<template>
  <div
    v-bind="$attrs"
    class="compoent--CardProductDisplayToolbarSocial d-flex items-center gap-4 justify-end"
  >
    <TopicChat
      :topic="`${TOPIC_CHAT_PRODUCTS_prefix}${props.product.id}`"
      :title="props.product.name"
    />
    <LikeDislike :topic="`${PRODUCTS_LIKES_prefix}${props.product.id}`" />
  </div>
</template>
<style lang="scss" scoped>
</style>
