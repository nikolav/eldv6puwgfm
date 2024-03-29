<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const imageSrc$ = ref();
const files$ = ref();
const submitFileUpload = async () => {
  const file = toValue(files$)[0];
  imageSrc$.value = await dataUrl(file);
};

// #eos
</script>
<template>
  <section class="page--demo">
    <VImg :src="imageSrc$" height="240" />
    <VForm @submit.prevent="submitFileUpload">
      <VFileInput v-model="files$" />
      <VBtn type="submit">ok</VBtn>
    </VForm>
  </section>
</template>
<style lang="scss" scoped>
</style>
