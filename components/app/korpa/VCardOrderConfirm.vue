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
  close: () => void;
}>();
const {
  key: { APP_PROCESSING, ORDER_ID },
} = useAppConfig();

// refs
const ID$ = useGlobalVariable(ORDER_ID);
const appProcessing$ = useGlobalFlag(APP_PROCESSING);

// stores
const auth = useStoreApiAuth();
const cart = useStoreCart();
const { products$ } = useQueryProductsOnly(() => cart.products);

// utils
const { width, height, mdAndUp } = useDisplay();
const {
  form,
  submit: orderSubmit,
  clear: formClear,
} = useFormDataFields(
  "pUnpA4sQ",
  {
    code: True,
    description: True,
    email: True,
  },
  {
    onSubmit: async (data) => {
      cart.putData(data);
      try {
        ID$.value = await cart.sendOrder();
      } catch (error) {
        throw error;
      }
    },
  }
);

// computes
const lHeight = computed(() => height.value - CALC_HEIGHT_PRODUCTS_LIST_OFFSET);
const email_ = computed(() => get(auth.user$, "email"));

// watches
watchEffect(() => {
  appProcessing$.value ||= cart.loading;
});
watch(ID$, async (oid) => {
  console.log({ "order-placed-id": oid });

  if (!(0 < oid)) return;

  // @order:placed
  formClear();
  cart.destroy();
  props.close();
});

// @@eos
</script>
<template>
  <VCard
    :min-height="height * 0.91"
    rounded="t-xl"
    class="cart-order-confirm--bg-image-svg pt-10 px-6 !bg-stone-100"
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
    <div class="order--palcer !max-w-[1372px] mx-auto grow !w-full">
      <!-- @@order:title -->
      <VSheet color="transparent">
        <div
          :class="[
            'd-flex items-center',
            452 < width ? 'ps-16' : 'ps-8',
            582 < width ? 'pe-32' : 'pe-16',
          ]"
        >
          <VIcon
            v-if="392 < width"
            class="d-inline-block pa-0 ma-0 opacity-50"
            :class="452 < width ? 'scale-[256%]' : 'scale-[188%]'"
            color="primary-darken-1"
            :size="55"
            icon="$iconLogoKantarH"
          />
          <VSpacer v-if="1024 < width" />
          <VSpacer v-if="1024 < width" />
          <VCardTitle v-if="1024 < width">
            <h4 class="text-h4 !font-sans opacity-75">Potvrdi narudžbenicu:</h4>
          </VCardTitle>
          <VSpacer v-if="1024 < width" />
          <VSpacer v-if="392 < width" />
          <div class="d-flex items-center ga-8">
            <p v-if="712 < width" class="opacity-70">Ukupna vrednost:</p>
            <VChipProductPrice
              :size="492 < width ? 'large' : 'small'"
              class="scale-125"
              :price-only="priceFormatLocale(cart.total$)"
            />
          </div>
        </div>
      </VSheet>

      <VDivider thickness="2" class="border-opacity-50 w-[91%]" />

      <!-- @@order:details -->
      <div class="VContainer--placer pa-4 *bg-blue-100">
        <VContainer fluid class="*bg-blue-200 pa-0">
          <VRow class="*bg-blue-300" no-gutters>
            <VCol md="6" class="*bg-blue-400">
              <VCardTitle class="d-flex items-center">
                <h4 class="text-h4 !font-sans">
                  <span v-if="392 < width">Izabrani artikli:</span>
                  <span v-else>Artikli:</span>
                </h4>
                <VBadge inline color="primary" class="ms-3">
                  <template #badge>
                    <pre>{{ cart.length }}</pre>
                  </template>
                </VBadge>
              </VCardTitle>
              <VCardText
                :style="mdAndUp ? `height: ${lHeight}px` : undefined"
                class="max-h-[812px] pt-2 *bg-stone-200 overflow-auto *bg-blue scrollbar-thin-light"
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
                                <a
                                  class="text-primary-darken-1 link--prominent"
                                >
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
                                <span class="text-medium-emphasis">
                                  Iznos:
                                </span>
                                <em
                                  style="font-size: 111%"
                                  class="text-primary font-sans ms-2 font-bold"
                                >
                                  {{
                                    priceFormatLocale(
                                      cart.subtotal(node.raw.id)
                                    )
                                  }}
                                </em>
                                <small class="text-disabled ms-[3px]"
                                  >RSD</small
                                >
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
            <VCol md="6" class="*bg-green-200">
              <VForm @submit.prevent="orderSubmit" autocomplete="off">
                <div
                  :class="[
                    'fields--placer space-y-3',
                    612 < width ? 'pa-10' : 392 < width ? 'pa-4' : 'pa-1',
                  ]"
                >
                  <VTextarea
                    v-model.trim="form.description.value"
                    autofocus
                    hint="Dodatno uputstvo proizvođačima u vezi naručene robu"
                    clearable
                    name="order_description"
                    label="Napomena: "
                    variant="outlined"
                  />
                  <VTextField
                    hint="Za proizvođače koji ga podržavaju"
                    variant="underlined"
                    clearable
                    v-model.trim="form.code.value"
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
                          <!-- @@ -->
                          <VTooltip
                            :text="email_"
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
                      :width="248"
                      :height="92"
                      class="ms-[5%]"
                      rounded
                    >
                      <span
                        style="font-size: 104%"
                        class="d-inline-flex flex-col gap-[3px]"
                      >
                        <span>U redu,</span>
                        <strong class="mt-1">Naručujem</strong>
                      </span>
                      <template #prepend>
                        <VIcon
                          start
                          :size="51"
                          icon="$iconDeliveryTruckSpeed"
                        />
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
    </div>
  </VCard>
</template>
<style lang="scss" scoped>
.cart-order-confirm--bg-image-svg {
  background: transparent url("~/assets/svg/store-front-outline.svg");
  background-repeat: no-repeat;
  background-size: 106%;
  background-position: -604% 48%;
  background-attachment: scroll;
}
</style>
