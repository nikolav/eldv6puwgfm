<script setup lang="ts">
import { Dump } from "@/components/dev";
import { LikeDislike } from "@/components/app";
definePageMeta({
  layout: "blank",
});
// const { store, isLiked, isDisliked, likesCount, dislikesCount, like, dislike } =
//   useLikeDislikeTopic("foo:12");
const { store } = useStoreLikeDislike();
const ID$ = ref("foo3");

// #eos
</script>
<template>
  <section class="page--demo.index">
    <LikeDislike :topic="ID$" />
    <!-- <VBtn @click="like(true)">like</VBtn>
    <VBtn @click="like(false)">unlike</VBtn>
    <VBtn @click="dislike(true)">dislike</VBtn>
    <VBtn @click="dislike(false)">undislike</VBtn>
     -->
    <Dump
      :data="{
        store,
      }"
    />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
