<script setup lang="ts">
import { Dump } from "@/components/dev";
import { saveAs } from "file-saver";
import { ENDPOINT_GRAPHQL } from "@/config";
import { template } from "lodash";

definePageMeta({
  layout: "blank",
});

const { savePdf } = useSavePdf();

const dl = async () => {
  await savePdf({
    filename: `out--${idGen()}.pdf`,
    data: {
      template: "order-items",
      uid: 1,
      oid: 1,
    },
  });
};

// const auth = useStoreApiAuth();
// const dl = async () => {
//   // await savePdf({
//   //   filename: "out.pdf",
//   //   data: {
//   //     template: "order-items",
//   //     oid: 1,
//   //     uid: 1,
//   //   },
//   // });
//   const query = `
//     query Q_pdfDownload($data: JsonData!) {
//       pdfDownload(data: $data)
//     }
//   `;
//   const d = get(
//     await $fetch(ENDPOINT_GRAPHQL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${auth.token$}`,
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: {
//         query: query,
//         variables: {
//           data: {
//             template: "order-items",
//             oid: 1,
//             uid: 1,
//           },
//         },
//       },
//     }),
//     "data.pdfDownload"
//   );

//   const bs = atob(d ? String(d) : "");
//   const len = bs.length;
//   const bytes = new Uint8Array(len);
//   for (let i = 0; i < len; i++) {
//     bytes[i] = bs.charCodeAt(i);
//   }
//   // console.log(new Blob([bytes.buffer]))
//   saveAs(new Blob([bytes.buffer]), "file.pdf");
// };
// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <!-- <div class="space-x-1">
      <template v-for="p in products" :key="p.id">
        <VBtnTogglePackagesPromoted :product="p" />
      </template>
    </div> -->
    <hr />
    <VBtn @click="dl">pdf:dl</VBtn>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
