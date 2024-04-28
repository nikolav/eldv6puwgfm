<script setup lang="ts">
// import { Dump } from "@/components/dev";
import {
  CompanyDisplayPanePosts,
  CompanyDisplayPaneProducts,
  CompanyDisplayPaneDelivery,
  CompanyDisplayPaneContact,
  CompanyDisplayPaneAbout,
} from "@/components/app";
import type { ICompanyProfile } from "@/types";
const props = defineProps<{ uid: number }>();
const emit = defineEmits<{
  (e: "companyName", name: string): void;
  (e: "googleCalendarEmbedLink", link: string): void;
}>();
const {
  docs: { TAG_COMPANY_PROFILE_prefix },
  key: { APP_PROCESSING },
} = useAppConfig();
const PROFILE_FIELDS = [
  "about",
  "address",
  "delivery",
  "district",
  "name",
  "ownerFirstName",
  "ownerLastName",
  "phone",
  "pin",
  "googleCalendarEmbedLink",
];

const { user: comUser, loading: qUserLoading } = useQueryUsersSingle(props.uid);
const { data: comProfile, loading: qProfileLoading } = useDoc<ICompanyProfile>(
  `${TAG_COMPANY_PROFILE_prefix}${props.uid}`
);
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
watchEffect(() => {
  appProcessing$.value = qUserLoading.value || qProfileLoading.value;
});
const profile_ = computed(() =>
  reduce(
    PROFILE_FIELDS,
    (res, field) => {
      res[field] = computed(() => get(comProfile.value, `data[${field}]`));
      return res;
    },
    <Record<string, Ref>>{}
  )
);

// const products = computed(() => get(comUser.value, "products") || []);
watchEffect(() => emit("companyName", profile_.value.name.value));
// watchEffect(() => emit("googleCalendarEmbedLink", comProfile.value.data.googleCalendarEmbedLink));
watchEffect(() =>
  emit("googleCalendarEmbedLink", profile_.value.googleCalendarEmbedLink.value)
);

// tabs
const panelLinks = [
  {
    title: "Objave",
    icon: "$iconPost",
    size: "x-large",
    initial: true,
  },
  {
    title: "Proizvodi",
    icon: "$iconBox",
    size: "large",
    class: "translate-x-[2px]",
  },
  {
    title: "Dostava",
    icon: "$iconDeliveryTruck",
    size: 28,
    class: "-translate-x-[5px]",
  },
  {
    title: "Kontakt",
    icon: "$iconInfo",
    size: 26,
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
const tabSelected$ = useGlobalVariable("panel:active:KYnYvJZfdX2zYlHDrG8N");
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
  <VSheet class="component--CompanyDisplay *bg-red" v-bind="$attrs">
    <VChip>
      <template #prepend>
        <VIcon start icon="$iconLocation" class="!opacity-40 ps-[2px]" />
      </template>
      <small class="*text-medium-emphasis">{{ profile_.district.value }}</small>
    </VChip>
    <VChip class="ms-4" v-if="profile_.pin.value">
      <template #prepend>
        <small class="me-1 text-disabled">PG#</small>
      </template>
      <strong class="text-medium-emphasis">
        <pre>{{ profile_.pin.value }}</pre>
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
    <h2 class="text-truncate !font-sans text-h4 font-weight-bold mt-4">
      {{ profile_.name.value }}
    </h2>
    <VDivider thickness="2" class="border-opacity-50" length="91%" />
    <!-- @@data -->
    <VSheet class="*!bg-red-200">
      <VContainer fluid class="pa-0">
        <VRow>
          <VCol
            cols="12"
            sm="9"
            class="position-relative max-h-[389px] overflow-auto scrollbar-thin-light overflow-x-hidden"
          >
            <VFadeTransition name="Panel1" mode="out-in" leave-absolute>
              <component
                :user="comUser"
                :profile="profile_"
                :is="PANEL_COMPONENT[tabSelected$ || '']"
                @products-length="productsLengthSet"
              />
            </VFadeTransition>
          </VCol>
          <VCol cols="12" sm="3" class="px-2">
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
    <!-- <Dump :data="profile_" /> -->
    <!-- <Dump :data="comUser" /> -->
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
