<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { ITopicChatMessage } from "@/types";
const { smAndUp } = useDisplay();
const {
  key: { CHAT_NAME, TOPIC_CHAT_COM_prefix },
} = useAppConfig();
const chatName$ = useLocalStorage(CHAT_NAME, () => "", { initOnMounted: true });
const chatMessage$ = ref("");
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const { upsert: save } = useDocs<ITopicChatMessage>(
  `${TOPIC_CHAT_COM_prefix}${uid.value}`
);
const messageSubmit = async () => {
  console.log(`@messageSubmit --ChatControllsBasic`);
  let err_: any;
  if (!chatMessage$.value) return;
  try {
    await save({
      message: chatMessage$.value,
      uid: uid.value || "",
      ...(chatName$.value ? { name: chatName$.value } : undefined),
    });
  } catch (error) {
    err_ = error;
    // pass
  }
  if (!err_) {
    chatMessage$.value = "";
  }
};

// @@eos
</script>
<template>
  <VSheet v-bind="$attrs" class="component--ChatControllsBasic">
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
        <VSpacer v-if="!smAndUp" />
      </VCardActions>
    </VForm>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
