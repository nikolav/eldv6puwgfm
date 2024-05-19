<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{
  product: IProduct | undefined;
}>();

const auth = useStoreApiAuth();
const isGold = computed(() => get(auth.user$, "gold"));
const disabled = computed(() => !isGold.value);

// @@eos
</script>
<template>
  <VBtn :disabled="disabled" class="component--VBtnTogglePackageGold">
    {{ product?.name }}
  </VBtn>
</template>
<style lang="scss" scoped></style>
