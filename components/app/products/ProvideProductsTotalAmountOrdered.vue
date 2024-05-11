<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product: IProduct | undefined }>();
const { amount } = useQueryProductsTotalAmountOrdered(() =>
  get(props.product, "id")
);

// @@eos
</script>
<template>
  <slot :amount="amount" />
</template>
