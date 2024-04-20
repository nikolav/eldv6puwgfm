<script setup lang="ts">
const props = defineProps<{ topic: string }>();
const { count, like, dislike, isLiked, isDisliked } = useLikesDislikes(
  props.topic
);
// @@eos
</script>
<template>
  <VBtnGroup
    color="primary"
    rounded="pill"
    density="compact"
    class="component--LikesDislikes *:!text-lg"
    divided
    elevation="0"
    border
    variant="flat"
  >
    <VBtn
      @click="() => like(!isLiked)"
      slim
      size="small"
      class="px-0 mx-0"
      :class="!isLiked ? 'opacity-50' : undefined"
    >
      <strong class="translate-x-px -translate-y-[3px]">👍🏼</strong
      ><small class="ps-px">
        <pre class="text-xs">{{ count.likes.value }}</pre>
      </small>
    </VBtn>
    <VBtn
      @click="() => dislike(!isDisliked)"
      slim
      size="small"
      class="px-0 mx-0"
      :class="!isDisliked ? 'opacity-50' : undefined"
      ><strong class="-translate-y-px">👎🏼</strong
      ><small class="ps-px">
        <pre class="text-xs">{{ count.dislikes.value }}</pre>
      </small></VBtn
    >
  </VBtnGroup>
</template>
<style lang="scss" scoped>
</style>
