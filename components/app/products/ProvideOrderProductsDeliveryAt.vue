<script setup lang="ts">
const props = defineProps<{
  oid: number | undefined;
  uid?: number | undefined;
}>();
const { productsDelivery } = useQueryManageOrder(
  () => props.oid,
  () => props.uid
);

const deliveryAt = computed(() =>
  isEmpty(productsDelivery.value)
    ? undefined
    : firstValue(productsDelivery.value)
);

// @@eos
</script>
<template>
  <slot :delivery-at="deliveryAt" />
</template>
<style lang="scss" scoped></style>
