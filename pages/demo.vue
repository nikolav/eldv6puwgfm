<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "blank",
});

const {
  productsStatus,
  updateProductsStatus
} = useQueryManageOrder(1);

// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <hr />
    <VBtn @click="updateProductsStatus(1)">s:1</VBtn>
    <VBtn @click="updateProductsStatus(2)">s:2</VBtn>
    <VBtn @click="updateProductsStatus(3)">s:3</VBtn>
    <VBtn @click="updateProductsStatus(4)">s:4</VBtn>
    <Dump :data="{ productsStatus }" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
