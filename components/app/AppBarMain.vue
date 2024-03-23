<script setup lang="ts">
const props = defineProps<{ height: number }>();
const auth = useStoreApiAuth();

const { current$, cache } = useAppMenu();

// #eos
</script>
<template>
  <VAppBar flat :height="props.height" elevation="1">
    <VAppBarTitle id="appbar-main--title" class="opacity-85 hover:opacity-100">
      <strong class="d-inline-block hover:scale-105 transition-transform">
        <NuxtLink :to="{ name: 'index' }">
          <VIcon color="primary-lighten-1" size="102  " icon="$iconLogoKantarH" />
        </NuxtLink>
      </strong>
    </VAppBarTitle>
    <template #append>
      <div v-if="!auth.isAuth$" class="-me-2.5">
        <VBtn
          @click="cache(current$)"
          :to="{ name: 'auth-login' }"
          class="text-none group/auth"
          color="primary-darken-1"
        >
          <VIcon
            size="x-large"
            start
            icon="$iconPerson"
            class="group-hover/auth:scale-110 transition-transform"
          />
          <strong>prijava/registracija</strong>
          <VTooltip
            location="bottom"
            text="Članovi, kupci, prodavci"
            activator="parent"
            open-delay="456"
          />
        </VBtn>
      </div>
    </template>
  </VAppBar>
</template>
<style lang="scss">
#appbar-main--title .v-toolbar-title__placeholder {
  overflow: visible !important;
}
</style>
