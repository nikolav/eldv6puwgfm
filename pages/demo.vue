<script setup lang="ts">
import { Dump } from "@/components/dev";
import {
  SocialShareTopicButton,
  VBtnTogglePackageGold,
} from "@/components/app";
definePageMeta({
  layout: "blank",
});

// const col1 = collection(fdb, "data:1");

const auth = useStoreApiAuth();
const { products } = useProducts();

const { isPromoted, setPromoted } = useQueryProductPromo(12);
// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <VBtn @click="setPromoted(!isPromoted)">promo:12:toggle</VBtn>
    <!-- <template v-for="p in products" :key="p.id">
      <VBtnTogglePackageGold :product="p" />
    </template> -->
    <hr />
    <Dump :data="{ isPromoted, user: auth.user$, products }" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
