<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { AVATAR } from "@/src";
const AVATAR_BORDER_SCALE = 1.097560975609756;
const props = withDefaults(
  defineProps<{
    size?: number;
    fallback?: string | undefined;
    force?: string | undefined;
  }>(),
  {
    size: 41,
    fallback: "/no-image.jpg",
  }
);
const avatarUrl = inject(AVATAR);

// @@eos
</script>
<template>
  <strong
    class="component--AvatarThumb align-middle shadow-md d-inline-flex justify-center items-center bg-white rounded-[100%]"
    :class="$attrs.class"
    :style="`width: ${props.size * AVATAR_BORDER_SCALE}px; height: ${
      props.size * AVATAR_BORDER_SCALE
    }px`"
  >
    <VAvatar
      v-bind="omit($attrs, 'class')"
      :size="props.size"
      variant="elevated"
    >
      <VImg cover :src="(force ? force : avatarUrl) || fallback" />
    </VAvatar>
  </strong>
</template>
<style lang="scss" scoped></style>
