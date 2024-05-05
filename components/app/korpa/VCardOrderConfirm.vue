<script setup lang="ts">
import { useDisplay } from "vuetify";
import {
  VChipProductPrice,
  VChipProductPriceBase,
  ProductPublicUrl,
} from "@/components/app";

// defs
const CALC_HEIGHT_PRODUCTS_LIST_OFFSET = 282;
const props = defineProps<{
  processing: boolean | undefined;
  total: number | undefined;
  close: () => void;
  sendOrder: () => void;
}>();

// refs
const boxProductsList = ref();

// utils
const { smAndUp, height } = useDisplay();
const { top: plTop } = useElementBounding(boxProductsList, { immediate: true });
const { form } = useFormDataFields("pUnpA4sQ", {
  description: (value: string) => 0 < value.length,
  title: True,
  email: True,
});
// computes
const lHeight = computed(() => height.value - CALC_HEIGHT_PRODUCTS_LIST_OFFSET);

// stores
const cart = useStoreCart();
const { products$ } = useQueryProductsOnly(() => cart.products);

// @@eos
</script>
<template>
  <VCard
    :min-height="height * 0.91"
    rounded="t-xl"
    class="*cart-order-confirm--bg-image-01 pt-10 px-6 !bg-stone-100"
  >
    <VBtn
      @click="close"
      position="absolute"
      class="top-3 end-3 z-[1]"
      variant="text"
      size="large"
      rounded="circle"
      icon="$close"
    >
      <VIcon icon="$close" size="large" />
    </VBtn>

    <!-- @@todo order success -->
    <VSheet class="--if-order-success d-none">
      <p>success order sent</p>
    </VSheet>

    <!-- @@order:details -->
    <VSheet color="transparent">
      <div class="d-flex items-center pe-32">
        <VCardTitle class="!grow ps-7">
          <h4 class="text-h4 !font-sans opacity-75">Potvrdi porudžbinu:</h4>
        </VCardTitle>
        <div class="d-flex items-center ga-8">
          <p class="opacity-70">Ukupna vrednost:</p>
          <VChipProductPrice
            class="scale-125"
            :price-only="priceFormatLocale(cart.total$)"
          />
        </div>
      </div>
    </VSheet>
    <VDivider thickness="2" class="border-opacity-50 w-[91%]" />
    <div class="VContainer--placer pa-4 *bg-blue-100">
      <VContainer fluid class="*bg-blue-200 pa-0">
        <VRow class="*bg-blue-300" no-gutters>
          <VCol sm="6" class="*bg-blue-400">
            <VCardTitle class="d-flex items-center">
              <h4 class="text-h4 !font-sans">Izabrani artikli:</h4>
              <VBadge inline color="primary" class="ms-3">
                <template #badge>
                  <pre>{{ cart.length }}</pre>
                </template>
              </VBadge>
            </VCardTitle>
            <VCardText
              :style="`height: ${lHeight}px !important`"
              ref="boxProductsList"
              class="pt-2 *bg-stone-200 overflow-auto *bg-blue scrollbar-thin-light"
            >
              <VDataIterator :items="products$" :items-per-page="-1">
                <template #default="{ items }">
                  <div class="VDataIterator--placer space-y-3">
                    <template v-for="node in items" :key="node.raw.id">
                      <VCard elevation="1" density="comfortable">
                        <VCardTitle
                          class="d-flex items-center justify-between text-start"
                        >
                          <ProductPublicUrl
                            :product="node.raw"
                            v-slot="{ url: productUrl }"
                          >
                            <NuxtLink
                              :to="productUrl"
                              external
                              target="_blank"
                              class="*bg-red d-inline-block w-[75%] text-truncate"
                            >
                              <a class="text-primary-darken-1 link--prominent">
                                <em>
                                  {{ node.raw.name }}
                                </em>
                              </a>
                            </NuxtLink>
                          </ProductPublicUrl>
                          <VChipProductPriceBase :product="node.raw" />
                        </VCardTitle>
                        <VCardText class="pb-3">
                          <div
                            class="d-flex justify-between items-center pe-3 pt-2"
                          >
                            <p>
                              <small style="font-size: 88%" class="opacity-40"
                                >Ref#{{ node.raw.id }}</small
                              >
                              <span class="ms-3 text-medium-emphasis"
                                >Količina:</span
                              >
                              <em
                                style="font-size: 111%"
                                class="font-sans ms-2"
                              >
                                {{ cart.count(node.raw.id) }}
                              </em>
                              <small class="text-disabled ms-[2px]">{{
                                node.raw.stockType
                              }}</small>
                            </p>
                            <p>
                              <span class="text-medium-emphasis"> Iznos: </span>
                              <em
                                style="font-size: 111%"
                                class="text-primary font-sans ms-2 font-bold"
                              >
                                {{
                                  priceFormatLocale(cart.subtotal(node.raw.id))
                                }}
                              </em>
                              <small class="text-disabled ms-[3px]">RSD</small>
                            </p>
                          </div>
                        </VCardText>
                      </VCard>
                    </template>
                  </div>
                </template>
              </VDataIterator>
            </VCardText>
          </VCol>
          <VCol sm="6" class="*bg-green-200">
            <VForm @submit.prevent autocomplete="off">
              <div class="fields--placer pa-4 space-y-3">
                <VTextarea
                  v-model="form.description.value"
                  autofocus
                  hint="Dodatno uputstvo proizvođačima vezano za naručenu robu"
                  clearable
                  name="order_description"
                  label="Napomena: "
                  variant="outlined"
                />
                <VTextField
                  hint="Za proizvođače koji ga podržavaju"
                  variant="underlined"
                  clearable
                  v-model="form.title.value"
                  name="order_title"
                  label="Promo kod: "
                />
                <VCheckbox
                  color="primary"
                  name="order_send_email"
                  v-model="form.email.value"
                >
                  <template #label>
                    <span class="text-body-1 !font-sans *font-italic"
                      >Pošalji kopiju narudžbe na moj
                      <em class="d-inline-block">
                        <span class="text-primary">email.</span>
                        <VTooltip
                          text="user@email.com"
                          activator="parent"
                          location="bottom"
                          open-delay="345"
                        />
                      </em>
                    </span>
                  </template>
                </VCheckbox>
                <VCardActions class="justify-center">
                  <VBtn
                    type="submit"
                    variant="elevated"
                    color="primary"
                    size="x-large"
                    :width="243"
                    :height="87"
                  >
                    <span class="d-inline-flex flex-col gap-[2px]">
                      <span>U redu,</span>
                      <strong class="mt-1">Poručujem.</strong>
                    </span>
                    <template #prepend>
                      <VIcon start :size="51" icon="$iconDeliveryTruckSpeed" />
                    </template>
                    <VTooltip
                      open-delay="345"
                      location="bottom"
                      activator="parent"
                      text="Pošalji porudžbinu proizvođačima"
                    />
                  </VBtn>
                </VCardActions>
              </div>
            </VForm>
          </VCol>
        </VRow>
      </VContainer>
    </div>
  </VCard>
</template>
<style lang="scss" scoped>
// .cart-order-confirm--bg-image-01 {
//   background: white url("~/assets/images/bg-cart-order-confirm-01.png");
//   background-size: cover;
// }
</style>
