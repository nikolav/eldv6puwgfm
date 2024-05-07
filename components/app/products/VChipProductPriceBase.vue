<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product?: IProduct; priceOnly?: number }>();
// @@eos
</script>
<template>
  <VChip size="small" :link="false" class="*d-inline-flex gap-1">
    <template #prepend>
      <VIcon class="me-1 opacity-50" icon="$iconRSD" />
    </template>
    <strong class="font-mono" style="font-size: 122%">{{
      priceFormatLocale(props?.priceOnly || product?.price || 0)
    }}</strong>
    <small v-if="!props?.priceOnly" class="ms-1 opacity-75"
      >/{{ product?.stockType }}</small
    >
    <template #append>
      <slot name="append" />
    </template>
  </VChip>
</template>
<style lang="scss" scoped>
</style>
