<script setup lang="ts">
const props = defineProps<{
  oid: number | undefined;
  uid: number | undefined;
}>();
const { productsStatus } = useQueryManageOrder(
  () => props.oid,
  () => props.uid
);
const orderStatus = computed(() =>
  isEmpty(productsStatus.value) ? undefined : firstValue(productsStatus.value)
);

// @@eos
</script>
<template>
  <slot :orderStatus="orderStatus" />
</template>
<style lang="scss" scoped></style>
