<script setup lang="ts">
import type { IOrder } from "@/types";
const props = defineProps<{ order?: IOrder }>();
const { products, companies, totalOriginal } =
  useQueryProductsOnOrderWithDetails(props.order);
// @@eos
</script>
<template>
  <slot :total="totalOriginal" :products="products" :companies="companies" />
</template>
<style lang="scss" scoped>
</style>
