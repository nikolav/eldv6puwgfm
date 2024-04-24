<script setup lang="ts">
const {
  links: {
    external: { SRC_GOOGLE_CALENDAR_IFRAME },
  },
} = useAppConfig();
// @@eos
</script>
<template>
  <iframe
    :src="SRC_GOOGLE_CALENDAR_IFRAME"
    v-bind="$attrs"
    class="component--GoogleCalendarIframe"
    style="border-width: 0"
    width="640"
    height="480"
    frameborder="0"
    scrolling="no"
  ></iframe>
</template>
<style lang="scss" scoped>
</style>
