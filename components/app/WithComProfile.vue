<script setup lang="ts">
const props = defineProps<{ userId: number }>();
const {
  docs: { TAG_COMPANY_PROFILE_prefix },
} = useAppConfig();
const { doc_id$, data } = useDoc(props.userId);
watchEffect(() => {
  doc_id$.value = props.userId
    ? `${TAG_COMPANY_PROFILE_prefix}${props.userId}`
    : undefined;
});
const profile = computed(() => get(data.value, "data"));
// @@eos
</script>
<template>
  <slot :profile="profile" />
</template>
