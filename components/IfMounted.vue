<script setup lang="ts">
const mounted = useMounted();
// const toggle = useToggleFlag();
// const { runSetup: onMounted } = useRunSetupOnce(toggle.on);
// watchEffect(() => {
//   if (mounted.value) onMounted();
// });
// @@eos
</script>
<template>
  <slot v-if="mounted" />
</template>
<style lang="scss" scoped>
</style>
