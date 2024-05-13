<script setup lang="ts">
const props = defineProps<{ com?: any }>();
const { user: company } = useQueryUsersSingle(() => get(props.com, "id"));
// @@eos
</script>
<template>
  <slot :company="company" />
</template>
<style lang="scss" scoped>
</style>
