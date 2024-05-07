<script setup lang="ts">
import { Dump } from "@/components/dev";
import { ProductsForOrderWithDetails } from "@/components/app";

definePageMeta({
  layout: "user-profile",
  middleware: "authorized",
});

// utils
const auth = useStoreApiAuth();
const { $formated_DMMMYYYY } = useNuxtApp();

// computes, refs
const uid$ = computed(() => get(auth.user$, "id"));
const oid$ = ref();
const orderCompanies = ref();
const orderProducts = ref();
const orderTotal = ref();

// stores
const { orders, reload: ordersReload } = useQueryOrdersByUser(uid$);
const {
  length: paginationLength,
  page$,
  perPage,
} = usePaginateData({
  data: orders,
  perPage: 5,
});

// #eos
</script>
 <template>
  <section class="page--user-orders">
    <!-- <Dump :data="{ orderCompanies }" /> -->
    <div class="__placer__">
      <!-- @@orders -->
      <VDataIterator
        v-model="oid$"
        :page="page$"
        :items="dataSortedByDateDesc(orders)"
        :items-per-page="perPage"
      >
        <!-- @@header -->
        <template #header>
          <VCard class="pa-2" rounded="pill" color="on-primary" elevation="1">
            <div
              v-if="1 < paginationLength"
              class="__placer__ space-x-2 d-flex"
            >
              <VSpacer />
              <VBtn
                v-for="n in paginationLength"
                :key="n"
                variant="elevated"
                elevation="1"
                :color="page$ == n ? 'primary-lighten-1' : 'on-primary'"
                rounded="circle"
                icon
                size="x-small"
                @click="page$ = n"
              >
                <em style="font-size: 133%">{{ n }}</em>
              </VBtn>
            </div>
          </VCard>
        </template>

        <template #default="{ items }">
          <VContainer fluid>
            <VRow dense>
              <VCol cols="7">1</VCol>
              <VCol cols="5" class="pa-0 px-2">
                <VCard rounded="lg" elevation="1">
                  <VCardTitle class="bg-primary d-flex items-center">
                    <span class="opacity-40">Moje narudžbe:</span>
                    <VBadge
                      class="scale-[88%] d-inline-block opacity-80 ms-1"
                      color="primary-lighten-2"
                      inline
                      :content="orders.length"
                    />
                    <VSpacer />
                    <VBtn
                      @click="ordersReload"
                      density="comfortable"
                      color="on-primary"
                      icon
                      variant="plain"
                      class="*ms-auto"
                    >
                      <VIcon icon="$loading" />
                      <VTooltip
                        location="bottom"
                        text="Osveži listu"
                        open-delay="345"
                        activator="parent"
                      />
                    </VBtn>
                  </VCardTitle>
                  <VList class="py-0" density="compact">
                    <template v-for="node in items" :key="node.raw.id">
                      <ProductsForOrderWithDetails
                        :order="find(orders, { id: node.raw.id })"
                        v-slot="{ total, companies, products }"
                      >
                        <VListItem
                          color="primary"
                          :active="oid$ == node.raw.id"
                          @click="
                            () => {
                              oid$ = node.raw.id;
                              orderProducts = products;
                              orderCompanies = companies;
                              orderTotal = total;
                            }
                          "
                          class="ps-1"
                        >
                          <template #prepend>
                            <span class="d-inline-flex w-[69px] items-center">
                              <small style="font-size: 71%" class="opacity-50"
                                >#{{ node.raw.id }}</small
                              >
                              <VSpacer />
                              <VCheckboxBtn
                                class="scale-[111%]"
                                true-icon="$iconCheckboxOn"
                                false-icon="$iconCheckboxOff"
                                :model-value="oid$ == node.raw.id"
                              />
                            </span>
                          </template>
                          <div
                            class="d-flex items-center ps-1"
                            :class="
                              oid$ == node.raw.id ? 'opacity-100' : 'opacity-50'
                            "
                          >
                            <small class="d-inline-block">{{
                              $formated_DMMMYYYY(node.raw.created_at)
                            }}</small>
                            <VSpacer />
                            <em style="font-size: 75%"
                              >{{ priceFormatLocale(total) }} RSD</em
                            >
                          </div>
                        </VListItem>
                      </ProductsForOrderWithDetails>
                    </template>
                  </VList>
                </VCard>
              </VCol>
            </VRow>
          </VContainer>
        </template>
      </VDataIterator>
    </div>
  </section>
</template>
 <style lang="scss" scoped>
</style>
