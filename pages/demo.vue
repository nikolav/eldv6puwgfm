<script setup lang="ts">
import { Dump } from "@/components/dev";
import { template } from "lodash";
import printjs from "print-js";

definePageMeta({
  layout: "blank",
});

const { upload, publicUrl, info, ls } = useFirebaseStorage("foo/1");
const { onChange, open } = useFileDialog({ accept: "image/*" });
onChange(async (lsFiles) => {
  const file = get(lsFiles, "[0]");
  if (!file) return;
  const res = await upload({
    file1: {
      name: `${Date.now()}.${get(file, "name")}`,
      file,
    },
  });
  console.log({ res });
});
const url = async () => {
  const u = await publicUrl("nikolav.me.0.jpg");
  console.log({ url: u });
};
const meta = async () => {
  const i = await info("nikolav.me.0.jpg");
  console.log({ info: i });
};
const list = async () => {
  console.log({ ls: await ls() });
};
// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <hr />
    <VBtn @click="open">ok</VBtn>
    <VBtn @click="url">url</VBtn>
    <VBtn @click="meta">meta</VBtn>
    <VBtn @click="list">list</VBtn>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
