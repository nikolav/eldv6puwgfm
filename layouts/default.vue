<script setup lang="ts">
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
    <VSheet min-height="333" class="d-flex flex-col *items-center">
      <VCard
        rounded="0"
        variant="flat"
        image="/public/header-main-03.jpg"
        class="grow *bg-primary2"
      >
        <VCardItem>
          <template #append>
            <div class="*bg-red d-flex items-center text-white gap-x-8">
              <VAvatar color="primary2" size="large" variant="elevated">
                <strong class="text-xl"> 👨🏽 </strong>
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
      <div class="d-flex justify-between *items-center *border-b">
        <template v-for="n in 12" :key="n">
          <VBtn
            @click="selectedCategory_ = n"
            rounded="0"
            variant="text"
            class="grow"
            :ripple="false"
            :active="n == selectedCategory_"
            stacked
          >
            <strong class="mb-2">1.icon</strong>
            <span>2.text</span>
          </VBtn>
        </template>
      </div>
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
