<script setup lang="ts">
import {
  CardInboxTabPosts,
  CardInboxTabMessages,
  CardInboxTabCalendar,
  CardInboxTabNotificationsSys,
} from "@/components/app";

const props = defineProps<{ reload: () => void }>();
const {
  key: { INBOX_TAB_ACTIVE },
} = useAppConfig();

const TABS = [
  {
    title: "Objave",
    value: "objave",
    icon: "$iconPost",
    iconClass: "translate-y-px",
  },
  {
    title: "Poruke",
    value: "poruke",
    icon: "$iconChat",
    iconSize: "small",
    initial: true,
  },
  {
    title: "Kalendar",
    value: "kalendar",
    icon: "$calendar",
    iconSize: "small",
  },
  {
    title: "Obaveštenja sa platforme",
    value: "obavestenja",
    icon: "$warning",
  },
];

const tabs$ = useGlobalVariable(INBOX_TAB_ACTIVE, find(TABS, "initial")?.value);
const isSelectedTab = (value: string) => value == tabs$.value;

// store:com.chat
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const { comChat } = useTopics();

const { length: comChatLength } = useDocs(() => comChat(uid.value));

// @@eos
</script>
<template>
  <VCard class="component--CardInbox" rounded="t-lg">
    <VToolbar color="primary" flat extended density="comfortable">
      <VToolbarTitle class="*bg-red pt-3 ps-3">
        <strong class="tracking-wide opacity-50">Obaveštenja</strong>
      </VToolbarTitle>
      <VBtn @click="props.reload" icon variant="plain" color="on-primary"
        ><VIcon icon="$loading"
      /></VBtn>
      <template #extension>
        <VTabs show-arrows v-model="tabs$" mandatory grow>
          <VTab
            v-for="node in TABS"
            color="on-primary"
            :value="node.value"
            :key="node.value"
            :class="isSelectedTab(node.value) ? 'opacity-100' : 'opacity-30'"
          >
            <VIcon
              :class="node.iconClass"
              :icon="node.icon"
              start
              :size="node.iconSize"
            />
            <span>{{ node.title }}</span>
            <VBadge
              v-if="'poruke' == node.value"
              :model-value="0 < comChatLength"
              inline
              color="primary3"
              class="ms-1"
            >
              <template #badge>
                <pre>{{ comChatLength }}</pre>
              </template>
            </VBadge>
          </VTab>
        </VTabs>
      </template>
    </VToolbar>

    <VCardText>
      <VWindow
        continuous
        mandatory
        v-model="tabs$"
        :show-arrows="false"
        :touch="false"
      >
        <VWindowItem
          value="objave"
          transition="fade-transition"
          reverse-transition="fade-transition"
        >
          <CardInboxTabPosts />
        </VWindowItem>
        <VWindowItem
          value="poruke"
          transition="fade-transition"
          reverse-transition="fade-transition"
          ><CardInboxTabMessages
        /></VWindowItem>
        <VWindowItem
          value="kalendar"
          transition="fade-transition"
          reverse-transition="fade-transition"
          ><CardInboxTabCalendar
        /></VWindowItem>
        <VWindowItem
          value="obavestenja"
          transition="fade-transition"
          reverse-transition="fade-transition"
          ><CardInboxTabNotificationsSys
        /></VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
<style lang="scss" scoped></style>
