<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "blank",
});

const auth = useStoreApiAuth();

// #eos
</script>
<template>
  <section class="page--demo.index">
    <VSheet elevation="2" width="712" height="589" class="pa-2" rounded>
      <Dump class="color--blue" :data="auth" />
    </VSheet>
  </section>
</template>
<style lang="scss" scoped>
  .color--blue {
    color: $BLUE_BASE;
  }
</style>
