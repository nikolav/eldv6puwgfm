<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "blank",
});

const { image, dropImages, reload, update, src: src$ } = useStoryImage(71);
const image$ = ref();
const upl = async () => await update(image$.value);
// #eos
</script>
<template>
  <section class="page--demo.index">
    <VBtn @click="upl">upl</VBtn>
    <VBtn @click="dropImages">rm</VBtn>
    <VBtn @click="reload">reload</VBtn>
    <VFileInput
      @update:modelValue="
        ([file]) => {
          image$ = file;
        }
      "
      label="file"
    />
    <hr />
    <Dump :data="{ image }" />
    <VImg class="bg-grey" width="312" height="312" cover :src="src$" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
