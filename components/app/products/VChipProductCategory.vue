<script setup lang="ts">
import type { IProduct } from "@/types";
import { ProductCategory } from "@/components/app";
const props = defineProps<{ product?: IProduct }>();
// @@eos
</script>
<template>
  <VChip size="x-small" :link="false">
    <template #prepend>
      <VIcon start icon="$iconFolderFilled" class="!opacity-40 ps-[2px]" />
    </template>
    <small class="*text-medium-emphasis ms-[.11rem]">
      <ProductCategory :product="props.product" v-slot="{ category }">
        {{ category }}
      </ProductCategory>
    </small>
  </VChip>
</template>
<style lang="scss" scoped>
</style>
