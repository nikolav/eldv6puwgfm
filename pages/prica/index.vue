 <script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const {
  urls: { QUERY },
} = useAppConfig();
// const auth = useStoreApiAuth();
const route = useRoute();
const sid_ = Number(last(String(get(route.query, QUERY)).split("-")));

// @@eos
</script>
<template>
  <section class="component--prica:sid">
    <h1>📜 @strana Prica [Ref# {{ sid_ }}]</h1>
    <NuxtLink :to="{ name: 'index' }">
      <VBtn variant="elevated" color="primary" size="x-large"><strong class="text-2xl me-2">🏪</strong> Pijaca</VBtn>
    </NuxtLink>
  </section>
</template>
<style lang="scss" scoped>
</style>
