<script setup lang="ts">
import type { NuxtError } from "#app";
import { Dump } from "@/components/dev";
const props = defineProps<{ error: NuxtError }>();
</script>
<template>
  <section class="page--error">
    <h1>{{ props.error.statusCode }}</h1>
    <Dump :data="props.error" />
    <NuxtLink to="/">🏠 Home</NuxtLink>
  </section>
</template>
