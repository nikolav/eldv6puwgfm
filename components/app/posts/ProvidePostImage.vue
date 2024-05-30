<script setup lang="ts">
const props = defineProps<{ post: any }>();
const sid = computed(() => get(props.post, "id"));
const { src } = useStoryImage(sid);
// @@eos
</script>
<template>
  <slot :src="src" />
</template>
