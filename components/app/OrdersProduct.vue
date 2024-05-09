<script setup lang="ts">
import type { IOrdersProducts } from "@/types";

const props = defineProps<{ product: IOrdersProducts }>();

const {
  docs: { PRODUCT_IMAGES },
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
} = useAppConfig();

const { data: docsImages$ } = useDocs(`${PRODUCT_IMAGES}${props.product.id}`);

// #eos
</script>
<template>
  <VCard rounded="lg" class="component--orders-product" height="95">
    <VContainer fluid class="pa-0 fill-height">
      <VRow no-gutters class="fill-height">
        <VCol sm="2" class="shrink-0 pa-0">
          <VImg
            cover
            :src="
              !isEmpty(docsImages$)
                ? resourceUrl(get(sample(docsImages$), 'data.file_id'))
                : DEFAULT_NO_PRODUCT_IMAGE_FOUND
            "
            class="fill-height"
          />
        </VCol>
        <VCol sm="7">
          <VCardTitle class="text-truncate">
            {{ props.product.name }}
            <pre class="opacity-50 d-inline text-disabled font-italic">
#{{ props.product.id }}</pre
            >
          </VCardTitle>
          <VCardSubtitle>
            Zaliha: {{ props.product.stock }} {{ props.product.stockType }}
          </VCardSubtitle>
          <VCardSubtitle>Cena: {{ props.product.price }} din</VCardSubtitle>
        </VCol>
        <VCol
          sm="3"
          class="bg-primary3-darken-1 d-flex justify-center items-center pa-0"
          ><strong
            style="font-size: 1.88rem !important"
            class="text-body-1 !font-mono"
            >{{ props.product.amount
            }}<span
              style="font-size: 1.11rem !important"
              class="text-body-1 opacity-60 d-inline-flex translate-x-[2px]"
              >{{ props.product.stockType }}</span
            ></strong
          ></VCol
        >
      </VRow>
    </VContainer>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
