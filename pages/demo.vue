<script setup lang="ts">
const toggle = useToggleFlag();

// #eos
</script>
<template>
  <section class="page-demo">
    <VBtn @click="toggle">:[{{ toggle.isActive.value }}]</VBtn>
  </section>
</template>
<style lang="scss" scoped>
</style>
