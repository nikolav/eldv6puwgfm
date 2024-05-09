<script setup lang="ts">
const props = defineProps<{ userId?: number }>();
const { profile: profile_, avatar } = useProfileData(props.userId);

// @@eos
</script>
<template>
  <slot :profile="profile_" :avatar="avatar" />
</template>
