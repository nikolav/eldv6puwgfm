<script setup lang="ts">
import { mergeProps } from "vue";
const TIP_DEFAULT = "Jedna slika uz priču...";
const ICON_SIZE_SCALE = 0.62;

const props = withDefaults(
  defineProps<{
    modelValue: File;
    size?: number | undefined;
    tip?: string | undefined;
    fallback?: string | undefined;
    //__
    accept?: string | undefined;
  }>(),
  {
    size: 88,
    tip: TIP_DEFAULT,
    accept: "image/*",
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", file: File): void;
  (e: "fallbackImageRemoved"): void;
}>();

const togglePostImagePointerDown = useToggleFlag();
const fileSelected$ = ref();
watchEffect(() => emit("update:modelValue", fileSelected$.value));
watchEffect(() => (fileSelected$.value = props.modelValue));
const { files, open: fileDialogOpen } = useFileDialog({ accept: props.accept });
watchEffect(() => {
  const file = get(files.value, "[0]");
  if (!file) return;
  fileSelected$.value = file;
});
const fileClear = () => {
  // no file, image clicked; remove
  if (!fileSelected$.value) {
    emit("fallbackImageRemoved");
    return;
  }
  fileSelected$.value = null;
};

// @@eos
</script>
<template>
  <FileDataUrl :file="fileSelected$" v-slot="{ url }">
    <VHover v-if="!(url || props.fallback)">
      <template #default="{ isHovering, props: props_ }">
        <VAvatar
          v-bind="props_"
          @click="fileDialogOpen"
          @mousedown="togglePostImagePointerDown.on"
          @mouseup="togglePostImagePointerDown.off"
          @mouseleave="togglePostImagePointerDown.off"
          variant="elevated"
          :class="[
            isHovering ? '!bg-stone-100' : undefined,
            togglePostImagePointerDown.isActive.value ? '!bg-stone-700' : '',
          ]"
          class="!bg-stone-200 cursor-pointer !transition-colors"
          :size="props.size"
        >
          <VIcon
            :class="[
              isHovering ? 'scale-110 -rotate-2 !opacity-70' : undefined,
              togglePostImagePointerDown.isActive.value
                ? 'text-white scale-[120%] rotate-0'
                : '',
            ]"
            class="transition-all opacity-50"
            :size="props.size * ICON_SIZE_SCALE"
            icon="$iconImageAdd"
          />
          <VTooltip
            v-if="props.tip"
            activator="parent"
            open-delay="345"
            :text="props.tip"
            location="bottom"
          />
        </VAvatar>
      </template>
    </VHover>
    <slot name="picked" v-else :url="url">
      <VHover open-delay="345">
        <template #default="{ isHovering: h, props: p }">
          <VImg
            v-bind="mergeProps($attrs, p)"
            :src="url || props.fallback"
            draggable
            rounded
            cover
            class="border-8 shadow-lg rotate-2"
            color="primary2-lighten-2"
          >
            <div class="d-flex justify-center items-center fill-height *bg-red">
              <VFadeTransition>
                <VBtn
                  @click="fileClear"
                  icon
                  v-if="h"
                  :size="props.size"
                  variant="tonal"
                  color="error"
                >
                  <VIcon
                    icon="$iconTrash"
                    :size="props.size * ICON_SIZE_SCALE"
                  />
                </VBtn>
              </VFadeTransition>
            </div>
          </VImg>
        </template>
      </VHover>
    </slot>
  </FileDataUrl>
</template>
<style lang="scss" scoped>
</style>
