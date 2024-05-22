<script setup lang="ts">
import { Dump } from "@/components/dev";
import { template } from "lodash";
import printjs from "print-js";

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
const { printPdf } = useSavePdf();

const dl = async () => {
  await printPdf({
    data: {
      template: "order-items",
      oid: 1,
      uid: 1,
    },
  });
};
// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <hr />
    <VBtn @click="dl">dl</VBtn>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
