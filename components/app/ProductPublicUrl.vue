<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product?: IProduct }>();
const id = computed(() => props.product?.id);
const name = computed(() => props.product?.name);
const url = useProductPublicUrl(id, name);
// @@eos
</script>
<template>
  <slot :url="url" />
</template>
