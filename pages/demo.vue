<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "blank",
});

const { products, category$, reload } =
  useQueryProductsByCategory("@product:category:mleko");

// #eos
</script>
<template>
  <section class="page--demo.index">
    <VBtn @click="reload">reload</VBtn>
    <Dump :data="{ category$, products }" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
