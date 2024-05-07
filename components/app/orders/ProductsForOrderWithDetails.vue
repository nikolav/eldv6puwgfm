<script setup lang="ts">
import type { IOrder, IUser } from "@/types";
const props = defineProps<{ order?: IOrder }>();

const { $calcOrderTotalOriginal } = useNuxtApp();
const oid$ = computed(() => get(props.order, "id"));
const { products } = useQueryProductsOnOrder(oid$);
const totalOriginal = computed(() =>
  $calcOrderTotalOriginal(props.order, products.value)
);
const companies = computed(() =>
  transform(
    products.value,
    (acc, p) => {
      if (!some(acc, (u) => u.id === p.user?.id)) acc.push(p.user!);
    },
    <IUser[]>[]
  )
);

// @@eos
</script>
<template>
  <slot :total="totalOriginal" :products="products" :companies="companies" />
</template>
<style lang="scss" scoped>
</style>
