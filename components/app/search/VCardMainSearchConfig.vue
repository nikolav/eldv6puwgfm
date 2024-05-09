<script setup lang="ts">
const props = defineProps<{
  close: () => void;
}>();
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();

const search$$ = useStoreSearchConfig();

// @@eos
</script>
<template>
  <VCard min-height="420">
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero quasi
      vero quo dolores porro fugiat voluptas alias. Totam perferendis ratione
      nesciunt. Rem reprehenderit beatae quo inventore! Praesentium esse quis
      temporibus?
    </p>
    <VBtn
      position="absolute"
      class="z-[1] top-1 end-1"
      @click="close"
      icon
      variant="text"
    >
      <VIcon icon="$close" size="large" />
    </VBtn>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
