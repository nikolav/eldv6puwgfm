<script setup lang="ts">
import Quill from "quill";
import type { IPost } from "@/types";
import {
  TopicRatingStatus,
  LikeDislikeStatus,
  PostChatStatus,
  ProvidePostImage,
  ProvidePostShareUrl,
} from "@/components/app";
const props = defineProps<{ post: IPost | undefined }>();

const content_ = computed(() => props.post?.content);
const contentText = ref("");
onceMountedOn(content_, () => {
  const q = new Quill(document.createElement("div"));
  q.setContents(JSON.parse(content_.value || ""));
  contentText.value = q.getText() || "";
});

const { ratingPosts, likesPosts } = useTopics();

// @@eos
</script>
<template>
  <ProvidePostShareUrl :post="post" v-slot="{ url }">
    <ProvidePostImage :post="post" v-slot="{ src: postImageSrc }">
      <NuxtLink :to="url" target="_blank" external>
        <VSheet
          elevation="1"
          height="144"
          rounded="lg"
          class="component--VCardPostHorizontal !grid grid-cols-[155px,1fr] !bg-stone-50 overflow-hidden"
        >
          <VImg cover :src="postImageSrc" class="fill-height" />
          <div class="__spacer__ fill-height">
            <!-- row:1, social:status -->
            <div
              class="__spacer__ d-flex items-center gap-8 ps-5 pt-1 opacity-50"
            >
              <TopicRatingStatus :topic="ratingPosts(post?.id)" />
              <LikeDislikeStatus :topic="likesPosts(post?.id)" />
              <PostChatStatus :post="post" />
            </div>
            <!-- row:2, title -->
            <VCardTitle style="font-size: 92%">
              <a class="link--prominent-base text-primary-darken-1">
                {{ post?.title }}
              </a>
            </VCardTitle>
            <!-- row:3, content:start -->
            <VCardText class="!line-clamp-2 indent-3 text-medium-emphasis">
              {{ contentText }}
            </VCardText>
          </div>
        </VSheet>
      </NuxtLink>
    </ProvidePostImage>
  </ProvidePostShareUrl>
</template>
<style lang="scss" scoped></style>
