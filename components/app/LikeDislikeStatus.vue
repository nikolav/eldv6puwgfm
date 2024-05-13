<script setup lang="ts">
const props = defineProps<{ topic?: string }>();
const { likesCount, dislikesCount } = useTopicLikeDislike(() => props.topic);
// @@eos
</script>
<template>
  <em
    class="component--LikeDislikeStatus d-inline-flex items-center gap-4 opacity-60"
  >
    <!-- @@likes -->
    <span class="align-center">
      <VIcon
        color="success-darken-3"
        size="15"
        start
        icon="$iconThumbsUpOutline"
      />
      <pre style="font-size: 81%" class="d-inline-block">{{ likesCount }}</pre>
    </span>

    <!-- @@dislikes -->
    <span class="align-center">
      <VIcon
        color="error-darken-2"
        size="15"
        start
        icon="$iconThumbsDownOutline"
      />
      <pre style="font-size: 81%" class="d-inline-block">{{
        dislikesCount
      }}</pre>
    </span>
  </em>
</template>
<style lang="scss" scoped>
</style>
