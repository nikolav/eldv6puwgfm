<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product?: IProduct }>();
const { nodeHead } = useStoreMenuCategoriesFull();

const {
  products: { PRODUCT_CATEGORY_prefix },
} = useAppConfig();
const categoryTitle = computed(() => {
  const c = find(props.product?.tags, (t: string) =>
    t.startsWith(PRODUCT_CATEGORY_prefix)
  );
  if (c) return get(nodeHead(afterLastColon(c))?.value(), "title");
});
// const {
//   products: { categories },
// } = useAppConfig();
// const categoryTitle = computed(
//   () => find(categories, { value: get(props, "product.tags[0]") })?.title || ""
// );
// @@eos
</script>
<template>
  <slot :category="categoryTitle" />
</template>
<style lang="scss" scoped></style>
