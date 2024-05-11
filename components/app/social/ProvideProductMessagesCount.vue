<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{ product: IProduct | undefined }>();
const { productChat } = useTopics();
const topic = computed(() => productChat(get(props.product, "id")));
const { length } = useDocs(topic);

// @@eos
</script>
<template>
  <slot :count="length" />
</template>
