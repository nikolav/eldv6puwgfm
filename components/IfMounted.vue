<script setup lang="ts">
const toggleMounted = useToggleFlag();
onMounted(() => {
  nextTick(toggleMounted.on);
});
// @@eos
</script>
<template>
  <slot v-if="toggleMounted.isActive.value" />
</template>
<style lang="scss" scoped>
</style>
