<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const gravatar = useStoreGravatar();

// #eos
</script>
<template>
  <section class="page--demo">
    <VBtn @click="gravatar.refresh">refresh</VBtn>
    <VAvatar color="primary2" size="55" variant="elevated">
      <VImg crossorigin="anonymous" :src="gravatar.src" cover />
    </VAvatar>
  </section>
</template>
<style lang="scss" scoped>
</style>
