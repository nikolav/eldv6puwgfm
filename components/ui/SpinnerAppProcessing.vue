<script setup lang="ts">
import { SpinnerBeat } from "@/components/spinners";

const flags = useStoreFlags();
const { APP_PROCESSING } = useAppConfig().key;

// #eos
</script>

<template>
  <VFadeTransition>
    <strong
      v-if="flags.isSet(APP_PROCESSING)"
      class="*bg-red-600/20 position-fixed top-16 left-1/2 -translate-x-[50%] -translate-y-[50%] z-[9999]"
    >
      <SpinnerBeat v-bind="$attrs" />
    </strong>
  </VFadeTransition>
</template>

<style scoped>
</style>
