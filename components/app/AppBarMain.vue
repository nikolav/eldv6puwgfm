<script setup lang="ts">
const props = defineProps<{ height: number }>();
const auth = useStoreApiAuth();

const { current$, cache } = useAppMenu();

// #eos
</script>
<template>
  <VAppBar flat :height="props.height" elevation="1">
    <VAppBarTitle class="opacity-85 ms-0 hover:opacity-100">
      <VBtn
        :to="{ name: 'index' }"
        color="primary-lighten-1"
        :ripple="false"
        variant="plain"
        class="text-none group/logo-kantar"
        size="large"
      >
        <VIcon
          size="x-large"
          start
          icon="$iconLogoKantar"
          class="-translate-y-px group-hover/logo-kantar:scale-110 transition-transform"
        />
        <span>kantar.rs</span>
      </VBtn>
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
<style lang="scss" scoped>
</style>
