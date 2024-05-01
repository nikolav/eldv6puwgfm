<script setup lang="ts">
const SCALE_icon = 0.73;
const SIZE_default = 52;
const props = withDefaults(defineProps<{ productId: number; size: number }>(), {
  size: SIZE_default,
});
const iconSize_ = computed(() =>
  props.size ? SCALE_icon * Number(props.size) : SIZE_default
);
const cart = useStoreCart();
// @@eos
</script>
<template>
  <VBtn
    class="component--addToCartCircle group/addToCartCircle"
    icon
    rounded="circle"
    :size="props.size"
    elevation="2"
    variant="elevated"
    color="primary2-darken-1"
    @click="cart.increase(props.productId, 1)"
  >
    <VBadge
      location="top start"
      offset-y="2"
      :model-value="cart.has(props.productId)"
      icon
      color="primary3"
    >
      <!-- <VBadge :model-value="true" icon color="primary3"> -->
      <template #badge>
        <pre>{{ cart.count(props.productId) }}</pre>
      </template>
      <VIcon
        class="transition-transform translate-x-[3px] group-hover/addToCartCircle:scale-[112%] group-hover/addToCartCircle:-rotate-2"
        :size="iconSize_"
        icon="$iconKantarKorpa2"
      />
    </VBadge>
  </VBtn>
</template>
<style lang="scss" scoped>
</style>
