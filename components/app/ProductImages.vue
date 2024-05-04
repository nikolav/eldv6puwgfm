<script setup lang="ts">
import type { IProduct, IStorageFileInfo } from "@/types";
const props = defineProps<{ product?: IProduct }>();
const {
  docs: { PRODUCT_IMAGES },
} = useAppConfig();
const { topic$, data: images } = useDocs<IStorageFileInfo>();
watchEffect(() => {
  topic$.value = props?.product?.id
    ? `${PRODUCT_IMAGES}${props.product.id}`
    : "";
});

// @@eos
</script>
<template>
  <slot :images="images" />
</template>
