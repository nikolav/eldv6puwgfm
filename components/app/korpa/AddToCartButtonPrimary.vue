<script setup lang="ts">
import type { IProduct } from "@/types";

const SCALE_icon = 0.73;
const SIZE_default = 52;
const props = withDefaults(defineProps<{ product: IProduct; size: number }>(), {
  size: SIZE_default,
});
const iconSize_ = computed(() =>
  props.size ? SCALE_icon * Number(props.size) : SIZE_default
);
const auth = useStoreApiAuth();
const ownProduct = computed(
  () => props.product?.user_id == get(auth.user$, "id")
);

const cart = useStoreCart();
watchEffect(() => {
  console.log(props.product);
});
// @@eos
</script>
<template>
  <VBtn
    :disabled="ownProduct"
    :class="[ownProduct ? '!opacity-20' : undefined]"
    class="component--addToCartCircle group/addToCartCircle"
    icon
    rounded="circle"
    :size="size"
    elevation="2"
    variant="elevated"
    color="primary2-darken-1"
    @click="cart.increase(product?.id, 1)"
  >
    <VBadge
      location="top start"
      offset-y="2"
      :model-value="cart.has(product?.id)"
      icon
      color="primary3"
    >
      <!-- <VBadge :model-value="true" icon color="primary3"> -->
      <template #badge>
        <pre>{{ cart.count(product?.id) }}</pre>
      </template>
      <VIcon
        class="transition-transform translate-x-[3px] group-hover/addToCartCircle:scale-[112%] group-hover/addToCartCircle:-rotate-2"
        :size="iconSize_"
        icon="$iconKantarKorpa2"
      />
    </VBadge>
  </VBtn>
</template>
<style lang="scss" scoped></style>
