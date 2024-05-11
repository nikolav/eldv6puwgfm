<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product: IProduct | undefined }>();
const { likesProduct } = useTopics();
const topic = computed(() => likesProduct(get(props.product, "id")));
// @@eos
</script>
<template>
  <slot :topic="topic" />
</template>
<style lang="scss" scoped>
</style>
