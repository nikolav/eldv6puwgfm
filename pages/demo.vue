<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
const x = [
  { insert: "122 " },
  { attributes: { bold: true }, insert: "333" },
  { insert: "\n" },
];
const { getContent, setContent, onEditor } = useQuillEditor("#editor", {
  bounds: "#quill--bounds",
});
const ok = () => {
  setContent(x);
};
// #eos
</script>
<template>
  <section class="page--demo.index">
    <VBtn @click="ok">ok</VBtn>
    <div
      style="min-height: 172px; max-height: 400px"
      class="overflow-auto w-fit scrollbar-thin-light pb-1 *bg-red"
    >
      <VSheet
        id="quill--bounds"
        width="550"
        class="relative pa-0 ma-0"
        elevation="1"
      >
        <section id="editor" />
      </VSheet>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
