<script setup lang="ts">
const props = defineProps<{
  light?: boolean;
  topic: string;
  small?: boolean | undefined;
}>();

const { like, dislike, likesCount, dislikesCount, isLiked, isDisliked } =
  useTopicLikeDislike(() => props.topic);

// const ld = useStoreLikeDislike();
// const topic$ = computed(() => toValue(props.topic));
// const isLiked = computed(() => ld.isLiked(topic$.value));
// const isDisliked = computed(() => ld.isDisliked(topic$.value));
// const countLikes = computed(() => ld.likesCount(topic$.value));
// const countDisLikes = computed(() => ld.dislikesCount(topic$.value));
// const likeTopic = async (flag = true) => await ld.like(topic$.value, flag);
// const dislikeTopic = async (flag = true) =>
//   await ld.dislike(topic$.value, flag);

// @@eos
</script>
<template>
  <VBtnGroup
    v-bind="$attrs"
    color="primary"
    :rounded="props.small ? 'lg' : 'pill'"
    density="compact"
    class="component--LikeDislike *:!text-lg"
    :class="props.small ? 'd-inline-block' : undefined"
    :divided="!props.small ? true : undefined"
    elevation="0"
    :border="!props.small ? true : undefined"
    :variant="props.light ? 'outlined' : 'flat'"
  >
    <VBtn
      @click="like(!isLiked)"
      slim
      :size="props.small ? 'x-small' : 'small'"
      class="px-0 mx-0"
      :class="[
        !isLiked
          ? 'opacity-50'
          : ['opacity-100', props.light ? 'bg-primary2' : ''],
        props.small ? '!py-[2px]' : undefined,
      ]"
    >
      <strong
        :class="props.small ? 'text-sm' : undefined"
        class="translate-x-px -translate-y-[2px]"
        >👍🏼</strong
      ><small :class="!props.small ? 'ps-px' : undefined">
        <pre class="text-xs opacity-80">{{ likesCount }}</pre>
      </small>
    </VBtn>
    <VBtn
      @click="dislike(!isDisliked)"
      slim
      :size="props.small ? 'x-small' : 'small'"
      class="px-0 mx-0"
      :class="[
        !isDisliked
          ? 'opacity-50'
          : ['opacity-100', props.light ? 'bg-primary2' : ''],
        props.small ? '!py-[2px]' : undefined,
      ]"
      ><strong
        :class="props.small ? 'text-sm' : undefined"
        class="-translate-y-px -translate-x-px"
        >👎🏼</strong
      ><small :class="!props.small ? 'ps-px' : undefined">
        <pre class="text-xs -translate-x-[2px]">{{ dislikesCount }}</pre>
      </small></VBtn
    >
  </VBtnGroup>
</template>
<style lang="scss" scoped>
</style>
