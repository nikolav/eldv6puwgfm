<script setup lang="ts">
const props = defineProps<{ topic: string; small?: boolean | undefined }>();
const { count, like, dislike, isLiked, isDisliked } = useLikesDislikes(
  props.topic
);
// @@eos
</script>
<template>
  <VBtnGroup
    v-bind="$attrs"
    color="primary"
    :rounded="props.small ? 'lg' : 'pill'"
    density="compact"
    class="component--LikesDislikes *:!text-lg"
    :class="props.small ? 'd-inline-block' : undefined"
    :divided="!props.small ? true : undefined"
    elevation="0"
    :border="!props.small ? true : undefined"
    variant="flat"
  >
    <VBtn
      @click="() => like(!isLiked)"
      slim
      :size="props.small ? 'x-small' : 'small'"
      class="px-0 mx-0"
      :class="[
        !isLiked ? 'opacity-50' : undefined,
        props.small ? '!py-[2px]' : undefined,
      ]"
    >
      <strong
        :class="props.small ? 'text-sm' : undefined"
        class="translate-x-px -translate-y-[2px]"
        >👍🏼</strong
      ><small :class="!props.small ? 'ps-px' : undefined">
        <pre class="text-xs opacity-80">{{ count.likes.value }}</pre>
      </small>
    </VBtn>
    <VBtn
      @click="() => dislike(!isDisliked)"
      slim
      :size="props.small ? 'x-small' : 'small'"
      class="px-0 mx-0"
      :class="[
        !isDisliked ? 'opacity-50' : undefined,
        props.small ? '!py-[2px]' : undefined,
      ]"
      ><strong
        :class="props.small ? 'text-sm' : undefined"
        class="-translate-y-px -translate-x-px"
        >👎🏼</strong
      ><small :class="!props.small ? 'ps-px' : undefined">
        <pre class="text-xs -translate-x-[2px]">{{ count.dislikes.value }}</pre>
      </small></VBtn
    >
  </VBtnGroup>
</template>
<style lang="scss" scoped>
</style>
