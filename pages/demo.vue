<script setup lang="ts">
import { Dump } from "@/components/dev";
import menuItems from "@/assets/menu-subcategories/subcategories.json";
import { tree } from "nikolav-treets";

definePageMeta({
  layout: "blank",
});

const t = new tree("#");
t.json({ title: "@main", chidren: menuItems });

const val$ = ref();
const s$ = ref([]);

// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <hr />
    <Dump :data="{ s$, val$ }" />
    <hr />
    <VList
      v-model:selected="s$"
      select-strategy="single-leaf"
      mandatory
      color="primary-lighten-2"
      variant="flat"
      density="compact"
      lines="one"
      class="py-0"
      v-model="val$"
      width="375"
      :items="menuItems"
    />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
