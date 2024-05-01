<script setup lang="ts">
import { AppBarMain, CartOpenBadgePrimary } from "@/components/app";

import { PRODUCTION$ } from "@/config";
import { debounce } from "@/utils";

const {
  layout: { appBarHeight },
  app: { CART_BADGE_OFFSET },
} = useAppConfig();
const { current$, menuCategories, cache: appMenuCache } = useAppMenu();
const iconClasses = (isSelected: boolean) =>
  `${
    isSelected ? "opacity-100 scale-105" : "opacity-85"
  } group-hover/btn:opacity-100 group-hover/btn:scale-105 transition`;

const search_ = ref("");

const submitSearch = () => {
  console.log({ search: search_.value });
};

const debounceSearchHandle = debounce((term) => {
  if (!term) return;
  console.log({ term });
}, 789);

const cart = useStoreCart();

// @watchers
watch(search_, debounceSearchHandle);

// # eos
</script>

<template>
  <section class="layout--default" :style="`padding-top: ${appBarHeight}px`">
    <!-- @cart:button -->
    <CartOpenBadgePrimary
      class="end-4 sm:end-8 z-10"
      position="fixed"
      :style="`top: calc(${appBarHeight}px + 1.22rem)`"
    />

    <!-- @appbar:main -->
    <AppBarMain :height="appBarHeight" />

    <!-- @header -->
    <VSheet min-height="452" class="d-flex flex-col *items-center">
      <!-- @header:top -->
      <VCard
        rounded="0"
        variant="flat"
        image="/header-main-06.png"
        class="grow *bg-primary2"
      >
        <template #image>
          <VImg cover position="0 81%" />
        </template>
        <!-- @main:search -->
        <VForm
          @submit.prevent
          class="mx-auto mt-[92px] max-w-[512px] sm:max-w-[550px] sm:mt-[122px] sm:translate-x-[3.45rem]"
        >
          <VTextField
            v-model.trim="search_"
            name="pretraga"
            autofocus
            variant="solo"
            label="Traži:"
            rounded="pill"
            center-affix
            clearable
            single-line
            placeholder="Voće, povrće, sir..."
          >
            <template #prepend-inner>
              <span class="ps-4"></span>
            </template>
            <template #append-inner>
              <VBtn
                @click.stop="submitSearch"
                class="rounded-e-pill fill-height translate-x-[14px]"
                icon
                size="x-large"
                color="primary"
                variant="elevated"
                ><VIcon icon="$iconMagnifyingGlass" class="*-translate-x-[2px]"
              /></VBtn>
            </template>
          </VTextField>
        </VForm>
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
    <VMain>
      <slot>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
          aspernatur ab dolores!
        </p>
      </slot>
    </VMain>
  </section>
</template>

<style lang="scss" scoped>
</style>
