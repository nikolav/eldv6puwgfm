<script setup lang="ts">
import { Dump } from "@/components/dev";
import { useDisplay } from "vuetify";
import {
  OrdersProduct,
  ChatOrder,
  VCardOrderDetails,
  AvatarThumb,
} from "@/components/app";

// defs
definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});
useHead({
  title: "Primljene narudžbe",
});
const {
  key: { ORDER_ACTIVE },
} = useAppConfig();

// refs
const orderActive$ = useGlobalVariable(ORDER_ACTIVE);
const toggleOrderChatActive = useToggleFlag();
const toggleOrderDetails = useToggleFlag();

// stores
const auth = useStoreApiAuth();
const { users } = useQueryUsers();
const {
  orders: orders_,
  reload: ordersReload,
  loading: ordersLoading,
} = useQueryOrdersReceived();
const { order_id$, products: products_ } = useQueryOrdersProducts();
const { topic$: chatId$, data: chatOrder$ } = useDocs();

// utils
const { chatOrder } = useTopics();
const { $calcOrderTotalOriginal, $formated_DMMMYYYY } = useNuxtApp();
const { xs, smAndUp, width } = useDisplay();
const emailStartByUserId = (id: any) =>
  matchEmailStart(
    get(
      find(users.value, {
        id,
      }),
      "email"
    )
  );
const {
  perPage,
  length: paginationLength$,
  page$,
} = usePaginateData({ data: orders_, perPage: 5 });
const { watchProcessing } = useStoreAppProcessing();

// computes
const orderIdActive = (id: number) => id == orderActive$.value;
const order_ = computed(() =>
  orderActive$.value
    ? find(orders_.value, { id: orderActive$.value })
    : undefined
);
const user_ = computed(() =>
  0 < orderActive$.value
    ? find(users.value, {
        id: get(find(orders_.value, { id: orderActive$.value }), "user_id"),
      })
    : undefined
);
const {
  avatar: avatarUrl,
  fullName,
  profile: profileUser,
} = useProfileData(() => user_.value?.id);
const topicChatOrderUser$ = computed(() =>
  chatOrder(orderActive$.value, get(auth.user$, "id"), user_.value?.id)
);

// watchers
watchProcessing(ordersLoading);
watchEffect(() => {
  order_id$.value = orderActive$.value;
});
watchEffect(() => {
  chatId$.value = topicChatOrderUser$.value || "";
});
watchEffect(() => {
  if (null != orderActive$.value) return;
  if (isEmpty(orders_.value)) return;
  orderActive$.value = get(orders_.value, "[0].id");
});

const toggleUserInfoActive = useToggleFlag();
// #eos
</script>
<template>
  <section class="page--company-profile">
    <!-- <Dump :data="{ order_ }" /> -->

    <VDialog
      v-model="toggleOrderDetails.isActive.value"
      location="center"
      max-width="512"
    >
      <VCardOrderDetails
        :close="toggleOrderDetails.off"
        :order="order_"
        min-height="320"
      />
    </VDialog>

    <!-- @@chat:display -->
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

    <!-- @@content -->
    <div class="vcard--placer px-1 mt-2 mt-sm-8">
      <VCard rounded="t-lg" max-width="856" class="mx-auto">
        <!-- @orders-crud:toolbar -->
        <VCardItem class="bg-primary">
          <VCardTitle class="ps-2"
            ><span v-if="smAndUp" class="opacity-60">Primljene narudžbe</span>
            <VBadge
              inline
              color="primary-lighten-1"
              class="ms-1 -translate-y-[2px]"
            >
              <template #badge>
                <pre>{{ orders_.length }}</pre>
              </template>
            </VBadge>
          </VCardTitle>
          <!-- @orders-crud:actions -->
          <template #append>
            <div class="space-x-2">
              <VBtn
                @click="toggleOrderDetails"
                :disabled="!(order_?.code || order_?.description)"
                icon
                variant="text"
                color="on-primary"
              >
                <VIcon icon="$iconInfo" size="large" />
                <VTooltip
                  text="Napomena..."
                  location="bottom"
                  activator="parent"
                  open-delay="345"
                />
              </VBtn>
              <VBtn
                icon
                variant="text"
                color="on-primary"
                @click="ordersReload"
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
        <VContainer fluid class="ma-0 pa-1 bg-stone-50">
          <VRow dense>
            <VCol :order="1" :order-sm="0" sm="7">
              <VDataIterator :items="products_">
                <template #default="{ items }">
                  <div class="space-y-1 px-2 my-2">
                    <div class="d-flex justify-between items-center">
                      <VMenu
                        open-on-hover
                        open-delay="345"
                        max-width="480"
                        min-height="256"
                        :close-on-content-click="false"
                      >
                        <VSheet>
                          <VCardText class="d-flex items-start gap-5">
                            <div class="space-y-4">
                              <p>
                                <a
                                  class="text-info link--prominent-base"
                                  :href="`mailto:${user_?.email}`"
                                  >{{ user_?.email }}</a
                                >
                              </p>
                              <p v-if="profileUser?.phone">
                                <a
                                  class="text-info link--prominent-base"
                                  :href="`tel:${profileUser.phone}`"
                                  >{{ profileUser.phone }}</a
                                >
                              </p>
                            </div>
                            <p
                              v-if="profileUser?.userNote"
                              class="line-clamp-6 text-body-2 !font-sans text-medium-emphasis"
                            >
                              {{ profileUser.userNote }}
                            </p>
                          </VCardText>
                        </VSheet>
                        <template #activator="{ props: props_ }">
                          <p
                            v-bind="props_"
                            class="ps-5 pa-1 position-relative"
                          >
                            <!-- @@ -->
                            <AvatarThumb
                              :size="42"
                              :force="avatarUrl"
                              v-if="avatarUrl"
                              class="cursor-pointer"
                            />
                            <span
                              v-else
                              class="!font-sans text-body-1 font-italic text-medium-emphasis"
                              >Poručio:
                            </span>
                            <span
                              class="align-bottom ms-1 text-body-1 opacity-90 font-italic !font-sans"
                              >{{
                                fullName || emailStartByUserId(user_?.id)
                              }}</span
                            >
                          </p>
                        </template>
                      </VMenu>
                      <p class="text-end pe-4 my-4">
                        <span
                          class="!font-sans text-body-1 font-italic text-medium-emphasis"
                          >Vrednost:
                        </span>
                        <strong class="text-body-1 !font-bold !font-sans">{{
                          priceFormatLocale(
                            $calcOrderTotalOriginal(
                              order_,
                              map(items, ({ raw }) => raw)
                            )
                          )
                        }}</strong>
                        <span
                          class="d-inline-block translate-x-[2px] text-medium-emphasis"
                          >din</span
                        >
                      </p>
                    </div>
                    <div class="__placer__ space-y-2">
                      <OrdersProduct
                        :order="order_"
                        v-for="p in items"
                        :key="p.raw.id"
                        :product="p.raw"
                      />
                    </div>
                  </div>
                </template>
              </VDataIterator>
            </VCol>
            <VCol sm="5" class="*bg-primary2-lighten-2 border-s">
              <!-- @@ -->
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
                          >{{ $formated_DMMMYYYY(order.raw.created_at) }}</pre
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
