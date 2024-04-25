<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product: IProduct }>();
// @@eos
</script>
<template>
  <VChip
    class="component--VChipProductPrice"
    variant="elevated"
    color="primary3-darken-1"
    size="large"
  >
    <template #prepend>
      <VIcon start class="translate-x-[2px] opacity-40" icon="$iconRSD" />
    </template>
    <strong class="text-lg">{{ product.price }}</strong>
    <template #append>
      <small
        style="font-size: 71%"
        class="text-medium-emphasis translate-y-[3px] ps-px"
        >/{{ product.stockType }}</small
      >
    </template>
  </VChip>
</template>
<style lang="scss" scoped>
</style>
