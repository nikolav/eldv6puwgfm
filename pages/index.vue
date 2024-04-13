<script setup lang="ts">
// https://github.com/surmon-china/videojs-player
// import { VideoPlayer } from "@videojs-player/vue";

import { useDisplay } from "vuetify";

import {
  // Q_productsListPopular,
  Q_productsListAll,
} from "@/graphql";

const cart = useStoreCart();

const { lgAndUp } = useDisplay();

const {
  graphql: { STORAGE_QUERY_POLL_INTERVAL },
  key: { PRODUCTS_CHANGE },
} = useAppConfig();

const { result, load, refetch } = useLazyQuery(Q_productsListAll, undefined, {
  pollInterval: STORAGE_QUERY_POLL_INTERVAL,
});
const products$ = computed(() => get(result.value, "productsListAll") || []);
const reload = async () => await refetch();

const { runSetup: queryStart } = useRunSetupOnce(async () => await load());
onMounted(async () => {
  queryStart();
  await nextTick(reload);
});

const $$main = useStoreMain();
watch(
  () => $$main.get(PRODUCTS_CHANGE),
  async (sig) => {
    if (sig) await reload();
  }
);

// #eos
</script>

<template>
  <section id="page-demo" class="*pa-2 *pa-md-4">
    <VBtn @click="reload">reload</VBtn>
    <VContainer fluid class="products--list">
      <VRow dense>
        <VCol
          :class="lgAndUp ? 'cols5' : undefined"
          :sm="4"
          :md="3"
          lg="auto"
          v-for="p in products$"
          :key="p.id"
        >
          <VCard>
            <VCardTitle>
              {{ p.name }}
            </VCardTitle>
            <VCardActions>
              <VSpacer />
              <VBtn variant="tonal" @click="cart.increase(p.id, 1)"
                >Korpa{{
                  cart.has(p.id) ? ` ${cart.store$.items[p.id]}` : ""
                }}</VBtn
              >
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>

<style scoped lang="scss">
.products--list .cols5 {
  width: 20% !important;
  max-width: 20% !important;
  flex-basis: 20% !important;
}
</style>
