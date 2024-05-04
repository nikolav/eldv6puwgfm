<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { useDisplay } from "vuetify";
import { ProductImages, LightboxProductImages } from "@/components/app";
const props = defineProps<{ pid: number }>();
const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
} = useAppConfig();
// utils
const { smAndUp, width } = useDisplay();
const cart = useStoreCart();
// stores
const { products$ } = useQueryProductsOnly(() => [props.pid]);
const product$ = computed(() => first(products$.value));

const sampleImage = (images: any) =>
  !isEmpty(images)
    ? resourceUrl(get(sample(images), "data.file_id"))
    : DEFAULT_NO_PRODUCT_IMAGE_FOUND;
// @@eos
</script>
<template>
  <section class="component--CardCartItem">
    <!-- @item:container -->
    <div class="d-flex items-center justify-between sm:gap-4">
      <!-- @item:card-h -->
      <VCard
        rounded="lg"
        v-bind="$attrs"
        class="grow d-flex"
        :density="width < 288 ? 'compact' : undefined"
        height="133"
        max-height="133"
      >
        <!-- @item:card:image -->
        <div v-if="smAndUp" class="self-stretch">
          <!-- <ProductImages :product="product$" v-slot="{ images }"> -->
          <LightboxProductImages :product="product$">
            <template #activator="{ onClick, images }">
              <VImg
                @click="onClick"
                :src="sampleImage(images)"
                class="h-100"
                width="177"
                cover
              />
            </template>
          </LightboxProductImages>
          <!-- </ProductImages> -->
        </div>
        <!-- @item:card:description -->
        <div class="grow *bg-red" :class="width < 281 ? 'text-end' : undefined">
          <VCardTitle
            class="text-truncate"
            :class="width < 389 ? '!text-sm' : undefined"
            >{{ get(product$, "name") }}</VCardTitle
          >
          <VCardSubtitle>Ref #{{ props.pid }}</VCardSubtitle>
        </div>
        <div class="*bg-primary3 grid grid-cols-[auto,1fr] grid-rows-2">
          <!-- @item:qty:cell-ts -->
          <div class="*bg-red d-flex items-center justify-center sm:me-5">
            <strong class="text-h5 !font-mono font-semibold"
              >{{ cart.store$.items[props.pid]
              }}<small class="ms-px text-medium-emphasis">{{
                get(product$, "stockType")
              }}</small></strong
            >
          </div>
          <!-- @item:qty:cell-te -->
          <div class="d-flex items-center justify-end">
            <VBtn
              icon
              @click="cart.increase(props.pid)"
              variant="plain"
              :size="width < 412 ? 'small' : undefined"
              color="primary"
            >
              <VIcon size="large" icon="$plus" />
            </VBtn>
          </div>
          <!-- @item:qty:cell-bs -->
          <div class="d-flex items-start justify-center sm:me-5">
            <small class="text-medium-emphasis"
              >{{
                cart.store$.items[props.pid] * Number(get(product$, "price"))
              }}din</small
            >
          </div>
          <!-- @item:qty:cell-be -->
          <div class="d-flex items-center justify-end">
            <VBtn
              icon
              @click="cart.increase(props.pid, -1)"
              variant="plain"
              :size="width < 412 ? 'small' : undefined"
              color="error"
              ><VIcon size="large" icon="$minus"
            /></VBtn>
          </div>
        </div>
      </VCard>
      <!-- @@ -->
      <!-- @item:drop-product -->
      <VBtn
        icon
        variant="tonal"
        color="error-darken-2"
        @click="cart.drop(props.pid)"
        size="small"
        class="opacity-40 hover:opacity-100"
      >
        <VTooltip
          activator="parent"
          open-delay="345"
          location="bottom"
          text="Izbaci proizvod iz korpe"
        />
        <VIcon size="large" icon="$close" />
      </VBtn>
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style>
