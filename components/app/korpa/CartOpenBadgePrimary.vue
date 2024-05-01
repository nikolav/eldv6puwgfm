<script setup lang="ts">
const {
  layout: { appBarHeight },
} = useAppConfig();
const props = withDefaults(
  defineProps<{
    size: number;
    badgeOffset: number;
  }>(),
  {
    size: 72,
    badgeOffset: 14,
  }
);
const cart = useStoreCart();
// @@eos
</script>
<template>
  <VBtn
    variant="elevated"
    @click="cart.open"
    icon
    rounded="circle"
    :size="props.size"
    elevation="3"
    v-bind="$attrs"
  >
    <VBadge
      :model-value="!cart.isEmpty"
      :offset-y="props.badgeOffset"
      :offset-x="props.badgeOffset"
      color="error"
    >
      <!-- <VIcon icon="$iconKorpaKantar" :size="props.size" /> -->
      <VIcon icon="$iconKorpaKantar" :size="props.size * 0.97" />
      <template #badge>
        <pre>{{ cart.length }}</pre>
      </template>
    </VBadge>
  </VBtn>
</template>
