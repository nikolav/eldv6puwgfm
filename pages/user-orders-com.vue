<script setup lang="ts">
import { OrderProducts } from "@/components/app";
definePageMeta({
  middleware: "authorized-company",
  layout: "company-profile",
});
const auth = useStoreApiAuth();
// #eos
</script>
<template>
  <section class="page--user-orders-com">
    <OrderProducts :user="auth.user$" />
  </section>
</template>
<style lang="scss" scoped></style>
