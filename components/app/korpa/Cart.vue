<script setup lang="ts">
import { useDisplay } from "vuetify";
import { CardCartItem, CartEmpty, VChipProductPrice } from "@/components/app";
// defs
const {
  key: { APP_PROCESSING, ORDER_SEND_STATUS },
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
// helper
const cartOrderSend = async () => {
  let err_;
  if (!cart.isEmpty) {
    try {
      flagsAppProcessing$.value = true;
      await cart.sendOrder();
    } catch (error) {
      err_ = error;
      console.error(error);
    }
    if (!err_) {
      flagOrderSendStatus$.value = true;
      await nextTick(() => {
        flagsAppProcessing$.value = false;
      });
      cart.destroy();
      cart.close();
    }
  }

  return err_;
};

// @@eos
</script>
<template>
  <VSheet rounded="0" elevation="0">
    <!-- @order:confirm:dialog -->
    <VBottomSheet v-model="toggleOrderConfirm.isActive.value">
       <VBtn 
         @click="toggleOrderConfirm.off" 
         position="absolute" class="top-6 end-6" 
         size="large" variant="tonal"
         icon
        >
        <VIcon icon="$close" size="large" />
      </VBtn>
      <VSheet
        :min-height="height * 0.92"
        rounded="t-xl"
        class="pa-6 d-flex flex-col justify-center items-center gap-12"
      >
        <p class="text-h6 text-medium-emphasis">Vrednost izabranih proizvoda je <pre class="d-inline-block !text-black">{{ cart.total$ }}</pre> din.</p>
        <VBtnGroup rounded="pill">
          <VBtn 
            v-if="smAndUp" @click="toggleOrderConfirm.off" 
            variant="text" size="x-large" 
            color="error"
          >Nazad</VBtn>
          <VBtn 
            @click="cartOrderSend" :disabled="flagsAppProcessing$" 
            variant="elevated" 
            class="text-none" :size="smAndUp ? 'x-large' : 'large'" color="primary"
          >
             <VIcon v-if="smAndUp" class="opacity-50" size="large" icon="$iconCheck" start />
             <strong>U redu, Naručujem.</strong>
          </VBtn>
        </VBtnGroup>
      </VSheet>
    </VBottomSheet>
    
    
    <!-- @@ spacer:parent -->
    <!-- @@ cart:items -->
    <div class="mt-1 mx-2">
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
              :size="812 < width ? undefined : (382 < width ? 'small' : 'x-small')"
              icon
              variant="text"
              @click="cart.close"
                >
              <VIcon icon="$prev" size="large" />
              <VTooltip text="Pijaca" activator="parent" open-delay="345" location="bottom" />
            </VBtn>
          
            <!-- @cart:cena -->
            <div
              class="ms-4 *bg-red-200 fill-height d-flex flex-col justify-center">
              <p>
                <em 
                  v-if="1024 < width"
                  class="align-middle font-sans text-medium-emphasis"
                  >Vrednost:
                </em>
                
                <!-- @@price.total -->
                <VChipProductPrice
                  elevation="2" 
                  :class="1024 < width ? 'ms-3' : 'ms-0'" 
                  :size="1024 < width ? 'x-large' : (812 < width ? undefined : 'small')"
                  :price-only="priceFormatLocale(cart.total$)"
                />
              </p>
            </div>

            <!-- pager -->
            <div
              :class="812 < width ? 'pt-4' : 'pt-1'"
              class="*bg-green-200 grow d-flex flex-col items-center space-y-1">
              <!-- p products:length -->
              <p
              v-if="612 < width"
                class="text-center *bg-red">
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
                  style="font-size: 93%;" 
                  class="ms-1 text-medium-emphasis tracking-wider">
                    <span v-if="712< width">{{ 1 < cart.length ? 'proizvoda' : 'proizvod' }}</span> u korpi
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
              :size="912 < width ? 'x-large' : (812 < width ? undefined : 'small')"
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
              <strong v-if="682 < width">Porudžbina</strong>
              <strong v-else-if="582 < width">Poruči</strong>
              <VIcon 
                v-else
                size="28" 
                icon="$iconDeliveryTruck"
              />
              <VTooltip activator="parent" open-delay="345" location="bottom" text="Pregled porudžbine za slanje..." />
            </VBtn>

            <VBtn
                v-if="!cart.isEmpty && (812 < width)"
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
            <VTooltip text="Pijaca" activator="parent" open-delay="345" location="bottom" />
          </VBtn>
          </VToolbar>
        </template>

        <!-- @@ cart:selected-products:render -->
        <template #default="{ items }">
          <VSheet
            rounded="lg"
            elevation="1"
            max-width="1024"
            class="mt-2 pa-4 mx-auto space-y-1 sm:space-y-3"
          >
            <CardCartItem v-for="i in items" :key="i.raw" :pid="i.raw" />
          </VSheet>
        </template>

      </VDataIterator>
    </div>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
