<script setup lang="ts">
import type { IProduct } from "@/types";
const props = defineProps<{
  product: IProduct | undefined;
}>();

const auth = useStoreApiAuth();
const { isPromoted, setPromoted } = useQueryProductPromo(
  () => props.product?.id
);

// @@eos
</script>
<template>
  <VBtn
    @click.stop="setPromoted(!isPromoted)"
    :disabled="!auth.isPremium"
    class="component--VBtnTogglePackagesPromoted"
    icon
    variant="text"
    density="comfortable"
  >
    <VIcon
      :color="isPromoted ? 'orange' : 'grey'"
      :icon="isPromoted ? '$iconStar' : '$iconStartOutline'"
      size="large"
    />
    <VTooltip
      :text="
        isPromoted
          ? '👎🏻 Izbaci iz promovisanih proizvoda.'
          : '👍🏻 Promoviši ovaj proizvod.'
      "
      location="bottom"
      open-delay="567"
      activator="parent"
    />
  </VBtn>
</template>
<style lang="scss" scoped></style>
