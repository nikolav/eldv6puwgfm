<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { useDisplay } from "vuetify";
const props = defineProps<{ text?: string }>();
const { width } = useDisplay();
// @@eos
</script>
<template>
  <VContainer class="mt-5">
    <div class="d-flex items-center">
      <div v-if="722 < width">
        <slot name="prepend" />
      </div>
      <slot name="text">
        <h2
          class="ps-5 text-truncate font-sans tracking-wider opacity-80"
          :style="`font-size: ${720 < width ? '155%' : '88%'} !important`"
          v-bind="$attrs"
        >
          {{ props.text }}
        </h2>
      </slot>
      <slot name="append" />
    </div>
    <VDivider class="ma-0 border-opacity-50 mb-5 mt-3" length="88%" />
  </VContainer>
</template>
<style lang="scss" scoped></style>
