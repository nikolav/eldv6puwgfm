<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
  middleware: "authorized",
});
const auth = useStoreApiAuth();
setPageLayout(auth.isCompany$ ? "company-profile" : "user-profile");


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
