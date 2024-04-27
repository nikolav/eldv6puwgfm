<script setup lang="ts">
import { Dump } from "@/components/dev";
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

const { posts } = useQueryPosts();

// watchEffect(() => {
//   console.log({ ID: uid.ID.value });
// });
// #eos
</script>
<template>
  <section class="page--demo.index">
    <Dump :data="{ posts: dataSortedByDateDesc(posts) }" />
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
    <!-- <Dump :data="selection$" /> -->
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
