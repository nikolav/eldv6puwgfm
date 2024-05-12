<script setup lang="ts">
import type { IProduct, IStorageFileInfo } from "@/types";
const props = defineProps<{ product?: IProduct }>();
const { productImages } = useTopics();
const { data: images } = useDocs<IStorageFileInfo>(() =>
  productImages(props.product?.id)
);
// @@eos
</script>
<template>
  <slot :images="images" />
</template>
