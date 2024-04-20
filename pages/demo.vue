<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const productId$ = ref("122");
const fetchNextProduct = () => {
  productId$.value = "122" != productId$.value ? "122" : "333";
};

const { like, dislike, count, isLiked, isDisliked } =
  useLikesDislikes(productId$);
const likeToggle = async () => await like(!isLiked.value);
const dislikeToggle = async () => await dislike(!isDisliked.value);
// #eos
</script>
<template>
  <section class="page--demo">
    <VBtn @click="fetchNextProduct">[{{ productId$ }}]</VBtn>
    <div>
      <p>likes: [{{ count.likes.value }}]</p>
      <p>dislikes: [{{ count.dislikes.value }}]</p>
      <VBtn :variant="isLiked ? 'elevated' : 'tonal'" @click="likeToggle"
        >like</VBtn
      >
      <VBtn :variant="isDisliked ? 'elevated' : 'tonal'" @click="dislikeToggle"
        >dislike</VBtn
      >
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style>
