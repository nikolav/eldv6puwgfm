<script setup lang="ts">
const props = defineProps<{ height: number }>();
const auth = useStoreApiAuth();

const { current$, routeNameByTitle, cache: appMenuCache } = useAppMenu();

// #eos
</script>
<template>
  <VAppBar flat :height="props.height" elevation="1">
    <VAppBarTitle
      id="appbar-main--title"
      class="opacity-95 hover:opacity-100 ms-6"
    >
      <strong
        @click="appMenuCache(current$)"
        class="d-inline-block hover:scale-105 transition-transform"
      >
        <NuxtLink :to="{ name: 'index' }">
          <VIcon color="primary-darken-1" size="122" icon="$iconLogoKantarH" />
        </NuxtLink>
      </strong>
    </VAppBarTitle>
    <template #append>
      <div v-if="!auth.isAuth$" class="-me-2.5">
        <VBtn
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
      <template v-else>
        <VBtn
          :to="{ name: routeNameByTitle(appMenuCache.get()) }"
          variant="text"
          icon
          color="primary"
        >
          <VIcon icon="$iconStore" size="x-large" />
          <VTooltip
            activator="parent"
            location="bottom"
            text="Pijaca"
            open-delay="345"
          />
        </VBtn>
        <VBtn
          :to="{ name: 'user-profile' }"
          variant="text"
          icon
          color="primary"
          class="ms-4"
        >
          <VIcon icon="$iconDashboard" size="large" />
          <VTooltip
            activator="parent"
            location="bottom"
            text="Moj profil"
            open-delay="345"
          />
        </VBtn>
        <VBtn
          @click="auth.logout()"
          icon
          variant="text"
          color="primary-darken-1"
          size="small"
          class="ms-8 ms-sm-12"
        >
          <VIcon icon="$iconPowerOff" />
          <VTooltip
            location="bottom"
            open-delay="345"
            activator="parent"
            text="Odjava, kraj"
          />
        </VBtn>
      </template>
    </template>
  </VAppBar>
</template>
<style lang="scss">
#appbar-main--title .v-toolbar-title__placeholder {
  overflow: visible !important;
}
</style>
