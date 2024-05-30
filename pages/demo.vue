<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "blank",
});

const { $lightbox } = useNuxtApp();
const ok = () =>
  $lightbox.open([
    {
      src: "https://docs.google.com/forms/d/e/1FAIpQLSfQF5FTcZlck8_hlmtUlKXT5vuTk-D6nUC6YbntJzTF8W2LKA/viewform?usp=sf_link",
      type: "iframe",
    },
  ]);

// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <hr />
    <VBtn @click="ok">
      <VIcon start :size="48" icon="$iconBrandTag" />
      ok
    </VBtn>
  </section>
</template>
<style lang="scss" scoped></style>
