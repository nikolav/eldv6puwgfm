<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const gravatar = useStoreGravatars();

// #eos
</script>
<template>
  <section class="page--demo">
    <VAvatar size="64" @click="gravatar.refresh">
      <VImg crossorigin="anonymous" :src="gravatar.src" />
    </VAvatar>
  </section>
</template>
<style lang="scss" scoped>
</style>
