<script setup lang="ts">
import {
  AppBarMain,
  CartOpenBadgePrimary,
  FooterSmallText,
} from "@/components/app";
import { MainSearchBox } from "@/components/ui";
import { PRODUCTION$ } from "@/config";
import { useDisplay } from "vuetify";

// defs
const {
  layout: { appBarHeight },
  key: { PRODUCTS_SEARCH },
} = useAppConfig();

// refs, computes
const search_ = ref("");

// helpers
//  handle product text searches
const productsSearchResutlt$ = useState(PRODUCTS_SEARCH);
const { query$, products: productsSearchResult } = useQueryProductsSearch();
const debounceSearchHandle = debounce((value) => {
  const q = value ? { text: String(value).trim() } : undefined;
  if (!q) return;
  console.log({ "searching:products:text-search": q });
  query$.value = q;
}, 789);
onceMountedOn(true, () => {
  watch(productsSearchResult, async (products) => {
    productsSearchResutlt$.value = {
      key: Date.now(),
      products,
    };
    await navigateTo({ name: "pretraga-proizvoda" });
  });
});

// utils
const { xs } = useDisplay();
const iconClasses = (isSelected: boolean) =>
  `${
    isSelected ? "opacity-100 scale-105" : "opacity-85"
  } group-hover/btn:opacity-100 group-hover/btn:scale-105 transition`;
const { current$, menuCategories, cache: appMenuCache } = useAppMenu();
const cart = useStoreCart();

// @watchers
watch(search_, debounceSearchHandle);

// # eos
</script>

<template>
  <section class="layout--default" :style="`padding-top: ${appBarHeight}px`">
    <!-- @cart:button -->
    <CartOpenBadgePrimary
      :badge-offset="9"
      class="end-4 sm:end-8 z-10"
      position="fixed"
      :style="`top: calc(${appBarHeight}px + 1.22rem)`"
      color="white"
    />

    <!-- @appbar:main -->
    <AppBarMain :height="appBarHeight" />

    <!-- @header -->
    <VSheet min-height="512" class="d-flex flex-col *items-center">
      <!-- @header:top -->
      <!-- image="/header-main-06-huge.png" -->
      <!-- <VImg position="0 81%" /> -->
      <VCard rounded="0" variant="flat" class="grow *bg-primary2">
        <template #image>
          <!--  -->
          <VParallax
            :position="`${xs ? 0 : 35}px 98%`"
            :scale="0.91"
            src="/header-main-06-scaled-150.png"
          />
        </template>

        <!-- @@search:main -->
        <MainSearchBox v-model="search_" />
      </VCard>
      <!-- @header:menu-categories -->
      <VSlideGroup
        class="border--bottom-thin bg-cover bg-[url('~/assets/images/carpet.png')] border-t-md border-primary-darken-1 border-opacity-75 shadow"
        mandatory
        show-arrows
        v-model="current$"
      >
        <VSlideGroupItem
          v-for="node in menuCategories"
          :key="node.title"
          v-slot="{ isSelected, select }"
          :value="node.title"
        >
          <VBtn
            @click="
              () => {
                select(true);
                appMenuCache(current$);
              }
            "
            :to="node.to"
            rounded="0"
            :variant="isSelected ? 'tonal' : 'text'"
            :color="node.color"
            class="grow text-none group/btn"
            height="82"
            :ripple="false"
            :active="isSelected"
            stacked
          >
            <strong class="mb-2">
              <VIcon
                v-if="node.icon"
                size="42"
                :color="node.color"
                :icon="node.icon"
                :class="iconClasses(isSelected)"
              />
              <VImg
                :class="iconClasses(isSelected)"
                v-else
                :src="`${
                  !PRODUCTION$
                    ? '/' + pathLastSegment(String(node.image))
                    : node.image
                }`"
                width="42"
              />
            </strong>
            <span>{{ node.title }}</span>
          </VBtn>
        </VSlideGroupItem>
      </VSlideGroup>
    </VSheet>

    <!-- @page:main -->
    <VMain
      class="*bg-blue"
      :class="null != $route.meta.layoutDefaultPaddingTop ? 'pt-0' : ''"
    >
      <slot>
        <span> Lorem! </span>
      </slot>
    </VMain>
    <FooterSmallText />
  </section>
</template>

<style lang="scss" scoped>
.border--bottom-thin {
  border-bottom: 1px solid theme("colors.slate.300");
}
</style>
