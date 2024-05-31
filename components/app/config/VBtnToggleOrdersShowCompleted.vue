<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ProvideUserConfig } from "@/components/app";
const props = defineProps<{ uid: any }>();
//
// @@eos
</script>
<template>
  <ProvideUserConfig
    :uid="uid"
    v-slot="{ props: { ordersShowCompleted, toggleOrdersShowCompleted } }"
  >
    <VBtn
      size="small"
      density="comfortable"
      color="on-primary"
      icon
      variant="plain"
      class="ms-1"
      v-bind="$attrs"
    >
      <VIcon icon="$iconDotsV" />
      <VMenu
        activator="parent"
        location="bottom end"
        max-width="422"
        :offset="[-16, 0]"
      >
        <VList lines="one" elevation="3" density="compact" slim>
          <VListItem link @click="toggleOrdersShowCompleted">
            <template #prepend>
              <VIcon
                class="!opacity-30"
                :icon="ordersShowCompleted ? '$iconCheck' : '$close'"
              />
            </template>
            <span>Prikaži gotove narudžbe</span>
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>
  </ProvideUserConfig>
</template>
<style lang="scss" scoped></style>
