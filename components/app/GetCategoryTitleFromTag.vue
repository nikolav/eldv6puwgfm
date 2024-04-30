<script setup lang="ts">
const props = defineProps<{ categoryTag: string | undefined }>();
const {
  products: { categories },
} = useAppConfig();
const category = computed(
  () => find(categories, { value: props.categoryTag })?.title
);

// @@eos
</script>
<template>
  <slot :category="category" />
</template>
<style lang="scss" scoped>
</style>
