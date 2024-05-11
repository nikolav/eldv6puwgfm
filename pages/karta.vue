<script setup lang="ts">
import { SerbiaMapSVG } from "@/components/app";
definePageMeta({
  scrollToTop: false,
});

const hoverDistrict$ = ref();
// #eos
</script>
<template>
  <section class="page--karta">
    <pre>{{ hoverDistrict$ }}</pre>
    <VCard variant="elevated" elevation="2" rounded class="pa-4 w-fit">
      <SerbiaMapSVG class="h-[480px]" />
    </VCard>
  </section>
</template>
<style lang="scss" scoped>
</style>
