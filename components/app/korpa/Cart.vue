<script setup lang="ts">
import { useDisplay } from "vuetify";
import {
  VCardOrderConfirm,
  CardCartItem,
  CartEmpty,
  VChipProductPrice,
  CardOrderConfirmSuccess,
} from "@/components/app";
// defs
const {
  key: { APP_PROCESSING, ORDER_SEND_STATUS, ORDER_ID },
} = useAppConfig();
// flag, ref
const flagOrderSendStatus$ = useGlobalFlag(ORDER_SEND_STATUS);
const flagsAppProcessing$ = useGlobalFlag(APP_PROCESSING);
const toggleOrderConfirm = useToggleFlag();
// utill
const { smAndUp, width, height } = useDisplay();
const cart = useStoreCart();
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
watchEffect(() => {
  appProcessing$.value = cart.loading;
});
const {
  perPage,
  length: paginationLength,
  page$,
} = usePaginateData({ data: computed(() => cart.products), perPage: 4 });

const OID$ = useGlobalVariable(ORDER_ID);
const onOrderConfirmSuccess = async () => {
  console.log("onOrderConfirmSuccess");
  OID$.value = null;
  cart.close();
};

// @@eos
</script>
<template>
  <VCard
    rounded="0"
    elevation="0"
    class="bg--cart-vector-01 pt-1 fill-height ma-0 pa-0 pb-4 px-1 scrollbar-thin-light"
  >
    <!-- @order:confirm:dialog -->
    <VBottomSheet v-model="toggleOrderConfirm.isActive.value">
      <VCardOrderConfirm :close="toggleOrderConfirm.off" />
    </VBottomSheet>

    <!-- @@order:success -->
    <!-- render success screen -->
    <CardOrderConfirmSuccess
      v-if="OID$"
      @order-confirmed="onOrderConfirmSuccess"
    />

    <!-- @@ spacer:parent -->
    <!-- @@ cart:items -->
    <div v-else class="!max-w-[1352px] w-full mx-auto">
      <VDataIterator
        :items="cart.products"
        :page="page$"
        :items-per-page="perPage"
      >
        <template #no-data>
          <CartEmpty />
        </template>

        <!-- @@ -->
        <!-- @cart:toolbar -->
        <template #header>
          <!-- @@ -->
          <!-- @cart:toolbar:controlls -->
          <VToolbar
            elevation="1"
            rounded="pill"
            color="white"
            :density="!smAndUp ? 'compact' : undefined"
            :class="858 < width ? 'ps-1' : 'ps-3'"
            :height="812 < width ? 102 : 91"
            image="~/assets/images/bg-cart-toolbar.png"
          >
            <template #image>
              <VImg position="0 0" />
            </template>
            <!-- @cart:exit -->
            <VBtn
              :size="
                812 < width ? undefined : 382 < width ? 'small' : 'x-small'
              "
              icon
              variant="text"
              @click="cart.close"
            >
              <VIcon icon="$prev" size="large" />
              <VTooltip
                text="Pijaca"
                activator="parent"
                open-delay="345"
                location="bottom"
              />
            </VBtn>

            <!-- @cart:cena -->
            <div
              class="ms-4 *bg-red-200 fill-height d-flex flex-col justify-center"
            >
              <p class="ms-n2">
                <em
                  v-if="1024 < width"
                  class="align-middle font-sans text-medium-emphasis"
                  >Vrednost:
                </em>

                <!-- @@price.total -->
                <VChipProductPrice
                  elevation="2"
                  :class="1024 < width ? 'ms-3' : 492 < width ? 'ms-0' : ''"
                  :size="
                    1024 < width ? 'x-large' : 812 < width ? undefined : 'small'
                  "
                  :price-only="priceFormatLocale(cart.total$)"
                />
              </p>
            </div>

            <!-- pager -->
            <div
              class="*bg-green-200 grow d-flex flex-col items-center space-y-1 pt-1"
            >
              <!-- p products:length -->
              <p v-if="612 < width" class="text-center *bg-red">
                <VBadge
                  color="primary3-darken-1 !shadow"
                  inline
                  class="scale-[112%]"
                >
                  <template #badge>
                    {{ cart.length }}
                  </template>
                </VBadge>
                <span
                  style="font-size: 93%"
                  class="ms-1 text-medium-emphasis tracking-wider"
                >
                  <span v-if="712 < width">{{
                    1 < cart.length ? "proizvoda" : "proizvod"
                  }}</span>
                  u korpi
                </span>
              </p>
              <!-- pagination -->
              <VPagination
                v-if="1 < paginationLength"
                v-model="page$"
                :length="paginationLength"
                active-color="primary3"
                rounded="circle"
                class="*bg-blue-200 grow !w-full"
                :class="333 < width ? undefined : 'ms-n2'"
                :size="1024 < width ? undefined : 'small'"
              >
                <template #item="{ props, page, isActive }">
                  <VBtn
                    :size="1024 < width ? undefined : 'small'"
                    v-bind="props"
                    density="comfortable"
                    :variant="isActive ? 'elevated' : 'text'"
                    icon
                    rounded="circle"
                    class="mt-[.35rem]"
                  >
                    <pre>{{ page }}</pre>
                  </VBtn>
                </template>
              </VPagination>
            </div>

            <!-- view order -->
            <VBtn
              v-if="!cart.isEmpty"
              @click="toggleOrderConfirm.on"
              :size="
                1172 < width ? 'x-large' : 812 < width ? 'large' : undefined
              "
              :class="
                1172 < width ? 'me-12' : `me-2 ${333 < width ? '' : 'ms-n3'}`
              "
              color="primary"
              variant="elevated"
              rounded="pill"
            >
              <VIcon
                v-if="812 < width"
                class="rotate-2"
                start
                size="large"
                icon="$iconChecklist"
              />
              <strong v-if="682 < width">Naručivanje</strong>
              <strong v-else-if="582 < width">Naruči</strong>
              <VIcon v-else size="28" icon="$iconDeliveryTruck" />
              <VTooltip
                activator="parent"
                open-delay="345"
                location="bottom"
                text="Pregled porudžbine za slanje..."
              />
            </VBtn>

            <VBtn
              v-if="!cart.isEmpty && 812 < width"
              @click="cart.destroy"
              color="primary"
              variant="tonal"
              icon
              size="small"
              class="ms-2"
            >
              <VTooltip
                location="bottom"
                open-delay="345"
                activator="parent"
                text="Isprazni korpu"
              />
              <VIcon size="26" icon="$iconCartOff" />
              <span class="sr-only">Isprazni korpu</span>
            </VBtn>

            <!-- @cart:exit -->
            <VBtn
              v-if="656 < width"
              icon
              variant="text"
              @click="cart.close"
              class="ms-2"
              :size="812 < width ? undefined : 'small'"
            >
              <VIcon icon="$close" size="large" />
              <VTooltip
                text="Pijaca"
                activator="parent"
                open-delay="345"
                location="bottom"
              />
            </VBtn>
          </VToolbar>
        </template>

        <!-- @@ cart:selected-products:render -->
        <template #default="{ items }">
          <VSheet
            color="transparent"
            rounded="lg"
            elevation="2"
            max-width="1024"
            class="!bg-white/20 backdrop-blur-md mt-3 pa-4 mx-auto space-y-1 sm:space-y-3"
          >
            <CardCartItem v-for="i in items" :key="i.raw" :pid="i.raw" />
          </VSheet>
        </template>
      </VDataIterator>
    </div>
  </VCard>
</template>
<style lang="scss" scoped>
.bg--cart-vector-01 {
  background: white url("~/assets/images/bg-cart-vector.png");
  background-size: 246%;
  background-position: 50% 5%;
  background-attachment: scroll;
}
</style>
