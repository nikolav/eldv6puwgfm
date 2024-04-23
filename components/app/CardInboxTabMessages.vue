<script setup lang="ts">
import type { ITopicChatMessage } from "@/types";
import { ChatRenderSimpleList, ChatControllsBasic } from "@/components/app";
import { useDisplay } from "vuetify";

const { smAndUp } = useDisplay();
const {
  key: { TOPIC_CHAT_COM_prefix, APP_PROCESSING },
} = useAppConfig();
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const topic = `${TOPIC_CHAT_COM_prefix}${uid.value}`;
const {
  data,
  remove,
  loading: chatProcessing,
} = useDocs<ITopicChatMessage>(topic);
const chat = computed(() => docsSortedDesc(data.value));
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
watchEffect(() => {
  appProcessing$.value = chatProcessing.value;
});

// @@eos
</script>
<template>
  <section class="component--CardInboxTabMessages">
    <VContainer fluid class="*bg-red pt-0">
      <VRow no-gutters>
        <VCol cols="12" sm="7" :order="1" :order-sm="0">
          <ChatRenderSimpleList
            max-height="492"
            :chat="chat"
            :remove="remove"
            elevation="1"
            class="pt-1 pb-2"
          />
        </VCol>
        <VCol cols="12" sm="5">
          <ChatControllsBasic
            :topic="topic"
            :class="smAndUp ? 'ms-4' : undefined"
            elevation="1"
          />
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>
<style lang="scss" scoped>
</style>
