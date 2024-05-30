<script setup lang="ts">
import { ProvideTopicChatLength } from "@/components/app";
const props = defineProps<{ post: any }>();
const sid = computed(() => get(props.post, "id"));
const { chatPosts } = useTopics();
// @@eos
</script>
<template>
  <ProvideTopicChatLength :topic="chatPosts(sid)" v-slot="{ count }">
    <VBadge
      inline
      v-if="0 < count"
      color="info"
      :content="count"
      class="opacity-50 scale-[92%]"
    >
      💬
    </VBadge>
  </ProvideTopicChatLength>
</template>
<style lang="scss" scoped></style>
