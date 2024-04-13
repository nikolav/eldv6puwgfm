<script setup lang="ts">
import { Q_ordersReceived, Q_ordersReceivedProducts } from "@/graphql";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

const orderActive$ = ref();
const orderIdActive = (id: number) => id == orderActive$.value;
const { result, load } = useLazyQuery(Q_ordersReceived);
const orders_ = computed(() => get(result.value, "ordersReceived") || []);
const { runSetup: queryStart } = useRunSetupOnce(async () => await load());
onMounted(queryStart);

const perPage = 6;
const page$ = ref(1);
const paginationLength$ = computed(() =>
  Math.ceil(orders_.value.length / perPage)
);

const productsEnabled_ = computed(() => 0 < orderActive$.value);
const { result: resultProducts, load: loadProducts } = useLazyQuery(
  Q_ordersReceivedProducts,
  {
    order_id: orderActive$,
  },
  {
    fetchPolicy: "no-cache",
    enabled: productsEnabled_,
  }
);
const products_ = computed(
  () => get(resultProducts.value, "ordersReceivedProducts") || []
);
const { runSetup: queryStartProducts } = useRunSetupOnce(
  async () => await loadProducts()
);
onMounted(queryStartProducts);

// #eos
</script>
<template>
  <section class="page--company-profile">
    <h1>@todo --company-home</h1>
    <div class="max-w-[956px] mx-auto">
      <VCard>
        <VCardItem append-icon="$close" class="bg-primary">
          <VCardTitle>Primljene narudžbe | {{ orderActive$ }}</VCardTitle>
        </VCardItem>
        <VContainer fluid class="ma-0 pa-1">
          <VRow dense>
            <VCol md="8">
              <pre>{{ JSON.stringify(products_, null, 2) }}</pre>
            </VCol>
            <VCol md="4" class="*bg-primary2-lighten-2 border-s">
              <VPagination
                v-if="1 < paginationLength$"
                id="orders-pagination"
                active-color="primary"
                :length="paginationLength$"
                v-model="page$"
                size="small"
                rounded="circle"
                variant="text"
                class="grow"
              />
              <VDataIterator
                :items="orders_"
                :page="page$"
                :items-per-page="perPage"
              >
                <template #default="{ items }">
                  <VList lines="one" color="primary" class="bg-transparent">
                    <VListItem
                      v-for="order in items"
                      :key="order.raw.id"
                      @click="orderActive$ = order.raw.id"
                      :active="orderIdActive(order.raw.id)"
                      class="ps-2"
                      rounded
                    >
                      <VListItemTitle>
                        {{ order.raw.id }}, --{{ order.raw.user_id }}
                      </VListItemTitle>
                      <template #prepend>
                        <VIcon
                          :color="
                            orderIdActive(order.raw.id) ? 'primary' : undefined
                          "
                          :icon="
                            orderIdActive(order.raw.id)
                              ? '$iconCheckboxOn'
                              : '$iconCheckboxOff'
                          "
                          size="large"
                        />
                      </template>
                    </VListItem>
                  </VList>
                </template>
              </VDataIterator>
            </VCol>
          </VRow>
        </VContainer>
      </VCard>
    </div>
  </section>
</template>
<style lang="scss" scoped>
// #orders-pagination .v-pagination__list {
//   justify-content: start;
// }
</style>
