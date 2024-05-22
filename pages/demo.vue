<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "blank",
});

// const { savePdf } = useSavePdf();

// const dl = async () => {
//   await savePdf({
//     filename: `out--${idGen()}.pdf`,
//     data: {
//       template: "order-items",
//       uid: 1,
//       oid: 1,
//     },
//   });
// };
const auth = useStoreApiAuth();

// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <Dump :data="{ user: auth.user$ }" />
    <!-- <VBtn @click="dl">pdf:dl</VBtn> -->
    <!-- <div class="space-x-1">
      <template v-for="p in products" :key="p.id">
        <VBtnTogglePackagesPromoted :product="p" />
      </template>
    </div> -->
    <hr />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
