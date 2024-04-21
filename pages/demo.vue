<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const { rating, rate, val, store } = useTopicRating("item::2");

const r = ref(val.value);
watch(r, async (r) => await rate(r));
// #eos
</script>
<template>
  <section class="page--demo">
    <VRating
      hover
      active-color="orange"
      color="secondary"
      v-model="r"
      size="x-large"
      length="5"
      density="compact"
    />
    <pre>{{ JSON.stringify({ store, rating }, null, 2) }}</pre>
  </section>
</template>
<style lang="scss" scoped>
</style>
