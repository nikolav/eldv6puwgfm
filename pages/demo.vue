<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const toggle = useToggleFlag();
const TOPIC = computed(() => toggle.isActive.value ? '@1' : '@0');
const { like, dislike, count, isLiked, isDisliked } =
  useLikesDislikes(TOPIC);
// #eos
</script>
<template>
  <section class="page--demo">
    <VBtn @click="toggle">toggle</VBtn>
    <div>
      <p>likes: [{{ count.likes.value }}]</p>
      <p>dislikes: [{{ count.dislikes.value }}]</p>
      <VBtn :variant="isLiked ? 'elevated' : 'tonal'" @click="() => like(!isLiked)">like</VBtn>
      <VBtn :variant="isDisliked ? 'elevated' : 'tonal'" @click="() => dislike(!isDisliked)">dislike</VBtn>
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style>
