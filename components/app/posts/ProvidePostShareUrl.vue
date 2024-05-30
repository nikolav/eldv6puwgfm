<script setup lang="ts">
const props = defineProps<{ post: any }>();
const url = useStoryPublicUrl(
  () => get(props.post, "id"),
  () => get(props.post, "title")
);

// @@eos
</script>
<template>
  <slot :url="url" />
</template>
