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
  <VSheet rounded="0" elevation="0" class="d-flex *items-center justify-center">
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
    
    
    <!-- @@ -->
    <!-- @cart:items -->
    <div class="w-full mt-3 mx-5">
      <VDataIterator
        :items="cart.products"
        :page="page$"
        :items-per-page="perPage"
        class="space-y-1 sm:space-y-4"
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
            elevation="2"
            rounded="pill"
            color="white"
            :density="!smAndUp ? 'compact' : undefined"
            :class="858 < width ? 'ps-1' : 'ps-3'" 
            :height="102"
          >
            <!-- @cart:exit -->
            <VBtn
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
                  v-if="802 < width"
                  class="align-middle font-sans text-medium-emphasis"
                  >Vrednost:
                </em>
                
                <!-- @@price.total -->
                <VChipProductPrice
                  elevation="2" 
                  :class="858 < width ? 'ms-3' : 'ms-0'" 
                  size="x-large" 
                  :price-only="priceFormatLocale(cart.total$)"
                />
              </p>
            </div>

          
            <div class="*bg-green-200 grow d-flex flex-col items-center pt-4 space-y-1">
              <!-- p products:length -->
              <p class="text-center *bg-red">
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
                  v-if="858 < width" style="font-size: 93%;" 
                  class="ms-1 text-medium-emphasis tracking-wider">
                    {{ 1 < cart.length ? 'proizvoda' : 'proizvod' }} u korpi
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
              >
                <template #item="{ props, page, isActive }">
                  <VBtn
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

            <VBtn
              v-if="!cart.isEmpty"
              @click="toggleOrderConfirm.on"
              :size="858 < width ? 'x-large' : undefined"
              color="primary"
              variant="elevated"
              rounded="pill"
            >
              <VIcon
                v-if="smAndUp" 
                class="rotate-2" 
                start
                size="x-large"
                icon="$iconChecklist" 
              />
                <strong>Porudžbina</strong>
                <VTooltip activator="parent" open-delay="345" location="bottom" text="Pregled porudžbine za slanje..." />
            </VBtn>

            <VBtn
                v-if="!cart.isEmpty"
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
            icon
            variant="text"
            @click="cart.close"
            class="ms-2"
          >
            <VIcon icon="$close" size="large" />
            <VTooltip text="Pijaca" activator="parent" open-delay="345" location="bottom" />
          </VBtn>
          </VToolbar>
        </template>

        <!-- @@ -->
        <!-- @cart:selected-products:render -->
        <template #default="{ items }">
          <CardCartItem v-for="i in items" :key="i.raw" :pid="i.raw" />
        </template>
      </VDataIterator>
    </div>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
