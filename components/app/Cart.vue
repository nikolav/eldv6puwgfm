<script setup lang="ts">
import { useDisplay } from "vuetify";
import { CardCartItem, CartEmpty } from "@/components/app";

const { smAndUp, width, height } = useDisplay();

const cart = useStoreCart();
const {
  key: { APP_PROCESSING, ORDER_SEND_STATUS },
} = useAppConfig();
const {
  perPage,
  length: paginationLength,
  page$,
} = usePaginateData({ data: computed(() => cart.products), perPage: 4 });
const flagOrderSendStatus$ = useGlobalFlag(ORDER_SEND_STATUS);
const flagsAppProcessing$ = useGlobalFlag(APP_PROCESSING);
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

const toggleOrderConfirm = useToggleFlag();

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
            color="primary"
          >Odustani</VBtn>
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
    <!-- @cart:start -->
    <p
      v-if="!cart.isEmpty"
      class="position-absolute top-1 text-medium-emphasis"
    >
      Ukupno
      <VBadge color="error" inline class="align-baseline d-inline-block">
        <template #badge>
          <pre>{{ cart.length }}</pre>
        </template>
      </VBadge>
      {{ 1 < cart.length ? "proizvoda" : "proizvod" }} u korpi.
    </p>
    <!-- @cart:exit -->
    <VBtn
      icon
      variant="text"
      position="absolute"
      class="z-10 top-1 start-1"
      @click="cart.close"
      size="large"
    >
      <VIcon icon="$prev" size="large" />
    </VBtn>
    <!-- @cart:exit -->
    <VBtn
      icon
      variant="text"
      position="absolute"
      class="z-10 top-1 end-1"
      @click="cart.close"
      size="large"
    >
      <VIcon icon="$close" size="large" />
    </VBtn>
    <!-- @@ -->
    <!-- @cart:items -->
    <div class="w-[812px] mt-16">
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
          <VPagination
            v-if="1 < paginationLength"
            v-model="page$"
            :length="paginationLength"
            density="comfortable"
            active-color="primary3"
            rounded="circle"
          >
            <template #item="{ props, page, isActive }">
              <VBtn
                v-bind="props"
                density="comfortable"
                :variant="isActive ? 'elevated' : 'text'"
                icon
                rounded="circle"
              >
                <pre>{{ page }}</pre>
              </VBtn>
            </template>
          </VPagination>
          <!-- @@ -->
          <!-- @cart:toolbar:controlls -->
          <VToolbar
            elevation="1"
            rounded
            color="primary3"
            :density="!smAndUp ? 'compact' : undefined"
            :class="width < 281 ? 'px-12' : undefined"
          >
            <h4 class="ms-4">
              <span class="text-medium-emphasis" v-if="smAndUp"
                >Vrednost:
              </span>
              <span
                class="d-inline-block space-x-[2px] bg-error rounded-pill p-1 px-3 !shadow"
              >
                <strong class="me-px">{{ cart.total$ }}</strong>
                <span class="opacity-70">din.</span>
              </span>
            </h4>
            <VSpacer />
            <!-- @@ -->
            <VBtn
              v-if="!cart.isEmpty"
              @click="cart.destroy"
              size="small"
              color="primary"
              variant="tonal"
              icon
            >
              <VTooltip
                location="bottom"
                open-delay="345"
                activator="parent"
                text="Isprazni korpu"
              />
              <VIcon size="x-large" icon="$iconCartOff" />
              <span class="sr-only">Isprazni korpu, Odustani</span>
            </VBtn>
            <VBtn
              v-if="!cart.isEmpty"
              @click="toggleOrderConfirm.on"
              :size="smAndUp ? 'large' : undefined"
              color="primary"
              variant="elevated"
              class="ms-1 ms-sm-2"
              rounded="pill"
            >
              <VIcon v-if="smAndUp" start size="large" icon="$iconSave" /><span
                >Naruči</span
              >
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
