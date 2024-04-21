<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const { rating, rate, clear, val, store } = useTopicRating("foo::2");

// #eos
</script>
<template>
  <section
    class="page--demo d-flex items-center justify-center fill-height bg-stone-200"
  >
    <VSheet elevation="2" width="550" height="400" class="pa-2">
      <VBtn @click="clear">clear</VBtn>
      <VDivider />
      <VRating
        @update:model-value="rate"
        :model-value="val"
        active-color="orange"
        clearable
        hover
        density="compact"
        length="5"
      />
      <pre>{{ JSON.stringify({ store, rating }, null, 2) }}</pre>
    </VSheet>
  </section>
</template>
<style lang="scss" scoped>
</style>
