<script setup lang="ts">
import type { OrNoValue } from "@/types";
import { ProductAdd } from "@/components/app";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

const toggleProductAdd = useToggleFlag();

const {
  key: { PRODUCT_SELECTED },
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
const $$main = useStoreMain();

const perPage = 10;
const lagerPage$ = ref(1);
const lager$ = Array.from({ length: 12 }, (_v, key) => ({
  id: key,
  name: `item:${key}`,
}));

const selectedProduct$ = computed({
  get: () => $$main.get(PRODUCT_SELECTED),
  set: (val: OrNoValue<number>) => {
    $$main.put({
      [PRODUCT_SELECTED]: val !== $$main.get(PRODUCT_SELECTED) ? val : null,
    });
  },
});
const productIsSelected = (id: number) => id === selectedProduct$.value;
// #eos
</script>
<template>
  <section class="page--company-profile-goods">
    <VDialog
      persistent
      no-click-animation
      :transition="DEFAULT_TRANSITION"
      fullscreen
      v-model="toggleProductAdd.isActive.value"
    >
      <ProductAdd :close="toggleProductAdd.off" />
    </VDialog>
    <div class="px-2 px-sm-6">
      <VCard max-width="956" class="mx-auto mt-10">
        <VToolbar height="48" color="primary" flat>
          <VToolbarTitle>
            <VIcon start size="small" class="opacity-50" icon="$iconBoxes" />
            <strong class="ps-2 *space-x-2">
              <span>Lager</span>
            </strong>
          </VToolbarTitle>
          <VToolbarItems class="space-x-4 *pe-2">
            <VBtn :disabled="null == selectedProduct$" rounded="circle" icon
              ><VIcon icon="$edit"
            /></VBtn>
            <VBtn :disabled="null == selectedProduct$" rounded="circle" icon
              ><VIcon icon="$iconMagnifyingGlass"
            /></VBtn>
            <VBtn :disabled="null == selectedProduct$" rounded="circle" icon
              ><VIcon icon="$iconLink"
            /></VBtn>
            <VBtn
              color="error"
              :disabled="null == selectedProduct$"
              rounded="circle"
              icon
              ><VIcon icon="$iconTrash"
            /></VBtn>
            <VBtn
              @click="toggleProductAdd.on"
              class="*ms-4"
              rounded="circle"
              icon
              color="success"
              ><VIcon icon="$iconPlusCircle" :size="35" />
              <VTooltip
                activator="parent"
                text="Ulistaj nov proizvod..."
                open-delay="345"
                location="bottom"
              />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VDataIterator
          :items="lager$"
          :items-per-page="perPage"
          :page="lagerPage$"
        >
          <template #default="{ items }">
            <VList lines="one" density="compact">
              <VListItem
                v-for="node in items"
                :key="node.raw.id"
                @click="selectedProduct$ = node.raw.id"
              >
                <template #prepend>
                  <VIcon
                    size="large"
                    :color="
                      productIsSelected(node.raw.id)
                        ? 'primary-darken-1'
                        : undefined
                    "
                    :icon="
                      productIsSelected(node.raw.id)
                        ? '$iconCheckboxOn'
                        : '$iconCheckboxOff'
                    "
                  />
                </template>
                <VListItemTitle>{{ node.raw.name }}</VListItemTitle>
              </VListItem>
            </VList>
          </template>
        </VDataIterator>
      </VCard>
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style>
