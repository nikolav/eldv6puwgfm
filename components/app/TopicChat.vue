<script setup lang="ts">
import type { ITopicChatMessage } from "@/types";
import { TopicChatDisplayCard } from "@/components/app";
const props = defineProps<{
  topic: string;
  title?: string | undefined;
  small?: boolean | undefined;
}>();
const { length: chatLength_ } = useDocs<ITopicChatMessage>(props.topic);

// @@eos
</script>
<template>
  <VBadge
    color="primary3-darken-1"
    :model-value="0 < chatLength_"
    class="component--TopicChat"
    offset-x="0"
    offset-y="9"
  >
    <template #badge>
      <pre>{{ chatLength_ }}</pre>
    </template>
    <VBtn
      class="opacity-85"
      v-bind="$attrs"
      variant="elevated"
      color="primary"
      icon
      size="small"
    >
      <VAvatar><strong class="!text-[1.122rem]">💬</strong></VAvatar>
      <VMenu
        activator="parent"
        location="start top"
        :offset="[4, 12]"
        transition="slide-y-reverse-transition"
        :close-on-content-click="false"
      >
        <template #default="{ isActive }">
          <TopicChatDisplayCard
            :close="
              () => {
                isActive.value = false;
              }
            "
            :topic="props.topic"
            :title="$props.title"
          />
        </template>
      </VMenu>
    </VBtn>
  </VBadge>
</template>
<style lang="scss" scoped>
</style>
