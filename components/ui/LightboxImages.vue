<script setup lang="ts">
import type { IDoc, IStorageFileInfo } from "@/types";
const props = defineProps<{
  images: IDoc<IStorageFileInfo>[];
  captions?: string[];
}>();
// import { ProductImages } from "@/components/app";
const { publicUrl } = useApiStorage(true, true);
const { $lightbox } = useNuxtApp();
const gallery = computed(() =>
  map(props.images, (node, i) => ({
    src: publicUrl(get(node, "data.file_id")),
    caption: get(props, `captions[${i}]`) || get(node, "data.description"),
  }))
);
const bindProps = {
  onClick: () => $lightbox.open(gallery.value),
  ...props,
};
// @@eos
</script>
<template>
  <slot name="activator" v-bind="bindProps">
    <VBtn color="primary" size="small" v-bind="bindProps">slike</VBtn>
  </slot>
</template>
<style lang="scss" scoped>
</style>
