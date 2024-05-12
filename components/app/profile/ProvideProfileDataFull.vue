<script setup lang="ts">
import type { IAuthData } from "@/types";
const props = defineProps<{ user: IAuthData | undefined }>();
const profileDataFull = useUserData(() => get(props.user, "id"));

// @@eos
</script>
<template>
  <slot v-bind="profileDataFull" />
</template>

