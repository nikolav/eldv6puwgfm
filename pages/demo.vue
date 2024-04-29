<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "blank",
});

const { products } = useProducts()
// #eos
</script>
<template>
  <section class="page--demo.index">
    <!-- <VList
      v-model:selected="selection$"
      v-model:open="opened$"
      select-strategy="single-leaf"
      open-strategy="multiple"
      variant="tonal"
      mandatory
      class="*mx-auto py-0"
      elevation="8"
      rounded="lg"
      border="lg"
      width="212"
      lines="one"
      v-model="current"
      color="primary"
      :items="items"
    >
    <template #prepend="{ isSelected }">
      <VBtn v-if="!isSelected" block>ok</VBtn>
    </template>
  </VList> -->
    <Dump :data="products" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
