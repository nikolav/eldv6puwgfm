<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product?: IProduct }>();
const { categoryTitleTop } = useGetProductCategory(() => props.product);
// @@eos
</script>
<template>
  <slot :category="categoryTitleTop" />
</template>
<style lang="scss" scoped></style>
