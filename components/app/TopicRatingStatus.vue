<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps<{ topic: any }>();
const { rating } = useTopicRating(() => props.topic);

// @@eos
</script>
<template>
  <em class="component--TopicRatingStatus d-inline-flex items-center opacity-50">
    <VIcon
      v-bind="$attrs"
      color="orange-darken-2"
      class="*opacity-30"
      size="small"
      icon="$iconStarCircle"
    />
    <pre class="ms-1" style="font-size: 92%">{{ rating }}</pre>
  </em>
</template>
<style lang="scss" scoped>
</style>
