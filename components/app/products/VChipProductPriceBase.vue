<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product?: IProduct }>();
// @@eos
</script>
<template>
  <VChip size="small" :link="false" class="*d-inline-flex gap-1">
    <template #prepend>
      <VIcon class="me-1 opacity-50" icon="$iconRSD" />
    </template>
    <strong class="font-mono" style="font-size: 122%">{{
      priceFormatLocale(product?.price || 0)
    }}</strong>
    <small class="ms-1 opacity-75">/{{ product?.stockType }}</small>
  </VChip>
</template>
<style lang="scss" scoped>
</style>
