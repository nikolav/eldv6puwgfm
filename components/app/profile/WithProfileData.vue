<script setup lang="ts">
const props = defineProps<{ userId?: number }>();
const {
  profile: profile_,
  avatar,
  fullName,
  publicUrl,
} = useProfileData(() => props.userId);

// @@eos
</script>
<template>
  <slot
    :profile="profile_"
    :avatar="avatar"
    :fullName="fullName"
    :publicUrl="publicUrl"
  />
</template>
