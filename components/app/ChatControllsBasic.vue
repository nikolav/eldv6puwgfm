<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { ITopicChatMessage } from "@/types";
const props = defineProps<{
  topic: string;
}>();
const emit = defineEmits<{
  (e: "messageSaved"): void;
}>();
const { smAndUp } = useDisplay();
const {
  key: { CHAT_NAME },
} = useAppConfig();
const { watchProcessing } = useStoreAppProcessing();
const chatName$ = useLocalStorage(CHAT_NAME, () => "", { initOnMounted: true });
const chatMessage$ = ref("");
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const { upsert: commit, loading } = useDocs<ITopicChatMessage>(
  () => props.topic
);
watchProcessing(loading);
const messageSubmit = async () => {
  let err_: any;
  if (!chatMessage$.value) return;
  try {
    await commit({
      message: chatMessage$.value,
      uid: uid.value || "",
      ...(chatName$.value ? { name: chatName$.value } : ""),
    });
  } catch (error) {
    err_ = error;
    // pass
  }
  if (!err_) {
    chatMessage$.value = "";
    emit("messageSaved");
  }
};
// @@eos
</script>
<template>
  <VSheet class="component--ChatControllsBasic">
    <VForm
      class="w-full pa-2 ps-4"
      @submit.prevent="messageSubmit"
      autocomplete="off"
    >
      <VTextField
        name="topic_chat_name"
        v-model.trim="chatName$"
        label="Ime *"
        variant="underlined"
      />
      <VTextarea
        name="topic_chat_message"
        v-model.trim="chatMessage$"
        clearable
        label="Poruka *"
        variant="underlined"
      />
      <VCardActions>
        <VSpacer />
        <slot name="submit-btn">
          <VBtn
            variant="tonal"
            type="submit"
            icon
            color="primary"
            size="x-large"
            class="mb-2 me-4"
          >
            <VIcon icon="$iconPaperPlane" size="35" />
          </VBtn>
        </slot>
        <VSpacer v-if="!smAndUp" />
      </VCardActions>
    </VForm>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
