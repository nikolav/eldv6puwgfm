<script setup lang="ts">
// # https://valgeirb.github.io/vue3-popper/guide/api.html#api
import Popper from "vue3-popper";
import "@/assets/styles/components/Popup.scss";

// @@eos
</script>
<template>
  <Popper v-bind="$attrs">
    <slot></slot>
    <template #content="props">
      <slot name="content" v-bind="props"></slot>
    </template>
  </Popper>
</template>
<style lang="scss" scoped>
</style>
