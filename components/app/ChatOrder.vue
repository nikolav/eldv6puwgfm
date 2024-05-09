<script setup lang="ts">
import { useDisplay } from "vuetify";
import { NoDataChatOrder } from "@/components/app";

const props = defineProps<{
  close: () => void;
  topic: string;
}>();

const {
  key: { APP_PROCESSING, CHAT_ORDER_MESSAGE, CHAT_CLIENTID_ACTIVE, CHAT_NAME },
} = useAppConfig();
const chatName$ = useLocalStorage(CHAT_NAME, () => "", { initOnMounted: true });
const clientIdActive$ = useGlobalVariable(CHAT_CLIENTID_ACTIVE);
const { users } = useQueryUsers();
const user_ = computed(() => find(users.value, { id: clientIdActive$.value }));

const { smAndUp } = useDisplay();

const {
  topic$,
  data: chat$,
  upsert: chatOrderSend,
  remove: chatOrderRemove,
} = useDocs();
watch(
  () => props.topic,
  (t) => {
    topic$.value = t;
  }
);

const chatMessage$ = useGlobalVariable(CHAT_ORDER_MESSAGE);
const toggleChatOrderPopup = useToggleFlag();
const auth = useStoreApiAuth();
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
const uid = computed(() => get(auth.user$, "id"));
const submitChatOrder = async () => {
  let error_;
  if (!(0 < chatMessage$.value?.length)) return;
  try {
    appProcessing$.value = true;
    await chatOrderSend({
      name: chatName$.value || "",
      message: chatMessage$.value,
      // user_id: uid.value,
      uid: uid.value,
    });
  } catch (error) {
    error_ = error;
    console.error(error);
    // pass
  }
  await nextTick(() => {
    appProcessing$.value = false;
  });
  if (!error_) {
    toggleChatOrderPopup.off();
    chatMessage$.value = "";
  }
  return error_;
};

const isClientMessage = (id: any) => id != uid.value;
const chatOrderMessageRemove = async (messageId: number) => {
  let err_;
  try {
    appProcessing$.value = true;
    await chatOrderRemove(messageId);
  } catch (error) {
    err_ = error;
  }
  if (!err_) {
    await nextTick(() => {
      appProcessing$.value = false;
    });
  }

  return err_;
};

const { $date } = useNuxtApp();
const dateFormatedFromNow = (d: string) => $date(d).utc(true).fromNow(true);
// @@eos
</script>
<template>
  <VSheet
    rounded="0"
    elevation="0"
    class="component--chat-order pt-14 pb-[155px]"
  >
    <VBtn
      @click="props.close"
      icon
      variant="plain"
      class="position-absolute top-1 end-1 z-10"
    >
      <VIcon icon="$close" size="large" />
    </VBtn>

    <!-- @chat:list -->
    <VDataIterator :items="docsSortedDesc(chat$)" :items-per-page="-1">
      <template #default="{ items }">
        <div class="space-y-4 px-4">
          <template v-for="node in items" :key="node.raw.id">
            <!-- @chat:card -->
            <VHover open-delay="345">
              <template #default="{ isHovering, props }">
                <VCard
                  v-bind="props"
                  :color="
                    // isClientMessage(get(node.raw, 'data.user_id'))
                    isClientMessage(get(node.raw, 'data.uid'))
                      ? 'primary2'
                      : undefined
                  "
                  elevation="2"
                  :class="
                    // isClientMessage(get(node.raw, 'data.user_id'))
                    isClientMessage(get(node.raw, 'data.uid'))
                      ? 'ms-10'
                      : undefined
                  "
                >
                  <!-- @chat:delete -->
                  <VBtn
                    @click="chatOrderMessageRemove(node.raw.id)"
                    v-if="
                      isHovering && !isClientMessage(get(node.raw, 'data.uid'))
                    "
                    class="position-absolute end-1 top-1/2 -translate-y-[50%]"
                    icon
                    color="error"
                    variant="plain"
                    size="small"
                  >
                    <VTooltip
                      activator="parent"
                      location="bottom"
                      open-delay="345"
                      text="Obriši poruku"
                    />
                    <VIcon icon="$iconTrash" size="large" />
                  </VBtn>
                  <VCardText>
                    <!-- @@ -->
                    <h4
                      class="indent-1 text-medium-emphasis"
                      v-if="isClientMessage(get(node.raw, 'data.uid'))"
                    >
                      {{
                        get(node.raw, "data.name") ||
                        matchEmailStart(user_?.email) ||
                        "korisnik"
                      }}
                    </h4>
                    <p class="text-body-1">
                      {{ get(node.raw, "data.message") }}
                    </p>
                    <p class="*text-end text-disabled">
                      <small>
                        {{ dateFormatedFromNow(node.raw.updated_at) }}
                      </small>
                    </p>
                  </VCardText>
                </VCard>
              </template>
            </VHover>
          </template>
        </div>
      </template>
      <template #no-data>
        <NoDataChatOrder />
      </template>
    </VDataIterator>
    <!-- @chat:controlls -->
    <div class="position-absolute bottom-6 w-full d-flex">
      <VSpacer />
      <!-- @chat:button -->
      <VBtn
        icon
        variant="elevated"
        color="on-primary"
        elevation="4"
        size="81"
        class="me-12"
      >
        <VTooltip
          location="start"
          open-delay="345"
          activator="parent"
          text="Nova poruku kupcu..."
        />
        <VIcon color="primary-darken-1" icon="$iconPaperPlane" size="48" />
        <!-- @chat:popup -->
        <VMenu
          no-click-animation
          activator="parent"
          :width="smAndUp ? 320 : undefined"
          location="top"
          :offset="22"
          :close-on-content-click="false"
          v-model="toggleChatOrderPopup.isActive.value"
        >
          <VCard elevation="4" rounded="lg">
            <VForm autocomplete="off" @submit.prevent="submitChatOrder">
              <VCardItem class="bg-primary-lighten-1">
                <VCardTitle class="d-flex items-center">
                  <em
                    ><VIcon
                      icon="$iconChat"
                      size="sm"
                      start
                      class="opacity-60 -translate-y-[2px]"
                    />
                    Nova poruka</em
                  >
                  <VSpacer />
                  <VBtn
                    color="on-primary"
                    @click="toggleChatOrderPopup.off"
                    icon
                    variant="plain"
                  >
                    <VIcon icon="$close" size="large" />
                  </VBtn>
                </VCardTitle>
              </VCardItem>
              <VCardText class="pa-4">
                <VTextarea
                  v-model="chatMessage$"
                  name="chat_order_message"
                  clearable
                  label="Tekst"
                  rows="4"
                  variant="underlined"
                />
              </VCardText>
              <VCardActions class="*bg-primary-darken-1 d-flex items-center">
                <VSpacer />
                <VBtn type="submit" color="on-primary" size="large">ok</VBtn>
              </VCardActions>
            </VForm>
          </VCard>
        </VMenu>
      </VBtn>
    </div>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
