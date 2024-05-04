<script setup lang="ts">
import { useDisplay } from "vuetify";
const props = defineProps<{ pid: number }>();
const {
  docs: { PRODUCT_IMAGES },
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
} = useAppConfig();
const { smAndUp, width } = useDisplay();
const cart = useStoreCart();
const { products$ } = useQueryProductsAll();
const product$ = computed(() =>
  find(products$.value, { id: String(props.pid) })
);
const { topic$, data: docsImages$ } = useDocs();
watch(
  () => get(product$.value, "id"),
  (pid) => {
    if (pid) {
      topic$.value = `${PRODUCT_IMAGES}${pid}`;
    }
  }
);
const { publicUrl } = useApiStorage(true, true);
const productImageSrcSample$ = computed(() =>
  isEmpty(toValue(docsImages$))
    ? DEFAULT_NO_PRODUCT_IMAGE_FOUND
    : publicUrl(get(sample(docsImages$.value), "data.file_id"))
);
// @@eos
</script>
<template>
  <section class="component--CardCartItem">
    <!-- @item:container -->
    <div class="d-flex items-center justify-between sm:gap-4">
      <!-- @item:card-h -->
      <VCard class="grow d-flex" :density="width < 288 ? 'compact' : undefined">
        <!-- @item:card:image -->
        <div v-if="smAndUp" class="self-stretch">
          <VImg :src="productImageSrcSample$" class="h-100" width="92" cover />
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
        variant="plain"
        color="on-surface"
        @click="cart.drop(props.pid)"
      >
        <VTooltip
          activator="parent"
          open-delay="345"
          location="bottom"
          text="Izbaci proizvod iz korpe"
        />
        <VIcon icon="$close" />
      </VBtn>
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style>
