<script setup lang="ts">
import {
  CompanyDisplayPaneAbout,
  CompanyDisplayPaneContact,
  CompanyDisplayPaneDelivery,
  CompanyDisplayPanePosts,
  CompanyDisplayPaneProducts,
} from "@/components/app";
import { useDisplay } from "vuetify";
const props = defineProps<{ uid: number }>();
const emit = defineEmits<{
  (e: "companyName", name: string): void;
  (e: "googleCalendarEmbedLink", link: string): void;
}>();

const { width, height: wHeight, mdAndUp, lgAndUp } = useDisplay();
const refPanel = ref();
const { y: yPanel } = useElementBounding(refPanel);
const TABS_HEIGHT_AT_MDANDDOWN = 48;
const maxHPanel = computed(() =>
  Math.floor(
    wHeight.value -
      Math.max(0, yPanel.value) -
      1 -
      (!mdAndUp.value ? TABS_HEIGHT_AT_MDANDDOWN : 0)
  )
);
const { user: comUser } = useQueryUsersSingle(props.uid);
const { profile } = useProfileData(() => props.uid);

watchEffect(() => emit("companyName", profile.value?.name || ""));
watchEffect(() =>
  emit("googleCalendarEmbedLink", profile.value?.googleCalendarEmbedLink || "")
);

// tabs
const panelLinks = [
  {
    title: "Proizvodi",
    icon: "$iconBox",
    size: "large",
    class: "translate-x-[2px]",
    initial: true,
  },
  {
    title: "Objave",
    icon: "$iconPost",
    size: "x-large",
  },
  {
    title: "Kontakt",
    icon: "$iconInfo",
    size: 26,
    class: "-translate-x-[5px]",
  },
  {
    title: "Dostava",
    icon: "$iconDeliveryTruck",
    size: 28,
    class: "-translate-x-[5px]",
  },
  {
    title: "O Nama",
    icon: "$iconDowntown",
    size: "x-large",
    class: "-translate-x-px",
  },
];

const PANEL_COMPONENT = <Record<string, any>>{
  Objave: CompanyDisplayPanePosts,
  Proizvodi: CompanyDisplayPaneProducts,
  Dostava: CompanyDisplayPaneDelivery,
  Kontakt: CompanyDisplayPaneContact,
  "O Nama": CompanyDisplayPaneAbout,
};
// const tabSelected$ = useGlobalVariable("panel:active:KYnYvJZfdX2zYlHDrG8N");
const tabSelected$ = useGlobalVariable("ABiEHz");
onMounted(() => {
  if (!tabSelected$.value) {
    tabSelected$.value = find(panelLinks, "initial")?.title;
  }
});

const productsLength = ref<number>();
const productsLengthSet = (n: number) => {
  productsLength.value = n;
};

// @@eos
</script>
<template>
  <VSheet class="component--CompanyDisplay">
    <Html class="overflow-hidden" />

    <!-- chip:district -->
    <VChip>
      <template #prepend>
        <VIcon start icon="$iconLocation" class="!opacity-40 ps-[2px]" />
      </template>
      <small class="*text-medium-emphasis">{{ profile?.district }}</small>
    </VChip>

    <!-- chip:pg# -->
    <VChip class="ms-4" v-if="profile?.pin">
      <template #prepend>
        <small class="me-1 text-disabled">PG#</small>
      </template>
      <strong class="text-medium-emphasis">
        <pre>{{ profile?.pin }}</pre>
      </strong>
      <VTooltip
        activator="parent"
        open-delay="122"
        location="top"
        :offset="16"
        text="Broj registrovanog poljoprivrednog gazdinstva"
      />
    </VChip>

    <!-- @@title -->
    <VCardTitle class="text-truncate !font-sans text-h4 font-weight-bold my-3">
      {{ profile?.name || "" }}
    </VCardTitle>

    <!-- @@data -->
    <VSheet class="*!bg-red-200" ref="refPanel">
      <!-- show tabs @mdAndDown -->
      <VTabs
        v-if="!mdAndUp"
        v-model="tabSelected$"
        color="primary-lighten-1"
        mandatory
        :height="TABS_HEIGHT_AT_MDANDDOWN"
        class="pa-0 ma-0 border-b"
        :grow="712 < width"
      >
        <VTab
          v-for="node in panelLinks"
          :variant="node.title == tabSelected$ ? 'flat' : 'plain'"
          :key="node.title"
          :value="node.title"
          class="text-none"
        >
          <span>{{ node.title }}</span>
          <template #prepend>
            <VBadge
              :model-value="
                'Proizvodi' == node.title && 0 < Number(productsLength)
              "
              :inline="!(712 < width)"
              :offset-x="712 < width ? 6 : undefined"
              color="primary3"
            >
              <template #badge>
                <pre>{{ productsLength }}</pre>
              </template>
              <VIcon
                v-if="712 < width"
                start
                :size="node.size"
                :icon="node.icon"
              />
            </VBadge>
          </template>
        </VTab>
      </VTabs>
      <VContainer fluid class="pa-0 ma-0">
        <VRow no-gutters class="pa-0 ma-0">
          <!-- panels -->
          <VCol
            md="9"
            class="pa-0 ma-0 position-relative overflow-auto scrollbar-thin-light overflow-x-hidden"
            :style="`max-height: ${maxHPanel}px`"
          >
            <VFadeTransition name="Panel1" mode="out-in" leave-absolute>
              <component
                :user="comUser"
                :profile="profile"
                :is="PANEL_COMPONENT[tabSelected$ || '']"
                @products-length="productsLengthSet"
              />
            </VFadeTransition>
          </VCol>

          <!-- nav links -->
          <VCol v-if="mdAndUp" md="3" class="px-2">
            <VTabs
              v-if="mdAndUp"
              hide-slider
              color="primary-lighten-1"
              mandatory
              direction="vertical"
              v-model="tabSelected$"
              class="overflow-visible"
            >
              <VTab
                v-for="(node, i) in panelLinks"
                :class="[
                  i < 5 ? 'mb-2' : undefined,
                  node.title != tabSelected$ ? 'opacity-60' : undefined,
                ]"
                rounded="pill"
                :variant="node.title == tabSelected$ ? 'elevated' : 'tonal'"
                :key="node.title"
                :value="node.title"
                class="text-none ms-1"
              >
                <span :class="node.class">{{ node.title }}</span>
                <template #prepend>
                  <VBadge
                    :model-value="
                      'Proizvodi' == node.title && 0 < Number(productsLength)
                    "
                    color="primary3"
                    offset-x="5"
                  >
                    <template #badge>
                      <pre>{{ productsLength }}</pre>
                    </template>
                    <VIcon start :size="node.size" :icon="node.icon" />
                  </VBadge>
                </template>
              </VTab>
            </VTabs>
          </VCol>
        </VRow>
      </VContainer>
    </VSheet>
  </VSheet>
</template>
<style lang="scss" scoped></style>
