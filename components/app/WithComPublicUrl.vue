<script setup lang="ts">
const props = defineProps<{ companyId: number; companyName: string }>();
const url = useCompanyPublicUrl(props.companyId, props.companyName);
// @@eos
</script>
<template>
  <slot :companyUrl="url" />
</template>
