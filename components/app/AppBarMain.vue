<script setup lang="ts">
import { emojify } from "node-emoji";

const props = defineProps<{ height: number }>();

const auth = useStoreApiAuth();
const route_ = useRoute();
const isRouteCompanyProfile$ = computed(
  () => "company-profile" === route_.name
);

const { current$, routeNameByTitle, cache: appMenuCache } = useAppMenu();

const { APP_PROCESSING } = useAppConfig().key;
const flags = useStoreFlags();

const authSubmitLogout = async () => {
  try {
    flags.on(APP_PROCESSING);
    await auth.logout();
  } catch (error) {
    console.error({ "auht:error:logout": error });
  }
  flags.off(APP_PROCESSING);
};

// #eos
</script>
<template>
  <VAppBar flat :height="props.height" elevation="1" id="appbar--main">
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
    <template v-if="auth.isCompany$ && isRouteCompanyProfile$">
      <VSpacer />
      <strong class="text-medium-emphasis text-body-1 !font-sans">
        {{ emojify(":wave:") }} Zdravo,
        {{ capitalize(matchEmailStart(get(auth.user$, "email"))) }}.
      </strong>
      <VSpacer />
      <VSpacer />
    </template>
    <template #append>
      <VBtn
        v-if="!auth.isAuth$"
        :to="{ name: 'auth-login' }"
        class="text-none group/auth fill-height"
        color="primary-darken-1"
        rounded="0"
      >
        <VIcon
          size="xx-large"
          start
          icon="$iconPerson"
          class="group-hover/auth:scale-110 transition-transform"
        />
        <strong> Prijava/Registracija </strong>
        <VTooltip
          location="bottom"
          text="Kupci, prodavci, članovi"
          activator="parent"
          open-delay="456"
        />
      </VBtn>
      <template v-else>
        <VBtn
          :to="{ name: routeNameByTitle(appMenuCache.get()) }"
          variant="text"
          icon
          color="primary"
        >
          <VIcon icon="$iconStoreFront" size="35" />
          <VTooltip
            activator="parent"
            location="bottom"
            text="Pijaca"
            open-delay="345"
          />
        </VBtn>
        <VBtn
          :to="{ name: auth.isCompany$ ? 'company-profile' : 'user-profile' }"
          variant="text"
          icon
          color="primary"
          class="ms-4 ms-sm-6"
        >
          <VIcon
            :icon="auth.isCompany$ ? '$iconAdjustSettings' : '$iconUserCircle'"
            :size="auth.isCompany$ ? 24 : 'x-large'"
          />
          <VTooltip
            activator="parent"
            location="bottom"
            :text="auth.isCompany$ ? 'Profil gazdinstva' : 'Moj profil'"
            open-delay="345"
          />
        </VBtn>
        <VForm @submit.prevent="authSubmitLogout" autocomplete="off">
          <VBtn
            type="submit"
            icon
            variant="text"
            color="primary-darken-1"
            size="small"
            class="ms-8 ms-sm-16 me-1 me-sm-2"
          >
            <VIcon icon="$iconPowerOff" />
            <VTooltip
              location="bottom"
              open-delay="345"
              activator="parent"
              text="Odjava/Kraj"
            />
          </VBtn>
        </VForm>
      </template>
    </template>
  </VAppBar>
</template>
<style lang="scss">
#appbar-main--title .v-toolbar-title__placeholder {
  overflow: visible !important;
}
#appbar--main .v-toolbar__append {
  margin-inline: auto 0 !important;
}
</style>
