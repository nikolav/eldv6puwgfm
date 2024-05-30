<script setup lang="ts">
import { VCardPostHorizontal } from "@/components/app";
const props = defineProps<{ user: any; profile: any }>();
const uid = computed(() => get(props.user, "id"));
const { posts, loading } = useQueryPosts(uid);
const sortedPosts = computed(() => dataSortedByDateDesc(posts.value));

// @@eos
</script>
<template>
  <section class="component--CompanyDisplayPanePosts pa-4">
    <!-- list user stories -->
    <VDataIterator :items="sortedPosts" :items-per-page="-1" :loading="loading">
      <template #no-data>
        <VCardSubtitle class="text-center"
          >Trenutno nema postova.</VCardSubtitle
        >
        <VSkeletonLoader boilerplate type="card-avatar" class="opacity-60" />
      </template>
      <template #default="{ items }">
        <template v-for="(node, index) in items" :key="node.raw.id">
          <VSpacer class="mt-3" v-if="0 < index" />
          <VCardPostHorizontal :post="node.raw" />
        </template>
      </template>
    </VDataIterator>
  </section>
</template>
<style lang="scss" scoped></style>
