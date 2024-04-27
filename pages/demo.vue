<script setup lang="ts">
import { Dump } from "@/components/dev";
import { number } from "zod";
definePageMeta({
  layout: "blank",
});

const items = [
  {
    title: "item.1",
    value: "a",
  },
  {
    title: "item.2",
    value: "b",
    children: [
      {
        title: "item.2-1",
        value: "b.1",
      },
      {
        title: "item.2-2",
        value: "b.2",
      },
      {
        title: "item.2-3",
        value: "b.4",
      },
    ],
  },
  {
    title: "item.3",
    value: "c",
  },
];

const { posts, upsert, remove, reload, loading } = useQueryPosts();
const postSorted = computed(() => dataSortedByDateDesc(posts.value));

const current = ref("a");
const selection$ = ref([]);
const opened$ = ref();
// #eos

const ID$ = ref();
const add = async () => {
  await upsert({
    title: `title --${idGen()}`,
    content: `content --${idGen()}`,
  });
};
const update = async () => {
  if (!ID$.value) return;
  await upsert({ title: `--${Math.random()}` }, ID$.value);
};
const rm = async () => {
  if (!ID$.value) return;
  await remove(Number(ID$.value));
};
</script>
<template>
  <section class="page--demo.index">
    <VBtn @click="add">add</VBtn>
    <VBtn @click="update">update</VBtn>
    <VBtn @click="rm">rm</VBtn>
    <VBtn @click="reload">reload</VBtn>
    <br />
    <VTextField label="input" v-model.trim="ID$" />
    <!-- <VList
      v-model:selected="selection$"
      v-model:open="opened$"
      select-strategy="single-leaf"
      open-strategy="multiple"
      variant="tonal"
      mandatory
      class="*mx-auto py-0"
      elevation="8"
      rounded="lg"
      border="lg"
      width="212"
      lines="one"
      v-model="current"
      color="primary"
      :items="items"
    >
    <template #prepend="{ isSelected }">
      <VBtn v-if="!isSelected" block>ok</VBtn>
    </template>
  </VList> -->
    <Dump :data="loading" />
    <Dump :data="postSorted" />
    <!-- <Dump :data="selection$" /> -->
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
