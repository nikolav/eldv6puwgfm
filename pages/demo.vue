<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "blank",
});

const { savePdf } = useSavePdf();
const dl = async () => {
  console.log(
    await savePdf({
      filename: "file.pdf",
      data: { name: "time", value: Date.now() },
    })
  );
};
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
