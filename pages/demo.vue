<script setup lang="ts">
import { Dump } from "@/components/dev";
import {
  SocialShareTopicButton,
  VBtnTogglePackagesPromoted,
} from "@/components/app";
definePageMeta({
  layout: "blank",
});

// const col1 = collection(fdb, "data:1");

const auth = useStoreApiAuth();
const { products } = useProducts();

// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <div class="space-x-1">
      <template v-for="p in products" :key="p.id">
        <VBtnTogglePackagesPromoted :product="p" />
      </template>
    </div>
    <hr />
    <Dump :data="{ user: auth.user$, products }" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
