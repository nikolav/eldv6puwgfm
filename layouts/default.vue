<script setup lang="ts">
import { AppBarMain, CartOpenBadgePrimary } from "@/components/app";
import { MainSearchBox } from "@/components/ui";
import { PRODUCTION$ } from "@/config";
import { useDisplay } from "vuetify";

// defs
const {
  layout: { appBarHeight },
} = useAppConfig();

// refs, computes
const search_ = ref("");

// helpers
const debounceSearchHandle = debounce((term) => {
  if (!term) return;
  console.log({ term });
}, 789);

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
  <section
    class="layout--default *bg-blue"
    :style="`padding-top: ${appBarHeight}px`"
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
    <VSheet min-height="452" class="d-flex flex-col *items-center">
      <!-- @header:top -->
      <!-- image="/header-main-06-huge.png" -->
      <!-- <VImg position="0 81%" /> -->
      <VCard rounded="0" variant="flat" class="grow *bg-primary2">
        <template #image>
          <!--  -->
          <VParallax
            :position="`${xs ? 0 : 48}px 98%`"
            :scale="0.91"
            src="/header-main-06-scaled-150.png"
          />
        </template>

        <!-- @@search:main -->
        <MainSearchBox v-model="search_" />
      </VCard>
      <!-- @header:menu-categories -->
      <VSlideGroup mandatory show-arrows v-model="current$">
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
    <VMain class="*bg-blue *pt-0">
      <slot>
        <p>Lorem!</p>
      </slot>
    </VMain>
  </section>
</template>

<style lang="scss" scoped>
</style>
