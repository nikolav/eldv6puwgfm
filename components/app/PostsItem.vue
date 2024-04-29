<script setup lang="ts">
import type { IPost } from "@/types";
import { PostPublicLink } from "@/components/app";
const props = defineProps<{ post: IPost }>();
const emit = defineEmits<{
  (e: "postsRemove", id: number): void;
  (e: "postsEdit", id: number): void;
}>();

// @@eos
</script>
<template>
  <VHover open-delay="222">
    <template #default="{ isHovering, props }">
      <VSheet
        v-bind="props"
        position="relative"
        elevation="1"
        rounded
        class="pa-2"
      >
        <VFadeTransition>
          <div
            v-if="isHovering"
            class="end-1 top-1 absolute d-flex items-center"
          >
            <VBtn
              @click="$emit('postsEdit', post.id)"
              density="comfortable"
              variant="plain"
              size="small"
              icon
            >
              <VIcon color="primary-darken-1" size="large" icon="$edit" />
            </VBtn>
            <VBtn
              @click="$emit('postsRemove', post.id)"
              density="comfortable"
              variant="plain"
              size="small"
              icon="$iconTrash"
              color="error"
              class="ms-1"
            />
          </div>
        </VFadeTransition>
        <PostPublicLink :post="post" v-slot="{ publicUrl }">
          <NuxtLink
            :to="publicUrl"
            external
            target="_blank"
            class="d-flex items-center"
          >
            <small class="text-disabled text-xs me-[8px]">#{{ post.id }}</small>
            <a
              class="max-w-[69%] text-sm text-decoration-underline text-primary-darken-1 text-truncate d-inline-block"
            >
              {{ post.title }}
            </a>
          </NuxtLink>
        </PostPublicLink>
      </VSheet>
    </template>
  </VHover>
</template>
<style lang="scss" scoped>
</style>
