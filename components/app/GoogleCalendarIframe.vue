<script setup lang="ts">
const props = defineProps<{ src: string }>();
// @@eos
</script>
<template>
  <iframe
    class="component--GoogleCalendarIframe"
    :src="props.src"
    v-bind="$attrs"
    style="border-width: 0"
    width="640"
    height="480"
    frameborder="0"
    scrolling="no"
  ></iframe>
</template>
