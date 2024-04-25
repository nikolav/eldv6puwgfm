<script setup lang="ts">
const props = defineProps<{ profile: any }>();
// @@eos
</script>
<template>
  <section class="component--CompanyDisplayPaneAbout">
    <p class="prose indent-2 pa-2">{{ props.profile.about.value }}</p>
  </section>
</template>
<style lang="scss" scoped>
</style>
