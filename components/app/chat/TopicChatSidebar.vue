 <script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import type { ITopicChatMessage } from "@/types";
import { TopicChatButtonBase, ChatRenderSimpleList } from "@/components/app";
const props = defineProps<{
  topic: string;
  modelValue?: any;
}>();
const {
  data,
  length,
  remove: chatMessageRemove,
} = useDocs<ITopicChatMessage>(props.topic);
const chat$ = computed(() => dataSortedByDateDesc(data.value));

// @@eos
</script>
<template>
  <div>
    <!-- @@provides -->
    <slot :length="length" />
    <!-- @@sidebar -->
    <VNavigationDrawer
      :model-value="!!modelValue"
      @update:model-value="(v) => $emit('update:modelValue', v)"
      v-bind="$attrs"
      order="-1"
      location="right"
      width="412"
      elevation="3"
      temporary
    >
      <slot name="title" />
      <TopicChatButtonBase :topic="props.topic" :is-active="modelValue" />
      <VSheet class="__placer__ pa-2 *bg-red">
        <ChatRenderSimpleList :chat="chat$" :remove="chatMessageRemove" />
      </VSheet>
    </VNavigationDrawer>
  </div>
</template>
<style lang="scss" scoped>
</style>
