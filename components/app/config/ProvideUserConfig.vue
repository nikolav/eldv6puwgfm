<script setup lang="ts">
const props = defineProps<{ uid: any }>();
const { ordersShowCompleted, toggleOrdersShowCompleted } = useDocConfig(
  () => props.uid
);
// @@eos
</script>
<template>
  <slot :props="{ ordersShowCompleted, toggleOrdersShowCompleted }" />
</template>
<style lang="scss" scoped></style>
