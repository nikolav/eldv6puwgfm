<script setup lang="ts">
import { useDisplay } from "vuetify";
import { OrdersProduct, ChatOrder } from "@/components/app";
import type { IOrdersProducts } from "~/types";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

const {
  docs: { CHAT_ORDER_COM_USER_prefix },
  key: { APP_PROCESSING, CHAT_CLIENTID_ACTIVE, ORDER_ACTIVE },
} = useAppConfig();
const { $date } = useNuxtApp();
const dateFormated = (d: string) => $date(d).format("D. MMMM YYYY.");

const { xs, smAndUp, width } = useDisplay();
const auth = useStoreApiAuth();

const { users } = useQueryUsers();

const orderActive$ = useGlobalVariable(ORDER_ACTIVE);
const { orders: orders_, reload: ordersReload } = useQueryOrdersReceived();
// const flags$$ = useStoreFlags();
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
const ordersReloadStatus = async () => {
  try {
    appProcessing$.value = true;
    await nextTick(ordersReload);
  } catch (error) {
    // pass
  }
  appProcessing$.value = false;
};
const { order_id$, products: products_ } = useQueryOrdersProducts();
const orderIdActive = (id: number) => id == orderActive$.value;
watchEffect(() => {
  order_id$.value = orderActive$.value;
});

const user_ = computed(() =>
  0 < orderActive$.value
    ? find(users.value, {
        id: get(find(orders_.value, { id: orderActive$.value }), "user_id"),
      })
    : undefined
);
const emailStartByUserId = (id: any) =>
  matchEmailStart(
    get(
      find(users.value, {
        id,
      }),
      "email"
    )
  );
const clientIdActive$ = useGlobalVariable(CHAT_CLIENTID_ACTIVE);
watch(
  () => user_.value?.id,
  (id) => {
    clientIdActive$.value = id;
  }
);

const toggleOrderChatActive = useToggleFlag();
const { topic$: chatId$, data: chatOrder$ } = useDocs();
const topicChatOrderUser$ = computed(() =>
  0 < orderActive$.value && user_.value?.id
    ? `${CHAT_ORDER_COM_USER_prefix}${orderActive$.value}:${get(
        auth.user$,
        "id"
      )}:${user_.value.id}`
    : undefined
);
watch(topicChatOrderUser$, (topic) => {
  if (!topic) return;
  chatId$.value = topic;
});

const {
  perPage,
  length: paginationLength$,
  page$,
} = usePaginateData({ data: orders_, perPage: 5 });

const calcOrderTotal = (products: IOrdersProducts[]) =>
  reduce(
    products,
    (res, p) => {
      if (p?.price) {
        res += p.amount * p.price;
      }
      return res;
    },
    0
  );

watchEffect(() => {
  if (null != orderActive$.value) return;
  if (isEmpty(orders_.value)) return;
  orderActive$.value = get(orders_.value, "[0].id");
});

// #eos
</script>
<template>
  <section class="page--company-profile">
    <VNavigationDrawer
      v-model="toggleOrderChatActive.isActive.value"
      location="end"
      :width="xs ? width : 412"
      :order="-1"
      absolute
      temporary
    >
      <ChatOrder :close="toggleOrderChatActive.off" :topic="chatId$" />
    </VNavigationDrawer>
    <div class="max-w-[912px] mx-auto px-1 mt-2 mt-sm-8">
      <VCard>
        <!-- @orders-crud:toolbar -->
        <VCardItem class="bg-primary">
          <VCardTitle
            ><span v-if="smAndUp">Primljene narudžbe</span>
            <VBadge inline color="primary-lighten-1" class="-translate-y-[2px]">
              <template #badge>
                <pre>{{ orders_.length }}</pre>
              </template>
            </VBadge>
          </VCardTitle>
          <!-- @orders-crud:actions -->
          <template #append>
            <div class="space-x-2">
              <VBtn
                icon
                variant="text"
                color="on-primary"
                @click="ordersReloadStatus"
              >
                <VIcon icon="$loading" size="large" />
                <VTooltip
                  location="bottom"
                  activator="parent"
                  open-delay="345"
                  text="Osveži listu narudžbi"
                />
              </VBtn>
              <VBtn
                :disabled="!topicChatOrderUser$"
                variant="text"
                color="on-primary"
                icon
                @click="toggleOrderChatActive.on"
              >
                <VBadge color="primary3" :model-value="0 < chatOrder$.length">
                  <VIcon icon="$iconChatDots" size="large" />
                  <template #badge>
                    <pre>{{ chatOrder$.length }}</pre>
                  </template>
                </VBadge>
                <VTooltip
                  activator="parent"
                  open-delay="345"
                  text="Poruke..."
                  location="bottom"
                />
              </VBtn>
            </div>
          </template>
        </VCardItem>
        <!-- @orders-crud:list -->
        <VContainer fluid class="ma-0 pa-1">
          <VRow dense>
            <VCol :order="1" :order-sm="0" sm="8">
              <VDataIterator :items="products_">
                <template #default="{ items }">
                  <div class="space-y-1 px-2 my-2">
                    <p>
                      <span class="text-medium-emphasis">Poručio: </span
                      >{{ emailStartByUserId(user_?.id) }}
                    </p>
                    <VDivider thickness="2" class="mb-2" />
                    <OrdersProduct
                      v-for="p in items"
                      :key="p.raw.id"
                      :product="p.raw"
                    />
                  </div>
                  <VDivider thickness="2" class="*mb-2" />
                  <p class="text-end pe-4 my-4">
                    <span class="text-medium-emphasis">Vrednost: </span>
                    <em
                      >{{
                        calcOrderTotal(map(items, ({ raw }) => raw))
                      }}din.</em
                    >
                  </p>
                </template>
              </VDataIterator>
            </VCol>
            <VCol sm="4" class="*bg-primary2-lighten-2 border-s">
              <VPagination
                v-if="1 < paginationLength$"
                density="comfortable"
                id="orders-pagination"
                active-color="primary"
                :length="paginationLength$"
                v-model="page$"
                size="small"
                rounded="circle"
                variant="text"
              />

              <VDataIterator
                :items="orders_"
                :page="page$"
                :items-per-page="perPage"
              >
                <template #default="{ items }">
                  <VList
                    lines="one"
                    color="primary"
                    class="bg-transparent orders--list"
                  >
                    <VListItem
                      v-for="order in items"
                      :key="order.raw.id"
                      @click="orderActive$ = order.raw.id"
                      :active="orderIdActive(order.raw.id)"
                      class="ps-2"
                      rounded
                    >
                      <VListItemTitle class="d-flex items-center">
                        <pre
                          class="text-xs d-inline-block translate-y-px text-disabled me-4"
                        >
#{{ order.raw.id }}</pre
                        >
                        <span class="d-inline-block text-truncate">
                          {{ emailStartByUserId(order.raw.user_id) }}
                        </span>
                        <VSpacer />
                        <pre
                          class="translate-y-px d-inline-block text-disabled text-xs font-italic"
                          >{{ dateFormated(order.raw.created_at) }}</pre
                        >
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
<style lang="scss">
// #orders-pagination .v-pagination__list {
//   justify-content: start;
// }
.orders--list .v-list-item__spacer {
  width: 0.22rem !important;
}
</style>
