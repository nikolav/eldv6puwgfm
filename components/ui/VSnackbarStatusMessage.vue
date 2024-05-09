<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
defineEmits<{
  (e: "update:modelValue", flag: boolean): void;
}>();

// @@eos
</script>
<template>
  <VSnackbar
    variant="text"
    color="transparent"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    v-model="props.modelValue"
  >
    <VAlert v-bind="$attrs" type="success" prominent elevation="4">
      <template #default>
        <slot />
      </template>
      <template #append>
        <VBtn
          @click="() => $emit('update:modelValue', false)"
          icon
          variant="plain"
          color="on-success"
        >
          <VIcon icon="$close" />
        </VBtn>
      </template>
    </VAlert>
  </VSnackbar>
</template>
