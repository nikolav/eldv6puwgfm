<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
defineEmits<{
  (e: "update:modelValue", val: boolean): void;
}>();
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
// @@eos
</script>
<template>
  <VSnackbar
    color="transparent"
    variant="text"
    location="top"
    :model-value="modelValue"
    @update:model-value="(v) => !v && $emit('update:modelValue', false)"
    :transition="DEFAULT_TRANSITION"
  >
    <VAlert
      density="comfortable"
      rounded="pill"
      color="error-lighten-3"
      elevation="3"
      prominent
    >
      <template #prepend>
        <VIcon
          class="opacity-40"
          :size="32"
          color="primary-darken-3"
          icon="$iconUserShield"
        />
      </template>
      <template #text>
        <div class="d-flex items-center ps-2">
          <strong
            class="text-body-1 !font-sans opacity-80"
            style="font-size: 1.012rem !important"
          >
            <p>Pokušajte ponovo.</p>
          </strong>
          <VSpacer />
          <VBtn
            color="error-darken-3"
            @click="$emit('update:modelValue', false)"
            icon
            variant="plain"
          >
            <VIcon icon="$close" />
            <VTooltip
              text="Ok"
              location="bottom"
              open-delay="345"
              activator="parent"
            />
          </VBtn>
        </div>
      </template>
    </VAlert>
  </VSnackbar>
</template>
<style lang="scss" scoped></style>
