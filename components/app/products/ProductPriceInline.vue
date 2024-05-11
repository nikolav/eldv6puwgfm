<script setup lang="ts">
import type { OrNoValue } from "@/types";
const props = defineProps<{
  price: OrNoValue<number>;
}>();

// @@eos
</script>
<template>
  <span class="d-inline-block text-body-1 !font-bold !font-sans">{{
    priceFormatLocale(price || 0)
  }}</span>
  <em class="d-inline-block ps-1 opacity-85">RSD</em>
</template>
<style lang="scss" scoped>
</style>
