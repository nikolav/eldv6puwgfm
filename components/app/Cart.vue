<script setup lang="ts">
import { CardCartItem } from "@/components/app";
import { useGlobalFlag } from "~/composables/useGlobalFlag";
// cart.store { code: string; description: string; items: Record<ID, amount> }
const cart = useStoreCart();
const {
  key: { APP_PROCESSING, ORDER_SEND_STATUS },
} = useAppConfig();
const perPage = 4;
const page$ = ref(1);
const paginationLength$ = computed(() => Math.ceil(cart.length / perPage));
const flagOrderSendStatus$ = useGlobalFlag(ORDER_SEND_STATUS);
const flags$$ = useStoreFlags();
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

// @@eos
</script>
<template>
  <VSheet rounded="0" elevation="0" class="d-flex items-center justify-center">
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
    <div class="w-[712px]">
      <VDataIterator
        :items="cart.products"
        :page="page$"
        :items-per-page="perPage"
        class="space-y-4"
      >
        <template #no-data> --no-data-vPT8o </template>
        <template #header>
          <VToolbar flat rounded>
            <h4 class="ms-4">
              <span class="text-medium-emphasis">Vrednost: </span>
              <strong class="me-px">{{ cart.total$ }}</strong
              >din.
            </h4>
            <VSpacer />
            <VBtn
              @click="cartOrderSend"
              size="large"
              color="primary"
              variant="tonal"
            >
              <VIcon start size="large" icon="$iconSave" /><span>Naruči</span>
            </VBtn>
          </VToolbar>
        </template>
        <template #footer>
          <VPagination
            v-if="1 < paginationLength$"
            v-model="page$"
            :length="paginationLength$"
            density="comfortable"
            variant="text"
          />
        </template>
        <template #default="{ items }">
          <CardCartItem v-for="i in items" :key="i.raw" :pid="i.raw" />
        </template>
      </VDataIterator>
    </div>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
