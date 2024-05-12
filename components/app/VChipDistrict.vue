<script setup lang="ts">
const props = defineProps<{
  district: any;
}>();
// @@eos
</script>
<template>
  <VChip>
    <template #prepend>
      <VIcon start icon="$iconLocation" class="!opacity-40 ps-[2px]" />
    </template>
    <small class="*text-medium-emphasis">{{ props.district }}</small>
  </VChip>
</template>
<style lang="scss" scoped>
</style>
