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
      label="Preduzetnik, ime i prezime"
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
    <div class="d-flex items-center justify-center gap-6 mt-6">
      <NuxtLink
        v-if="props.profile.facebook.value"
        :to="props.profile.facebook.value"
        external
        target="_blank"
      >
        <VChip elevation="1" link color="#1877F2">
          <template #prepend>
            <VIcon start icon="$iconFacebook" />
          </template>
          <template #append>
            <VIcon
              size="small"
              class="opacity-40 -translate-x-[2px] translate-y-px"
              end
              icon="$iconExternalLink"
            />
          </template>
          <em class="text-xs max-w-[8rem] d-inline-block text-truncate">{{
            props.profile.facebook.value
          }}</em>
        </VChip>
      </NuxtLink>
      <NuxtLink
        v-if="props.profile.instagram.value"
        :to="props.profile.instagram.value"
        external
        target="_blank"
      >
        <VChip elevation="1" link color="#cd486b">
          <template #prepend>
            <VIcon start icon="$iconInstagram" />
          </template>
          <template #append>
            <VIcon
              size="small"
              class="opacity-40 -translate-x-[2px] translate-y-px"
              end
              icon="$iconExternalLink"
            />
          </template>
          <em class="text-xs max-w-[8rem] d-inline-block text-truncate">
            {{ props.profile.instagram.value }}
          </em>
        </VChip>
      </NuxtLink>
    </div>
  </section>
</template>
<style lang="scss" scoped>
</style>
