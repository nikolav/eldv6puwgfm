<script setup lang="ts">
import type { IProduct, IStorageFileInfo } from "@/types";
const props = defineProps<{ product: IProduct }>();
const {
  docs: { PRODUCT_IMAGES },
  key: { APP_PROCESSING },
} = useAppConfig();
const { topic$, data: images, loading } = useDocs<IStorageFileInfo>();
watchEffect(() => {
  topic$.value = props?.product.id
    ? `${PRODUCT_IMAGES}${props.product.id}`
    : "";
});
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
watchEffect(() => {
  appProcessing$.value = loading.value;
});

// @@eos
</script>
<template>
  <slot :images="images" />
</template>
