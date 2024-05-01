<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product: IProduct }>();
// @@eos
</script>
<template>
  <VChip size="large" color="primary3-darken-1" variant="elevated">
    <template #prepend>
      <VIcon
        start
        icon="$iconRSD"
        class="!opacity-40 translate-y-[2px] ps-1 translate-x-px"
        :size="25"
      />
    </template>
    <span class="align-bottom">
      <strong class="text-[122%] font--bold">{{ product?.price }}</strong
      ><small class="ms-[3px] opacity-50">{{ product?.stockType }}</small>
    </span>
  </VChip>
</template>
<style lang="scss" scoped>
.font--bold {
  font-weight: bold !important;
}
</style>
