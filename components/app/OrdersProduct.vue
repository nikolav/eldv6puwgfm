<script setup lang="ts">
import type { IOrdersProducts } from "@/types";

const props = defineProps<{ product: IOrdersProducts }>();

const {
  docs: { PRODUCT_IMAGES },
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
} = useAppConfig();

const { data: docsImages$ } = useDocs(`${PRODUCT_IMAGES}${props.product.id}`);
const { publicUrl } = useApiStorage();

// #eos
</script>
<template>
  <VCard class="component--orders-product">
    <VContainer fluid class="pa-0">
      <VRow dense>
        <VCol sm="2" class="shrink-0">
          <VImg
            cover
            :src="
              !isEmpty(docsImages$)
                ? publicUrl(get(sample(docsImages$), 'data.file_id'))
                : DEFAULT_NO_PRODUCT_IMAGE_FOUND
            "
            max-height="192"
            min-height="89"
            :aspect-ratio="1"
          />
        </VCol>
        <VCol sm="7">
          <VCardTitle class="text-truncate">
            {{ props.product.name }}
            <pre class="opacity-50 d-inline text-disabled font-italic">
#{{ props.product.id }}</pre
            >
          </VCardTitle>
          <VCardSubtitle
            >Zaliha: {{ props.product.stock }}{{ props.product.stockType }},
            Cena: {{ props.product.price }}din</VCardSubtitle
          >
        </VCol>
        <VCol sm="3" class="bg-primary3 d-flex justify-center items-center"
          ><strong class="text-h4 !font-mono"
            >{{ props.product.amount
            }}<span class="text-h6">{{ props.product.stockType }}</span></strong
          ></VCol
        >
      </VRow>
    </VContainer>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
