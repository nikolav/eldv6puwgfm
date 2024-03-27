<script setup lang="ts">
definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

const perPage = 12;
const data = Array.from({ length: 55 }, (val, key) => ({
  id: key,
  data: idGen(),
  selectable: true,
}));
const page$ = ref(1);
const i$ = ref();

// #eos
</script>
<template>
  <section class="page--company-profile">
    <pre>[{{ i$ }}]</pre>
    <VPagination
      rounded="circle"
      :length="Math.ceil(data.length / perPage)"
      v-model="page$"
    />
    <VDataIterator
      show-select
      item-selectable="selectable"
      item-value="id"
      v-model="i$"
      :items="data"
      :page="page$"
      :items-per-page="perPage"
      select-strategy="single"
    >
      <template #default="{ items, toggleSelect }">
        <template v-for="node in items" :key="node.raw.id">
          <p @click="toggleSelect(node)">{{ node.raw.data }}</p>
        </template>
      </template>
    </VDataIterator>
  </section>
</template>
<style lang="scss" scoped>
</style>
