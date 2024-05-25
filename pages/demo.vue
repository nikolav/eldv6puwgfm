<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "blank",
});

 const { updateProductsDeliveryDate, productsDelivery } = useQueryManageOrder(1);

const dnow = () => new Date();

// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <hr />
    <VBtn @click="updateProductsDeliveryDate(dnow())">d:now</VBtn>

    <hr />
    <Dump :data="{ productsDelivery }" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
