<script setup lang="ts">
const props = defineProps<{ user: any }>();
const profileDataFull = useUserData(() => get(props, "user.id"));

// @@eos
</script>
<template>
  <slot v-bind="profileDataFull" />
</template>

