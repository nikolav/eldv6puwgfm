<script setup lang="ts">
import { CardInbox } from "@/components/app";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

const inboxKey = useUniqueId();

// #eos
</script>
<template>
  <section class="page--company-profile-inbox *bg-red h-[96%] px-1 *overflow-x-hidden">
    <CardInbox
      :reload="inboxKey"
      :key="inboxKey.ID.value"
      class="mx-auto mt-2 mt-sm-4"
      elevation="1"
      max-width="812"
    />
  </section>
</template>
<style lang="scss" scoped>
</style>
