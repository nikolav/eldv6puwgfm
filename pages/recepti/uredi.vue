<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "user-profile",
  middleware: "authorized",
});
const auth = useStoreApiAuth();
if (auth.isCompany$) setPageLayout("company-profile");

// @@eos
</script>
<template>
  <section class="page--recepti-uredi">
    <h1>recepti -uredi</h1>
    <Dump
      :data="{
        isAuth: auth.isAuthenticated$,
        user: auth.user$,
        token: auth.token$,
      }"
    />
  </section>
</template>
<style lang="scss" scoped></style>
