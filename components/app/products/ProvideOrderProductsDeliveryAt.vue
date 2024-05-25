<script setup lang="ts">
const props = defineProps<{
  oid: number | undefined;
}>();
const { productsDelivery } = useQueryManageOrder(() => props.oid);

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
