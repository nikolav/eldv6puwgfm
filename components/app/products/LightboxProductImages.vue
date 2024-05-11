<script setup lang="ts">
import type { IProduct } from "@/types";
import { ProductImages } from "@/components/app";
import { LightboxImages } from "@/components/ui";
// const props = defineProps<{ product?: IProduct }>();
const props = defineProps<{ product: any }>();
// @@eos
</script>
<template>
  <ProductImages :product="props.product" v-slot="{ images }">
    <LightboxImages :images="images">
      <template #activator="props_">
        <slot name="activator" v-bind="props_" />
      </template>
    </LightboxImages>
  </ProductImages>
</template>
<style lang="scss" scoped>
</style>
