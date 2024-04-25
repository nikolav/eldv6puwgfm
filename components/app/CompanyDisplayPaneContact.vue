<script setup lang="ts">
const props = defineProps<{ user: any; profile: any }>();
// @@eos
</script>
<template>
  <section class="component--CompanyDisplayPaneContact pa-2 space-y-4 pt-4">
    <VTextField
      :model-value="`${props.profile.ownerFirstName.value} ${props.profile.ownerLastName.value}`"
      readonly
      variant="underlined"
      label="Gazda, ime i prezime"
    >
      <template #prepend>
        <VIcon class="-translate-y-1" icon="$iconOwner" size="large" />
      </template>
    </VTextField>
    <div class="d-flex items-center justify-between gap-6">
      <VTextField
        :model-value="`${props.profile.phone.value}`"
        readonly
        variant="underlined"
        label="Broj telefona"
      >
        <template #prepend>
          <VIcon icon="$iconPhone" size="large" />
        </template>
      </VTextField>
      <VTextField
        :model-value="`${props.user.email}`"
        readonly
        variant="underlined"
        label="Email adresa"
      >
        <template #prepend>
          <VIcon icon="$iconEmailAt" />
        </template>
      </VTextField>
    </div>
    <VTextField
      :model-value="`${props.profile.address.value}`"
      readonly
      variant="underlined"
      label="Adresa"
    >
      <template #prepend>
        <VIcon icon="$iconLocation" />
      </template>
    </VTextField>
  </section>
</template>
<style lang="scss" scoped>
</style>
