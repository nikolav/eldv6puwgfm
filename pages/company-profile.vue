<script setup lang="ts">
import { emojify } from "node-emoji";
import { get, matchEmailStart, capitalize } from "@/utils";

const auth = useStoreApiAuth();

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

// #eos
</script>
<template>
  <section class="page--company-profile">
    <h1>@page: company-profile</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt odit
      placeat laboriosam, quibusdam, id culpa vero mollitia corrupti rerum minus
      veniam vitae laudantium natus. In itaque ipsa tenetur perspiciatis quo.
    </p>
  </section>
</template>
<style lang="scss" scoped>
</style>
