<script setup lang="ts">
const props = defineProps<{ profile: any }>();
// @@eos
</script>
<template>
  <section class="component--CompanyDisplayPaneAbout">
    <p class="prose indent-3 pa-3">{{ props.profile.about }}</p>
  </section>
</template>
<style lang="scss" scoped></style>
