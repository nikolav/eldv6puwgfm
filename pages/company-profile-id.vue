<script setup lang="ts">
import { useDisplay } from "vuetify";

import menuDistricts from "@/assets/districts-serbia.json";
import type { ICompanyProfile } from "@/types";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

const { smAndUp } = useDisplay();

const auth = useStoreApiAuth();
const toggleProfileSaved = useToggleFlag();
const toggleProfileUpdating = useToggleFlag();
//
const tab$ = ref("kontakt");
const {
  key: { FORM_COMPANY_ID },
  docs: { TAG_COMPANY_PROFILE_prefix },
  com: { FIELDS },
} = useAppConfig();

const { data: com_, put: profileUpsert } = useDoc<ICompanyProfile>(
  `${TAG_COMPANY_PROFILE_prefix}${get(auth.user$, "id")}`
);
const $$main = useStoreMain();
const form = FIELDS.reduce((formdata_, field) => {
  formdata_[field] = computed({
    get: () => $$main.get(`${FORM_COMPANY_ID}:${field}`),
    set: (val: string) => $$main.put({ [`${FORM_COMPANY_ID}:${field}`]: val }),
  });
  return formdata_;
}, <Record<string, Ref>>{});

const { runSetup: formInit } = useRunSetupOnce(() => {
  forEach(FIELDS, (field) => {
    form[field].value = get(com_.value.data, field) || "";
  });
});
onMounted(() => {
  watch(com_, formInit);
});

const submitFormCompanyId = async () => {
  let error_;
  try {
    toggleProfileUpdating.on();
    await profileUpsert(
      reduce(
        FIELDS,
        (accum, field) => {
          accum[field] = form[field].value;
          return accum;
        },
        <Record<string, string>>{}
      )
    );
  } catch (error) {
    // pass
    error_ = error;
  }
  if (!error_) toggleProfileSaved.on();
  toggleProfileUpdating.off();
};
// #eos
</script>
<template>
  <section class="page--company-profile-id px-4 px-sm-8">
    <!-- @status: --profile-saved -->
    <VSnackbar
      variant="text"
      color="transparent"
      @update:model-value="
        (val) => {
          if (!val) toggleProfileSaved.off();
        }
      "
      v-model="toggleProfileSaved.isActive.value"
    >
      <VAlert type="success" prominent elevation="4">
        <template #append>
          <VBtn
            @click="toggleProfileSaved.off"
            icon
            variant="plain"
            color="on-success"
          >
            <VIcon icon="$close" />
          </VBtn>
        </template>
        <strong> Profil je uspešno sačuvan. </strong>
      </VAlert>
    </VSnackbar>

    <!-- @form: --start -->
    <VForm @submit.prevent="submitFormCompanyId">
      <VCard max-width="812" class="mx-auto mt-4 mt-md-10">
        <VCardTitle class="bg-primary pa-4 px-6 d-flex items-center">
          <h2 class="*text-center text-h5 !font-sans *text-medium-emphasis">
            Lična karta gazdinstva
          </h2>
          <VSpacer />
          <VBtn color="on-primary" icon variant="text">
            <VIcon icon="$iconLink" size="x-large" />
          </VBtn>
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
        <VCardText class="pt-2 pt-sm-8 *min-h-[302px]">
          <VWindow v-model="tab$" mandatory class="overflow-visible" continuous>
            <VFadeTransition mode="in-out" leave-absolute>
              <VWindowItem value="kontakt">
                <div class="px-sm-2 px-md-8 sm:space-y-4">
                  <div class="d-sm-flex items-baseline justify-between ga-4">
                    <VTextField
                      v-model="form.ownerFirstName.value"
                      name="ownerFirstName"
                      variant="underlined"
                      label="Gazda, Ime"
                      clearable
                    >
                      <template v-if="smAndUp" #prepend>
                        <VIcon
                          color="primary-darken-2"
                          icon="$iconOwner"
                          size="x-large"
                          start
                        />
                      </template>
                    </VTextField>
                    <VTextField
                      v-model="form.ownerLastName.value"
                      name="ownerLasttName"
                      variant="underlined"
                      label="Prezime"
                      clearable
                    />
                  </div>
                  <VTextField
                    name="name"
                    v-model="form.name.value"
                    variant="underlined"
                    label="Naziv gazdinstva"
                    clearable
                  >
                    <template v-if="smAndUp" #prepend>
                      <VIcon
                        color="primary-darken-2"
                        icon="$iconDowntown"
                        size="x-large"
                        start
                      />
                    </template>
                  </VTextField>
                  <div class="d-sm-flex items-end justify-between ga-4">
                    <!-- @@ https://www.wikiwand.com/sr/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BD%D0%B8_%D0%BE%D0%BA%D1%80%D1%83%D0%B7%D0%B8_%D0%A1%D1%80%D0%B1%D0%B8%D1%98%D0%B5 -->
                    <VSelect
                      v-model="form.district.value"
                      center-affix
                      label="Okrug *"
                      :items="menuDistricts"
                      variant="solo"
                      :class="smAndUp ? 'max-w-[33%]' : undefined"
                    >
                      <template #item="{ item, props }">
                        <VListSubheader
                          v-if="item.raw.subheader"
                          :title="item.raw.title"
                        />
                        <VListItem
                          v-bind="props"
                          v-else
                          :title="item.raw.title"
                        />
                      </template>
                      <template v-if="smAndUp" #prepend>
                        <VIcon
                          start
                          size="large"
                          color="primary-darken-2"
                          icon="$iconLocation"
                        />
                      </template>
                    </VSelect>

                    <VTextField
                      name="address"
                      v-model="form.address.value"
                      variant="underlined"
                      label="Adresa"
                      clearable
                    >
                      <template v-if="false" #prepend>
                        <VIcon
                          color="primary-darken-2"
                          icon="$iconLocation"
                          size="x-large"
                          start
                        />
                      </template>
                    </VTextField>
                  </div>
                  <VTextField
                    name="phone"
                    v-model="form.phone.value"
                    variant="underlined"
                    label="Telefon"
                    clearable
                  >
                    <template v-if="smAndUp" #prepend>
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
                    rows="8"
                    name="delivery"
                    v-model="form.delivery.value"
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
                    rows="8"
                    name="about"
                    v-model="form.about.value"
                    variant="underlined"
                    center-affix
                    clearable
                    label="Istorijat, o nama, ukratko o našim proizvodima..."
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
        <VCardActions class="pa-4">
          <VSpacer />
          <VBtn
            class="px-4 px-sm-6"
            color="primary-darken-1"
            size="x-large"
            variant="tonal"
            type="submit"
            :disabled="toggleProfileUpdating.isActive.value"
            :loading="toggleProfileUpdating.isActive.value"
          >
            <VIcon size="large" start icon="$iconSave" />
            <strong>Sačuvaj</strong>
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped>
</style>
