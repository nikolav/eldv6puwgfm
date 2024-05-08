<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import type { ITopicChatMessage } from "@/types";
import { TopicChatButtonBase, ChatRenderSimpleList } from "@/components/app";

const { CHAT_MAIN } = useTopics();
const topicChatMain = useGlobalVariable(CHAT_MAIN);
const topicChatMainClose = () => {
  topicChatMain.value = undefined;
};

const { data, remove: chatMessageRemove } =
  useDocs<ITopicChatMessage>(topicChatMain);
const chat$ = computed(() => dataSortedByDateDesc(data.value));
const modelUpdate = (m: any) => {
  if (!m) topicChatMainClose();
};
useEventListener("keyup", ({ key }) => {
  if ("escape" === String(key).toLowerCase()) topicChatMainClose();
});
// @@eos
</script>
<template>
  <div>
    <!-- @@provides -->
    <!-- @@sidebar -->
    <VNavigationDrawer
      :model-value="!!topicChatMain"
      @update:model-value="modelUpdate"
      v-bind="$attrs"
      order="-1"
      location="right"
      width="412"
      elevation="3"
      temporary
      absolute
    >
      <slot name="title" />
      <TopicChatButtonBase
        :topic="topicChatMain"
        :is-active="!!topicChatMain"
      />
      <VSheet class="__placer__ pa-2 *bg-red pt-10">
        <ChatRenderSimpleList :chat="chat$" :remove="chatMessageRemove" />
      </VSheet>
      <VBtn
        @click="topicChatMainClose"
        icon="$close"
        position="absolute"
        variant="text"
        class="top-1 end-1 z-[1]"
        density="comfortable"
      >
        <VIcon icon="$close" size="large" />
      </VBtn>
    </VNavigationDrawer>
  </div>
</template>
<style lang="scss" scoped>
</style>
