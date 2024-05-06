<script setup lang="ts">
import type { IOrderReceived } from "@/types";
const prrops = defineProps<{
  close: () => void;
  order: IOrderReceived | undefined;
}>();
// @@eos
</script>
<template>
  <VCard
    rounded="t-lg"
    class="component--VCardOrderDetails"
    density="comfortable"
  >
    <VCardTitle class="bg-primary-lighten-1 d-flex items-center gap-1">
      <VIcon start :size="20" icon="$iconInfo" class="opacity-40" />
      <span>Dodatna napomena</span>
      <small
        style="font-size: 71%"
        class="font-mono opacity-40 ms-2 translate-y-[2px]"
        >Ref#{{ order?.id }}</small
      >
      <VSpacer />
      <VBtn
        icon
        color="on-primary"
        density="comfortable"
        size="small"
        variant="plain"
        @click="close"
      >
        <VIcon size="large" icon="$close" />
      </VBtn>
    </VCardTitle>
    <VCardText class="max-w-[91%] mx-auto w-full px-2 pt-6 pb-3 space-y-2">
      <VTextField
        :model-value="order?.code || '(Nema)'"
        :disabled="!order?.code"
        variant="underlined"
        readonly
        label="Promo kod: "
      />
      <VTextarea
        :model-value="order?.description || '(Nema)'"
        :disabled="!order?.description"
        label="Napomena: "
        variant="underlined"
        readonly
      />
    </VCardText>
    <VCardActions class="px-4">
      <VSpacer />
      <VBtn
        size="large"
        color="primary-lighten-1"
        variant="plain"
        @click="close"
      >
        ok
      </VBtn>
    </VCardActions>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
