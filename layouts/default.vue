<script setup lang="ts">
import { PRODUCTION$ } from "@/config";
import { pathLastSegment } from "@/utils";
import menuCategories from "@/assets/menu-with-product-categories.json";

const appBarHeight = useAppConfig().layout.appBarHeight;
const selectedCategory_ = ref();
const iconClasses = (isSelected: boolean) =>
  `${
    isSelected ? "opacity-100 scale-105" : "opacity-85"
  } group-hover/btn:opacity-100 group-hover/btn:scale-105 transition`;

const search_ = ref("");

onMounted(() => (selectedCategory_.value = menuCategories[0].title));

const submitSearch = () => {
  console.log({ search: search_.value });
};

// # eos
</script>

<template>
  <section
    id="layout-default"
    class="*ma-0 *pa-0"
    :style="`padding-top: ${appBarHeight}px`"
  >
    <!-- @appbar:main -->
    <VAppBar flat :height="appBarHeight" elevation="1">
      <template #prepend> • </template>
      <template #append> • </template>
    </VAppBar>

    <!-- @header -->
    <VSheet min-height="420" class="d-flex flex-col *items-center">
      <!-- @header:top -->
      <VCard
        rounded="0"
        variant="flat"
        image="/public/header-main-05.jpg"
        class="grow *bg-primary2"
      >
        <template #image>
          <VImg cover position="0" />
        </template>
        <VCardItem>
          <template #append>
            <div class="d-flex items-center gap-x-8 me-2 me-sm-6">
              <VAvatar color="primary2" size="x-large" variant="elevated">
                <strong class="text-2xl"> 👨🏽 </strong>
              </VAvatar>
              <VBtn
                icon
                variant="elevated"
                color="primary3-lighten-1"
                size="66"
              >
                <VIcon icon="$iconShoppingCart" size="x-large" />
              </VBtn>
            </div>
          </template>
        </VCardItem>
        <VForm
          @submit.prevent
          class="sm:max-w-[550px] mt-6 sm:mx-auto sm:translate-x-[5rem]"
        >
          <VTextField
            v-model.trim="search_"
            name="kategorija-pretraga"
            autofocus
            variant="solo"
            label="Traži:"
            rounded="pill"
            center-affix
            clearable
            single-line
            placeholder="Voće, povrće, sir..."
            class="opacity-90"
          >
            <template #prepend-inner>
              <span class="ps-4"></span>
            </template>
            <template #append-inner>
              <VBtn
                class="rounded-e-pill fill-height translate-x-[14px]"
                icon
                size="x-large"
                color="primary"
                variant="elevated"
                ><VIcon icon="$iconMagnifyingGlass" class="-translate-x-[2px]"
              /></VBtn>
            </template>
          </VTextField>
        </VForm>
      </VCard>
      <!-- @header:menu -->
      <VSlideGroup mandatory show-arrows v-model="selectedCategory_">
        <VSlideGroupItem
          v-for="node in menuCategories"
          :key="node.title"
          v-slot="{ isSelected, select }"
          :value="node.title"
        >
          <VBtn
            @click="select"
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
