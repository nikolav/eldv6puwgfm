<script setup lang="ts">
import menuCategories from "@/assets/menu-with-product-categories.json";

const appBarHeight = useAppConfig().layout.appBarHeight;
const selectedCategory_ = ref();

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
      <VCard
        rounded="0"
        variant="flat"
        image="/public/header-main-03.jpg"
        class="grow *bg-primary2"
      >
        <template #image>
          <VImg position="0 47%" />
        </template>
        <VCardItem>
          <template #prepend> @pretraga: {{ selectedCategory_ }} </template>
          <template #append>
            <div class="d-flex items-center gap-x-8">
              <VAvatar color="primary2" size="x-large" variant="elevated">
                <strong class="text-2xl"> 👨🏽 </strong>
              </VAvatar>
              <VBtn icon variant="elevated" color="on-surface" size="x-large">
                <VIcon
                  icon="$iconShoppingCart"
                  size="x-large"
                  color="primary-darken-1"
                />
              </VBtn>
            </div>
          </template>
        </VCardItem>
      </VCard>
      <VSlideGroup mandatory show-arrows v-model="selectedCategory_">
        <VSlideGroupItem
          v-for="(node, i) in menuCategories"
          :key="i"
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
                size="42"
                :color="node.color"
                :icon="node.icon"
                :class="`${
                  isSelected ? 'opacity-100 scale-105' : 'opacity-85'
                } group-hover/btn:opacity-100 group-hover/btn:scale-105 transition`"
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
