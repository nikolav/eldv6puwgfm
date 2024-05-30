<script setup lang="ts">
import Quill from "quill";
import { useDisplay } from "vuetify";
import {
  TopicRating,
  LikeDislike,
  TopicChat,
  SocialShareTopicButton,
  ProvidePostImage,
} from "@/components/app";

definePageMeta({
  layout: "blank",
});

const auth = useStoreApiAuth();
const route = useRoute();

onceOn(
  () => auth.initialized$ && !auth.isAuth$,
  () => {
    nextTick(() => {
      if (!auth.token$) auth.tokenPutDefault();
    });
  }
);

const { ratingPosts, likesPosts, chatPosts } = useTopics();
const {
  urls: { QUERY },
} = useAppConfig();
const sid_ = Number(last(String(get(route.query, QUERY)).split("-")));
const { posts } = useQueryPostsOnly(() => [sid_]);
const post = computed(() => first(posts.value));
const sid = computed(() => post.value?.id);
const shareUrl = useStoryPublicUrl(sid, () => post.value?.title);
const content_ = computed(() => post.value?.content);
const contentSemanticHTML = ref("");
onceMountedOn(content_, () => {
  watchEffect(() => {
    const q = new Quill(document.createElement("div"));
    q.setContents(JSON.parse(content_.value || ""));
    contentSemanticHTML.value = q.getSemanticHTML();
  });
});

const refContent = ref();
const { height: wHeight } = useDisplay();
const { top: contentTop } = useElementBounding(refContent);
const calcHeightContent = computed(
  () => wHeight.value - contentTop.value - 0.22
);

// @@eos
</script>
<template>
  <section class="page--prica-sid bg-stone-50 fill-height">
    <!-- <pre>ref# [{{ sid }}]</pre> -->
    <ProvidePostImage :post="post" v-slot="{ src: postImageSrc }">
      <VContainer fluid class="ma-0 pa-0 fill-height">
        <VRow no-gutters class="ma-0 pa-0 fill-height">
          <VCol sm="7">
            <div class="*pt-2">
              <div class="d-flex items-baseline pe-3">
                <!-- row:1, rating, social -->
                <TopicRating text :topic="ratingPosts(sid)" />
                <VSpacer />
                <div class="__placer__ d-flex items-center gap-7 translate-y-3">
                  <span class="__placer__ d-inline-flex">
                    <SocialShareTopicButton
                      color="primary-darken-1"
                      links-color="primary"
                      :icon-size="32"
                      :url="shareUrl"
                      :title="post?.title"
                      :image="postImageSrc"
                    />
                  </span>
                  <LikeDislike :topic="likesPosts(sid)" />
                  <TopicChat :title="post?.title" :topic="chatPosts(sid)" />
                </div>
              </div>
              <!-- row:2, title -->
              <VCardTitle>
                <h1 class="text-truncate border-b">
                  {{ post?.title }}
                </h1>
              </VCardTitle>
              <!-- row:3, content -->
              <div
                id="ID--OrRifT"
                ref="refContent"
                style="font-size: 111% !important"
                :style="`height: ${calcHeightContent}px`"
                class="!prose-lg indent-5 text-body-1 *!font-sans pa-3 overflow-auto scrollbar-thin-light pb-12"
                v-html="contentSemanticHTML"
              />
            </div>
          </VCol>
          <VCol
            sm="5"
            class="*bg-red-200 fill-height *d-flex *items-center justify-center"
          >
            <VImg
              :alt="post?.title"
              rounded
              cover
              :src="postImageSrc"
              class="*fill-height mt-3 mx-3"
            />
          </VCol>
        </VRow>
      </VContainer>
    </ProvidePostImage>
  </section>
</template>
<style lang="scss" scoped></style>
