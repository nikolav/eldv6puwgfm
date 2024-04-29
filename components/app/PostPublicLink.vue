<script setup lang="ts">
import type { IPost } from "@/types";
const props = defineProps<{ post: IPost }>();
const publicUrl$ = useStoryPublicUrl(props.post.id, props.post.title);

// @@eos
</script>
<template>
  <slot :publicUrl="publicUrl$" />
</template>
<style lang="scss" scoped>
</style>
