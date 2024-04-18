<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const items = [
  {
    title: "Dashboard",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Link 1",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
  {
    title: "Link 2",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
];

// #eos
</script>
<template>
  <section class="page--demo">
    <VSheet width="512" class="mx-auto">
      <VBreadcrumbs divider="•" :items="items" />
    </VSheet>
  </section>
</template>
<style lang="scss" scoped>
</style>
