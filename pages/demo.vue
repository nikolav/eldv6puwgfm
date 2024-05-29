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
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <hr />
    <Dump :data="{ com: auth.isCompany$, user: auth.user$ }" />
  </section>
</template>
<style lang="scss" scoped></style>
