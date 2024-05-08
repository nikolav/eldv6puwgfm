<script setup lang="ts">
const props = defineProps<{ topic: string }>();
const { length } = useDocs(() => toValue(props.topic));
// @@eos
</script>
<template>
  <slot :length="length" />
</template>
<style lang="scss" scoped>
</style>
