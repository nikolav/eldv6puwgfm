<script setup lang="ts">
import { Dump } from "@/components/dev";
import Quill from "quill";

definePageMeta({
  layout: "blank",
});

// const toolbarOptions = [
//   ["bold", "italic", "underline", "strike"], // toggled buttons
//   ["blockquote", "code-block"],

//   [{ header: 1 }, { header: 2 }], // custom button values
//   [{ list: "ordered" }, { list: "bullet" }],
//   [{ script: "sub" }, { script: "super" }], // superscript/subscript
//   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//   [{ direction: "rtl" }], // text direction

//   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],

//   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//   [{ font: [] }],
//   [{ align: [] }],

//   ["clean"], // remove formatting button
// ];

const options = {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
  },
  placeholder: "Compose an epic...",
};

onMounted(() => {
  const quill = new Quill("#thequill", options);
});

// #eos
</script>
<template>
  <section class="page--demo.index">
    <VSheet class="pa-2 *bg-red" elevation="2" width="712" height="589" rounded>
      <section id="thequill--toolbar">
        <button class="ql-bold">Bold</button>
        <button class="ql-italic">Italic</button>
      </section>
      <section id="thequill" class="*bg-red"></section>
    </VSheet>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
