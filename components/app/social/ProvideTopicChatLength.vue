<script setup lang="ts">
const props = defineProps<{ topic: any }>();
const { length } = useDocs(() => props.topic);

// @@eos
</script>
<template>
  <slot :count="length" />
</template>
