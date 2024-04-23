<script setup lang="ts">
import type { ITopicChatMessage, IDoc, TDocData } from "@/types";
import { ChatSimpleMessage } from "@/components/app";
import { useDisplay } from "vuetify";
const props = defineProps<{
  chat: IDoc<TDocData<ITopicChatMessage>>[];
  remove: (id: number) => void;
}>();
const { smAndUp } = useDisplay();
const { $date } = useNuxtApp();
const dateFormatedFromNow = (d: string) => $date(d).utc(true).fromNow(true);

// @@eos
</script>
<template>
  <VSheet v-bind="$attrs" class="overflow-auto scrollbar-thin-light">
    <VDataIterator :items="props.chat" :items-per-page="-1">
      <template #no-data> --no-data </template>
      <template #default="{ items }">
        <div class="space-y-1 pa-1" :class="!smAndUp ? 'mt-2' : undefined">
          <template v-for="node in items" :key="node.raw.id">
            <ChatSimpleMessage
              class="pa-2 px-4"
              elevation="1"
              :doc="node.raw"
              :dateFormated="dateFormatedFromNow"
              :remove="remove"
            />
          </template>
        </div>
      </template>
    </VDataIterator>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
