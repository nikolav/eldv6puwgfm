<script setup lang="ts">
// @@eos
</script>
<template>
  <VSheet class="component--CardOrderConfirmSuccess">
    <p>success order sent</p>
    <VBtn @click="$emit('order-confirmed')">ok:clear</VBtn>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
