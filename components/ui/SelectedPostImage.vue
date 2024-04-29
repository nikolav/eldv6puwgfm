<script setup lang="ts">
import type { IPost, OrNoValue } from "@/types";
const props = defineProps<{ post: OrNoValue<IPost> }>();
const { publicUrl } = useApiStorage();
const sid$ = computed(() => get(props, "post.id"));
const { image } = useStoryImage(sid$);
const url$ = computed(() => publicUrl(get(image.value, "data.file_id") || ""));

// @@eos
</script>
<template>
  <slot :publicUrl="url$" :image="image" />
</template>
<style lang="scss" scoped>
</style>
