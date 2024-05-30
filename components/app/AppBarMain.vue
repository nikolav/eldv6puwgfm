<script setup lang="ts">
import { useDisplay } from "vuetify";
import { emojify } from "node-emoji";
import { AvatarThumb, VCardMainSearchConfig } from "@/components/app";

const props = defineProps<{ height: number }>();

const { smAndUp } = useDisplay();
const {
  app: { DEFAULT_TRANSITION },
  key: { APP_PROCESSING },
} = useAppConfig();
const { CHAT_MAIN } = useTopics();

const auth = useStoreApiAuth();

const { current$, routeNameByTitle, cache: appMenuCache } = useAppMenu();

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

const topicChatMain = useGlobalVariable(CHAT_MAIN);
const search$$ = useStoreSearchConfig();
// #eos
</script>
<template>
  <VAppBar flat :height="height" elevation="1" id="appbar--main">
    <!-- @@ -->
    <VAppBarTitle
      v-if="smAndUp"
      id="appbar-main--title"
      class="*bg-red opacity-95 hover:opacity-100"
    >
      <AvatarThumb
        v-if="auth.isAuth$ && !auth.isDefault$"
        class="me-2"
        :size="42"
      />
      <!-- logo -->
      <strong
        @click="appMenuCache(current$)"
        class="d-inline-block hover:scale-105 transition-transform"
      >
        <NuxtLink :to="{ name: 'index' }">
          <VIcon color="primary-darken-1" size="122" icon="$iconLogoKantarH" />
        </NuxtLink>
      </strong>

      <!-- @@demo.dev -->
      <!-- <NuxtLink :to="{ name: 'demo' }">-demo</NuxtLink> -->
      <!--<NuxtLink :to="{ name: 'pretraga-proizvoda' }">-rez</NuxtLink> -->
    </VAppBarTitle>

    <template #append>
      <!-- :search -->
      <VBtn :id="search$$.BUTTON_ID" icon variant="text" color="primary">
        <VIcon icon="$iconSearchSettings" :size="32" />
        <VTooltip
          location="bottom"
          open-delay="345"
          activator="parent"
          text="Napredna pretraga..."
        />
        <VMenu
          activator="parent"
          class="*backdrop-blur-[2px] *position-fixed z-[1]"
          :transition="DEFAULT_TRANSITION"
          location="bottom"
          :offset="[-36, 12]"
          :close-on-content-click="false"
          width="640"
          min-height="480"
        >
          <template #default="{ isActive }">
            <VCardMainSearchConfig
              class="!bg-stone-50"
              :close="
                () => {
                  isActive.value = false;
                }
              "
            />
          </template>
        </VMenu>
      </VBtn>

      <!-- etiketa -->
      <NuxtLink
        external
        target="_blank"
        to="https://docs.google.com/forms/d/e/1FAIpQLSfQF5FTcZlck8_hlmtUlKXT5vuTk-D6nUC6YbntJzTF8W2LKA/viewform?usp=sf_link"
      >
        <VBtn icon variant="text" color="primary-darken-1" class="ms-10">
          <VIcon :size="41" icon="$iconBrandTag" class="rotate-[5deg]" />
          <VTooltip activator="parent" location="bottom" open-delay="345">
            Upitnik za izradu brenda...
          </VTooltip>
        </VBtn>
      </NuxtLink>

      <NuxtLink :to="{ name: 'paketi' }" target="_blank">
        <VBtn icon variant="text" color="primary-darken-1" class="ms-10">
          <VIcon :size="32" icon="$iconMedal" class="-rotate-[4deg]" />
          <VTooltip activator="parent" location="bottom" open-delay="345">
            Postanite
            <em class="!tracking-wider text-body-2 text-warning !font-bold"
              >Premium</em
            >
            član...
          </VTooltip>
        </VBtn>
      </NuxtLink>

      <!-- :auth -->
      <VBtn
        v-if="!auth.isAuth$ || auth.isDefault$"
        :to="{ name: 'auth-login' }"
        class="text-none group/auth fill-height ms-5"
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

      <!-- :nav -->
      <template v-else>
        <VBtn
          :to="{ name: routeNameByTitle(appMenuCache.get()) }"
          variant="text"
          icon
          color="primary"
          class="ms-10"
        >
          <VIcon icon="$iconStoreFront" size="35" />
          <VTooltip activator="parent" location="bottom" open-delay="345">
            <pre class="me-2 d-inline-block" style="font-size: 133%">{{
              emojify(":man_farmer:")
            }}</pre>
            <span style="font-size: 111%">Pijaca</span>
          </VTooltip>
        </VBtn>
        <VBtn
          :to="{
            name: auth.isCompany$ ? 'company-profile' : 'user-orders',
          }"
          variant="text"
          icon
          color="primary"
          class="ms-4 ms-sm-10"
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
        <VBtn
          @click="topicChatMain = 'chat:main'"
          variant="text"
          icon
          color="primary"
          size="small"
          class="ms-2"
        >
          <VIcon icon="$iconMegaphone" :size="32" />
        </VBtn>
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
