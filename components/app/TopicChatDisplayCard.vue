<script setup lang="ts">
import type { ITopicChatMessage } from "@/types";
const props = defineProps<{
  topic: string;
  title?: string | undefined;
  close: () => void;
}>();
const {
  key: { CHAT_NAME, APP_PROCESSING },
} = useAppConfig();
const auth = useStoreApiAuth();
const uid$ = computed(() => get(auth.user$, "id"));
const {
  data,
  upsert: topicChatPutMessage,
  remove: topicChatRemoveMessage,
  loading: topicChatLoading,
} = useDocs<ITopicChatMessage>(props.topic);
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
watchEffect(() => {
  appProcessing$.value = topicChatLoading.value;
});
const chat = computed(() => docsSortedDesc<ITopicChatMessage>(data.value));
const chatName$ = useLocalStorage(CHAT_NAME, () => "", { initOnMounted: true });
const topicChatMessage$ = ref("");
const submitChatMessage = async () => {
  let err_: any;
  if (!topicChatMessage$.value) return;
  try {
    await topicChatPutMessage({
      message: topicChatMessage$.value,
      uid: uid$.value || "",
      ...(chatName$.value ? { name: chatName$.value } : undefined),
    });
  } catch (error) {
    err_ = error;
    // pass
  }
  if (!err_) {
    topicChatMessage$.value = "";
  }
};
const topicChatDeleteMessage = async (id: any) => {
  const ID = Number(id);
  if (!ID) return;
  try {
    await topicChatRemoveMessage(ID);
  } catch (error) {
    // pass
  }
};
const ownMessage = (mid: number) => uid$.value == mid;
const { $date } = useNuxtApp();
const dateFormatedFromNow = (d: string) => $date(d).utc(true).fromNow(true);
// @@eos
</script>
<template>
  <VCard rounded="t-lg" class="component--TopicChatDisplayCard" width="312">
    <VCardItem class="bg-primary">
      <VCardTitle class="text-truncate">{{ props.title }}</VCardTitle>
      <template #prepend>
        <VIcon start size="18" icon="$iconChat" class="opacity-40" />
      </template>
      <template #append>
        <VBtn
          size="small"
          @click="props.close"
          icon
          variant="plain"
          color="on-primary"
          class="translate-x-[8px]"
        >
          <VIcon icon="$close" size="large" />
        </VBtn>
      </template>
    </VCardItem>
    <VCardText
      class="pa-2 max-h-[312px] min-h-[122px] overflow-auto scrollbar-thin-light bg-primary2-lighten-1"
    >
      <VDataIterator :items="chat" :items-per-page="-1">
        <template #no-data>
          <p class="text-center pa-4 text-body-1 text-disabled">Nema poruka.</p>
        </template>
        <template #default="{ items }">
          <div class="space-y-2">
            <template v-for="node in items" :key="node.raw.id">
              <VHover open-delay="345">
                <template #default="{ isHovering, props }">
                  <VSheet
                    position="relative"
                    v-bind="props"
                    class="pa-2"
                    rounded
                    elevation="1"
                    :color="
                      ownMessage(get(node.raw, 'data.uid'))
                        ? 'primary2'
                        : undefined
                    "
                  >
                    <VBtn
                      @click="topicChatDeleteMessage(node.raw.id)"
                      density="comfortable"
                      class="top-px end-px"
                      position="absolute"
                      v-if="isHovering && ownMessage(get(node.raw, 'data.uid'))"
                      icon
                      variant="plain"
                      color="error"
                      size="small"
                    >
                      <VIcon icon="$iconTrash" />
                    </VBtn>
                    <p
                      v-if="get(node.raw, 'data.name')"
                      class="pa-0 ma-0 text-medium-emphasis ps-1"
                    >
                      <small>{{ get(node.raw, "data.name") }}</small>
                    </p>
                    <p>
                      {{ get(node.raw, "data.message") }}
                    </p>
                    <p class="pa-0 ma-0 text-end text-disabled !text-xs pe-1">
                      <small>{{
                        dateFormatedFromNow(get(node.raw, "created_at"))
                      }}</small>
                    </p>
                  </VSheet>
                </template>
              </VHover>
            </template>
          </div>
        </template>
      </VDataIterator>
    </VCardText>
    <VCardActions class="pa-0 border-t-lg border-primary border-opacity-75">
      <VForm
        class="justify-between w-full d-flex align-center px-2 ps-4"
        @submit.prevent="submitChatMessage"
        autocomplete="off"
      >
        <div class="grow d-flex flex-col">
          <VTextField
            name="topic_chat_name"
            v-model.trim="chatName$"
            single-line
            label="Ime *"
            variant="underlined"
            density="compact"
          />
          <VTextarea
            name="topic_chat_message"
            v-model.trim="topicChatMessage$"
            single-line
            clearable
            rows="3"
            label="Poruka *"
            density="compact"
            variant="underlined"
          />
        </div>
        <VBtn
          class="ms-2"
          variant="tonal"
          type="submit"
          icon
          color="primary"
          size="large"
        >
          <VIcon icon="$iconPaperPlane" size="32" />
        </VBtn>
      </VForm>
    </VCardActions>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
