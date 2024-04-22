<script setup lang="ts">
import { ChatRenderSimpleList } from "@/components/app";
const {
  key: { TOPIC_CHAT_COM_prefix, APP_PROCESSING },
} = useAppConfig();

const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const {
  data,
  remove,
  loading: chatProcessing,
} = useDocs(`${TOPIC_CHAT_COM_prefix}${uid.value}`);
const chat = computed(() => docsSortedDesc(data.value));
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
watchEffect(() => {
  appProcessing$.value = chatProcessing.value;
});

// @@eos
</script>
<template>
  <section class="component--CardInboxTabMessages">
    <VContainer fluid>
      <VRow no-gutters>
        <VCol cols="12" sm="7">
          <ChatRenderSimpleList
            max-height="320"
            :chat="chat"
            :remove="remove"
          />
        </VCol>
        <VCol cols="12" sm="5">2</VCol>
      </VRow>
    </VContainer>
  </section>
</template>
<style lang="scss" scoped>
</style>
