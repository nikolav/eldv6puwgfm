<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps<{ modelValue: string | undefined }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
//
const { categoryByValue, menuItems } = useStoreMenuCategoriesFull();
const toggleCategories = useToggleFlag();
const s$ = ref(<string[]>[]);
const selectedValue = computed<string | undefined>(() => first(s$.value));
const selectedCategory = computed(() => categoryByValue(selectedValue.value));
watch(selectedCategory, (ctg) => {
  if (!ctg) return;
  emit("update:modelValue", selectedValue.value!);
  toggleCategories.off();
});
// clear @ modelValue reset
watch(
  () => props.modelValue,
  (m) => {
    s$.value = m ? [m] : [];
  }
);
// @@eos
</script>
<template>
  <div class="component--VBtnCategorySelect d-inline-flex flex-col">
    <VBtn
      @click="toggleCategories.on"
      rounded="pill"
      color="on-primary"
      variant="elevated"
      elevation="2"
      v-bind="$attrs"
      size="large"
    >
      <VIcon
        size="large"
        color="primary-darken-2"
        icon="$IconFolderFilled"
        start
        class="opacity-60"
      />
      <span> Robna grupa * </span>
    </VBtn>
    <em
      v-if="selectedCategory"
      class="max-w-[234px] pt-1 text-body-1 !font-sans text-center text-medium-emphasis"
      >{{ selectedCategory }}</em
    >
    <VNavigationDrawer
      location="start"
      v-model="toggleCategories.isActive.value"
      :order="-1"
      scrim
      temporary
      width="412"
    >
      <VList
        v-model:selected="s$"
        select-strategy="single-leaf"
        mandatory
        color="primary-lighten-2"
        variant="text"
        density="compact"
        lines="one"
        class="py-0"
        :items="menuItems"
      />
    </VNavigationDrawer>
  </div>
</template>
<style lang="scss" scoped></style>
