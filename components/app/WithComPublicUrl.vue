<script setup lang="ts">
const props = defineProps<{
  companyId: number;
  companyName: string | undefined;
}>();
const url = useCompanyPublicUrl(
  () => props.companyId,
  () => props.companyName
);
// @@eos
</script>
<template>
  <slot :company-url="url" />
</template>
