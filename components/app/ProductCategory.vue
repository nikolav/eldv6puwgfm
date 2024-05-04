<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product?: IProduct }>();
const {
  products: { categories },
} = useAppConfig();
const categoryTitle = computed(
  () => find(categories, { value: get(props, "product.tags[0]") })?.title || ""
);
// @@eos
</script>
<template>
  <slot :category="categoryTitle" />
</template>
<style lang="scss" scoped>
</style>
