<script setup lang="ts">
import type { IOrder } from "@/types";
const props = defineProps<{ order?: IOrder; modelValue?: any }>();
const emit = defineEmits<{
  (e: "update:modelValue", m: any): void;
}>();
const { products, companies, totalOriginal } =
  useQueryProductsOnOrderWithDetails(props.order);
// bind sth. so init code can pick up order keys
watchEffect(() => emit("update:modelValue", props.order?.id));
// @@eos
</script>
<template>
  <slot :total="totalOriginal" :products="products" :companies="companies" />
</template>
<style lang="scss" scoped>
</style>
