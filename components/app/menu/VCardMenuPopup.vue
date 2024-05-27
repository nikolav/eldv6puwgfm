<script setup lang="ts">
const props = defineProps<{
  close: () => void;
  menuItem: Record<string, any>;
}>();
const refVCardMenuPopup = ref();
onClickOutside(refVCardMenuPopup, props.close);

// @@eos
</script>
<template>
  <VSheet ref="refVCardMenuPopup" class="component--VCardMenuPopup">
    <pre>
      {{ JSON.stringify({ node: menuItem }, null, 2) }}
    </pre>
    <div>
      <NuxtLink :to="{ name: menuItem.to, query: { q: 'DsNF9SuGquY0iMd6h' } }">
        <a> -nav- {{ menuItem.to }} </a>
      </NuxtLink>
    </div>
  </VSheet>
</template>
<style lang="scss" scoped></style>
