<script setup lang="ts">
import { SpinnerBeat } from "@/components/spinners";

const flags = useStoreFlags();
const {
  key: { APP_PROCESSING },
  layout: { appBarHeight },
} = useAppConfig();

// #eos
</script>

<template>
  <VFadeTransition>
    <strong
      v-if="flags.isSet(APP_PROCESSING)"
      class="*bg-red-600/20 position-fixed left-1/2 -translate-x-[50%] -translate-y-[50%] z-[9999]"
      :style="`top: calc(${Math.floor(appBarHeight / 2)}px + .25rem)`"
    >
      <SpinnerBeat v-bind="$attrs" />
    </strong>
  </VFadeTransition>
</template>

<style scoped></style>
