<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{
  product: IProduct;
  publicUrl: (id: string) => string;
}>();

const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  docs: { PRODUCT_IMAGES },
} = useAppConfig();
const { data: pImages } = useDocs(`${PRODUCT_IMAGES}${props.product.id}`);
const srcImageSample = computed(() =>
  !isEmpty(pImages)
    ? props.publicUrl(get(sample(pImages.value), "data.file_id"))
    : DEFAULT_NO_PRODUCT_IMAGE_FOUND
);

// @@eos
</script>
<template>
  <VHover>
    <template #default="{ isHovering, props: props_ }">
      <VCard
        v-bind="props_"
        :image="srcImageSample"
        class="component--ProductSlideImage mx-2"
        rounded
        elevation="2"
        height="100"
        position="relative"
      >
        <VOverlay
          persistent
          :close-on-content-click="false"
          :model-value="isHovering"
          absolute
          contained
          activator="parent"
          scrim="primary-darken-2"
          class="d-flex flex-col items-center text-center justify-evenly"
          @click.stop
        >
          <p
            class="text-white !truncate text-truncate text-sm text-start !w-full"
          >
            {{ props.product.name }}
          </p>
          <p class="text-white text-truncate">
            {{ props.product.price }}
            <small class="opacity-60 ps-px">din</small>
          </p>
          <VBtn rounded="pill" color="primary-darken-1" @click.stop>ok</VBtn>
        </VOverlay>
        <template #image>
          <VImg cover />
        </template>
      </VCard>
    </template>
  </VHover>
</template>
<style lang="scss" scoped>
</style>
