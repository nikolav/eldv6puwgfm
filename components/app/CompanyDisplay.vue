<script setup lang="ts">
import {
  CompanyDisplayPanePosts,
  CompanyDisplayPaneProducts,
  CompanyDisplayPaneDelivery,
  CompanyDisplayPaneContact,
  CompanyDisplayPaneAbout,
} from "@/components/app";
import { useDisplay } from "vuetify";

const props = defineProps<{ uid: number }>();
const emit = defineEmits<{
  (e: "companyName", name: string): void;
  (e: "googleCalendarEmbedLink", link: string): void;
}>();

const { height: wHeight } = useDisplay();
const refPanel = ref();
const { y: yPanel } = useElementBounding(refPanel);
const maxHPanel = computed(() => wHeight.value - yPanel.value - 1);
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
      <VContainer fluid class="pa-0">
        <VRow>
          <!-- panels -->
          <VCol
            sm="9"
            class="position-relative overflow-auto scrollbar-thin-light overflow-x-hidden"
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

          <!-- links -->
          <VCol sm="3" class="px-2">
            <VTabs
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
