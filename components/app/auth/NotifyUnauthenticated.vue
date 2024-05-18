<script setup lang="ts">
// defs
// utils
// stores
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
const auth = useStoreApiAuth();
const toggleAuthWarning = useToggleFlag();
onceMountedOn(
  () => auth.isDefault$,
  () => setTimeout(toggleAuthWarning.on, random(52345, 90123))
);
const enabled = computed(
  () => !auth.isAuthenticated$ && toggleAuthWarning.isActive.value
);
// @@eos
</script>
<template>
  <VSnackbar
    color="transparent"
    variant="text"
    location="top"
    :model-value="enabled"
    @update:model-value="(v) => !v && toggleAuthWarning.off()"
    :transition="DEFAULT_TRANSITION"
    :timeout="-1"
  >
    <VAlert
      density="comfortable"
      rounded="pill"
      color="warning-lighten-3"
      type="warning"
      elevation="3"
      prominent
    >
      <template #prepend>
        <VIcon
          class="opacity-40"
          :size="32"
          color="primary-darken-3"
          icon="$iconUserShield"
        />
      </template>
      <template #text>
        <div class="d-flex items-center gap-2">
          <strong
            class="text-body-1 !font-sans opacity-80"
            style="font-size: 1.012rem !important"
          >
            <p>Trenutno niste prijavljeni na sistem.</p>
            <p>Naše usluge Vam neće biti sve na raspolaganju.</p>
          </strong>
          <VBtn
            @click="toggleAuthWarning.off"
            :to="{ name: 'auth-login' }"
            icon
            variant="text"
            size="large"
          >
            <VIcon color="primary" size="x-large" icon="$iconUserCircle" />
            <VTooltip
              location="bottom"
              text="Prijava..."
              open-delay="345"
              activator="parent"
            />
          </VBtn>
          <VBtn @click="toggleAuthWarning.off" icon variant="plain">
            <VIcon color="primary" icon="$close" />
            <VTooltip
              text="Ok, hvala, samo razgledam"
              location="bottom"
              open-delay="345"
              activator="parent"
            />
          </VBtn>
        </div>
      </template>
    </VAlert>
  </VSnackbar>
</template>
<style lang="scss" scoped></style>
