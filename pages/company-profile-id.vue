<script setup lang="ts">
definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

interface ICompanyProfile {
  name?: string | undefined;
  address?: string | undefined;
  phone?: string | undefined;
  delivery?: string | undefined;
  about?: string | undefined;
}

const tab$ = ref("kontakt");
const name$ = ref("");
const address$ = ref("");
const phone$ = ref("");
const delivery$ = ref("");
const about$ = ref("");

// #eos
</script>
<template>
  <section class="page--company-profile-id px-4 px-sm-8">
    <VCard max-width="856" class="mx-auto mt-12 mt-md-16">
      <VCardTitle class="bg-primary">
        <h2 class="*text-center text-h5 !font-sans *text-medium-emphasis">
          Lična karta
        </h2>
      </VCardTitle>
      <VCardItem>
        <VTabs
          show-arrows
          mandatory
          v-model="tab$"
          fixed-tabs
          color="primary-darken-1"
          align-tabs="center"
          class="mt-sm-2"
        >
          <VTab value="kontakt">
            <span>Konakt podaci</span>
          </VTab>
          <VTab value="dostava">
            <span>Načini dostave</span>
          </VTab>
          <VTab value="fotografije">
            <span>fotografije</span>
          </VTab>
          <VTab value="istorijat">
            <span>istorijat</span>
          </VTab>
        </VTabs>
      </VCardItem>
      <VCardText class="pt-2 pt-sm-6">
        <VWindow v-model="tab$" mandatory class="overflow-visible">
          <VFadeTransition mode="in-out" leave-absolute>
            <VWindowItem value="kontakt">
              <div class="px-sm-2 px-md-8 sm:space-y-4">
                <VTextField
                  name="name"
                  v-model="name$"
                  variant="underlined"
                  label="Naziv gazdinstva"
                  clearable
                >
                  <template #prepend>
                    <VIcon
                      color="primary-darken-2"
                      icon="$iconDowntown"
                      size="x-large"
                      start
                    />
                  </template>
                </VTextField>
                <VTextField
                  name="address"
                  v-model="address$"
                  variant="underlined"
                  label="Adresa"
                  clearable
                >
                  <template #prepend>
                    <VIcon
                      color="primary-darken-2"
                      icon="$iconLocation"
                      size="x-large"
                      start
                    />
                  </template>
                </VTextField>
                <VTextField
                  name="phone"
                  v-model="phone$"
                  variant="underlined"
                  label="Telefon"
                  clearable
                >
                  <template #prepend>
                    <VIcon
                      color="primary-darken-2"
                      icon="$iconPhone"
                      size="x-large"
                      start
                    />
                  </template>
                </VTextField>
              </div>
            </VWindowItem>
          </VFadeTransition>
          <VFadeTransition mode="in-out" leave-absolute>
            <VWindowItem value="fotografije">
              <VContainer fluid>
                <VRow>
                  <VCol sm="4">
                    <VCard image="/zanat.png" min-height="196">
                      <template #image>
                        <VImg cover />
                      </template>
                      <VOverlay
                        scrim="primary2"
                        class="cursor-pointer d-flex items-center justify-center"
                        persistent
                        activator="parent"
                        contained
                        open-on-hover
                      >
                        <VBtn
                          variant="elevated"
                          color="primary"
                          class="opacity-90"
                          icon
                        >
                          <VIcon icon="$close" size="x-large" />
                        </VBtn>
                      </VOverlay>
                    </VCard>
                  </VCol>
                  <VCol sm="4">
                    <VCard image="/zanat.png" min-height="196">
                      <template #image>
                        <VImg cover />
                      </template>
                      <VOverlay
                        scrim="primary2"
                        class="cursor-pointer d-flex items-center justify-center"
                        persistent
                        activator="parent"
                        contained
                        open-on-hover
                      >
                        <VBtn
                          variant="elevated"
                          color="primary"
                          class="opacity-90"
                          icon
                        >
                          <VIcon icon="$close" size="x-large" />
                        </VBtn>
                      </VOverlay>
                    </VCard>
                  </VCol>
                  <VCol sm="4">
                    <VCard image="/zanat.png" min-height="196">
                      <template #image>
                        <VImg cover />
                      </template>
                      <VOverlay
                        scrim="primary2"
                        class="cursor-pointer d-flex items-center justify-center"
                        persistent
                        activator="parent"
                        contained
                        open-on-hover
                      >
                        <VBtn
                          variant="elevated"
                          color="primary"
                          class="opacity-90"
                          icon
                        >
                          <VIcon icon="$close" size="x-large" />
                        </VBtn>
                      </VOverlay>
                    </VCard>
                  </VCol>
                </VRow>
              </VContainer>
            </VWindowItem>
          </VFadeTransition>

          <VFadeTransition mode="in-out" leave-absolute>
            <VWindowItem value="dostava">
              <div class="px-sm-2 px-md-8 sm:space-y-4">
                <VTextarea
                  name="delivery"
                  v-model="delivery$"
                  variant="underlined"
                  center-affix
                  clearable
                  label="Opis načina dostave do kupaca"
                >
                  <template #prepend>
                    <VIcon
                      icon="$iconDeliveryTruck"
                      size="42"
                      color="primary-darken-2"
                      start
                    />
                  </template>
                </VTextarea>
              </div>
            </VWindowItem>
          </VFadeTransition>
          <VFadeTransition mode="in-out" leave-absolute>
            <VWindowItem value="istorijat">
              <div class="px-sm-2 px-md-8 sm:space-y-4">
                <VTextarea
                  name="about"
                  v-model="about$"
                  variant="underlined"
                  center-affix
                  clearable
                  label="Istorijat, o nama, ukratko o našim proizvodima"
                >
                  <template #prepend>
                    <VIcon
                      icon="$iconBook"
                      size="x-large"
                      color="primary-darken-2"
                      start
                    />
                  </template>
                </VTextarea>
              </div>
            </VWindowItem>
          </VFadeTransition>
        </VWindow>
      </VCardText>
      <VCardActions>
        <VBtn>ok</VBtn>
      </VCardActions>
    </VCard>
  </section>
</template>
<style lang="scss" scoped>
</style>
