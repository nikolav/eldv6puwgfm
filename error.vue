<script setup lang="ts">
import type { NuxtError } from "#app";
import { Dump } from "@/components/dev";

const props = defineProps({
  error: Object as () => NuxtError,
});

// @@eos
</script>
<template>
  <section class="page--error">
    <NuxtLink to="/">
      <a style="font-size: 2rem !important"> 🏠 Pijaca </a>
    </NuxtLink>
    <hr />
    <pre>--error-dump --console</pre>
    <hr />
    <Dump :data="error" />
    <hr />
  </section>
</template>
<style lang="scss" scoped></style>
