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
  <section class="page--company-profile-inbox *bg-red fill-height px-1">
    <CardInbox
      :reload="inboxKey"
      :key="inboxKey.ID.value"
      class="mx-auto mt-2 mt-sm-8"
      elevation="1"
      max-width="812"
    />
  </section>
</template>
<style lang="scss" scoped>
</style>
