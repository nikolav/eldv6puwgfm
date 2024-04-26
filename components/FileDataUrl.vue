<script setup lang="ts">
const props = defineProps<{ file: any }>();
const fileDataUrl = ref();
watchEffect(async () => {
  const file = toValue(props.file);
  fileDataUrl.value = null != file ? await dataUrl(file) : undefined;
});
// @@eos
</script>
<template>
  <slot :url="fileDataUrl" />
</template>
<style lang="scss" scoped>
</style>
