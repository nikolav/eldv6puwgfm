<script setup lang="ts">
const props = defineProps<{ profile: any }>();
// @@eos
</script>
<template>
  <section class="component--CompanyDisplayPaneDelivery">
    <p class="prose indent-3 pa-3">{{ props.profile.delivery }}</p>
  </section>
</template>
<style lang="scss" scoped></style>
