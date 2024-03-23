<script setup lang="ts">
const { routeNameByTitle, cache } = useAppMenu();
const route_ = useRoute();
const authRouteToggle$ = computed(() =>
  "auth-login" !== route_.name ? "auth-login" : "auth-register"
);
const authLinkText$ = computed(() =>
  "auth-login" !== route_.name
    ? "Imam nalog, prijava..."
    : "Nemam nalog, registracija..."
);
// #eos
</script>
<template>
  <section class="layout-auth">
    <VToolbar flat color="transparent">
      <VBtn icon :to="{ name: routeNameByTitle(cache.get()) }"
        ><VIcon icon="$prev" />
        <VTooltip
          activator="parent"
          location="bottom"
          text="Nazad"
          open-delay="333"
        />
      </VBtn>
      <VSpacer />
      <NuxtLink :to="{ name: authRouteToggle$ }">
        <a class="cursor-pointer hover:underline">
          <em> {{ authLinkText$ }} </em>
        </a>
      </NuxtLink>
      <VSpacer />
      <VBtn icon :to="{ name: routeNameByTitle(cache.get()) }"
        ><VIcon icon="$close" />
      </VBtn>
    </VToolbar>

    <VContainer class="*bg-red">
      <VRow justify="center">
        <VCol md="5" class="bg-blue-200">
          <slot>
            <p>lorem</p>
          </slot>
        </VCol>
        <VCol md="7" class="bg-red-200">
          <h2 class="text-h5">Opis usluge za kupce/prodavce</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ut
            vero sunt?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ut
            vero sunt?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ut
            vero sunt?
          </p>
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>
<style lang="scss" scoped>
</style>
