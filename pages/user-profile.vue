<script setup lang="ts">
import { emojify } from "node-emoji";
import { get, capitalize, matchEmailStart } from "@/utils";

definePageMeta({
  layout: "user-profile",
  middleware: "authorized",
});

const auth = useStoreApiAuth();

// #eos
</script>
<template>
  <section class="page--user-profile">
    <h1>
      {{ emojify(":wave:") }} Zdravo,
      {{ capitalize(matchEmailStart(get(auth.user$, "email"))) }}.
    </h1>
    <p>
      <pre>.is_company [{{ auth.isCompany$ }}]</pre>
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic temporibus et
      a cumque molestiae. Atque at odio ipsa placeat quibusdam, delectus
      officiis voluptates, ut maxime provident aut deserunt cupiditate autem!
    </p>
  </section>
</template>
<style lang="scss" scoped>
</style>
