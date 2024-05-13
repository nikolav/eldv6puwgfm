<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const props = defineProps<{ text: string }>();
// @@eos
</script>
<template>
  <VContainer class="mt-5">
    <div class="d-flex items-center">
      <slot name="prepend" />
      <h2
        class="ps-5 text-truncate font-sans tracking-wider opacity-80"
        style="font-size: 155%"
        v-bind="$attrs"
      >
        {{ props.text }}
      </h2>
      <slot name="append" />
    </div>
    <VDivider class="ma-0 border-opacity-50 mb-8 mt-3" length="88%" />
  </VContainer>
</template>
<style lang="scss" scoped>
</style>
