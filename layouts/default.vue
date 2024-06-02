<script setup lang="ts">
import {
  AppBarMain,
  CartOpenBadgePrimary,
  FooterSmallText,
  VCardMenuPopup,
} from "@/components/app";
import { MainSearchBox } from "@/components/ui";
import { PRODUCTION$ } from "@/config";
import { useDisplay } from "vuetify";

// defs
const {
  layout: { appBarHeight },
  key: { PRODUCTS_SEARCH },
  products: { PRODUCT_CATEGORY_prefix },
} = useAppConfig();

// refs, computes
const search_ = ref("");

const { nodesValues } = useStoreMenuCategoriesFull();
// helpers
//  handle product text searches
const productsSearchResutlt$ = useState(PRODUCTS_SEARCH);
const { query$, products: productsSearchResult } = useQueryProductsSearch();
const debounceSearchHandle = debounce((value) => {
  const term = String(value).trim();
  if (!term) return;

  // send .isText flag for text-only specific search
  const q = <Record<string, any>>{ isText: true, text: term };

  //  filter menu *nodes items for .text
  //    filter nodes where similarText(node.title)(text)
  //     map result to ctg tags
  const ctgMatched = filter(nodesValues, (val) =>
    similarText(val.title, 5)(term)
  ).map((val) => `${PRODUCT_CATEGORY_prefix}${val.category || val.value}`);

  q["category"] = ctgMatched;

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

// const refMenu = ref();
// onClickOutside(refMenu);
// # eos
</script>

<template>
  <section
    class="layout--default bg-[#FAF9F9]"
    :style="`padding-top: ${appBarHeight}px;`"
  >
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
    <VSheet elevation="0" rounded="0" min-height="512" class="d-flex flex-col">
      <!-- @header:top -->
      <!-- image="/header-main-06-huge.png" -->
      <!-- <VImg position="0 81%" /> -->
      <VCard flat elevation="0" rounded="0" variant="flat" class="grow d-flex flex-col">
        <template #image>
          <!--  -->
          <!-- src="/header-main-06-scaled-150.png" -->
          <!-- src="/header-main-07.png" -->
          <VParallax
            :position="`${xs ? 0 : 14}px 98%`"
            :scale="0.95"
            src="/summer-desktop.jpg"
          />
        </template>

        <VSpacer />
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
            <VMenu
              v-if="!['Izbor', 'Karta'].includes(node.title)"
              :transition="false"
              activator="parent"
              open-on-hover
              open-delay="222"
              close-delay="222"
              location="bottom"
              :offset="[-2, 0]"
              width="100%"
              class="w-full"
            >
              <template #default="{ isActive: isActiveMenu }">
                <VCardMenuPopup
                  :menu-item="node"
                  :close="
                    () => {
                      isActiveMenu.value = false;
                    }
                  "
                />
              </template>
            </VMenu>
          </VBtn>
        </VSlideGroupItem>
      </VSlideGroup>
    </VSheet>

    <!-- @page:main -->
    <VMain
      class="*bg-blue min-h-[712px]"
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
