<script setup lang="ts">
import type { IAuthProfile } from "@/types";
import { UserAvatarPicker, VSnackbarStatusMessage } from "@/components/ui";
definePageMeta({
  layout: "user-profile",
  middleware: "authorized",
});

const auth = useStoreApiAuth();

// defs
const { authProfile } = useTopics();
// stores
const { data, commit } = useDoc<IAuthProfile>(
  authProfile(get(auth.user$, "id"))
);
const profile = computed(() => get(data.value, "data"));
// utils
const FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "address",
  "userNote",
  // "facebook",
  // "instagram",
];

const { watchProcessing } = useStoreAppProcessing();
const formProcessing = useProcessMonitor();
const toggleFormUploadStatus = useToggleFlag();
watchEffect(() => {
  if (!formProcessing.processing.value && formProcessing.success.value)
    toggleFormUploadStatus.on();
});
watchProcessing(formProcessing.processing);

const { form, submit } = useFormDataFields(
  "ejGJAzzWpAmv90TE",
  FIELDS.reduce((acc, field) => {
    acc[field] = True;
    return acc;
  }, <Record<string, any>>{}),
  {
    onSubmit: async (data) => {
      let err: any;
      const fdata = transform(
        data,
        (d, value, field) => {
          d[String(field)] = value ? String(value).trim() : "";
        },
        <Record<string, string>>{}
      );
      try {
        formProcessing.begin();
        await commit(fdata);
      } catch (error) {
        err = error;
        formProcessing.setError(error);
      } finally {
        formProcessing.done();
      }
      if (!err) formProcessing.successful();
    },
  }
);
const resetFieldsFromStore = () =>
  FIELDS.forEach((field) => {
    form[field].value = get(profile.value, field);
  });
onceMountedOn(profile, resetFieldsFromStore);
// @@eos
</script>
<template>
  <section class="page--user-profile">
    <VSnackbarStatusMessage v-model="toggleFormUploadStatus.isActive.value">
      Profil je uspešno sačuvan.
    </VSnackbarStatusMessage>
    <VForm
      @submit.prevent="submit"
      autocomplete="off"
      class="__placer__ mt-1 mt-sm-8"
    >
      <VCard max-width="912" class="mx-auto" rounded="t-lg">
        <VCardItem class="bg-primary min-h-[64px]">
          <template #append><UserAvatarPicker /></template>
          <VCardTitle class="ms-5 opacity-50">Moji kontakt podaci</VCardTitle>
        </VCardItem>
        <VContainer fluid>
          <VRow dense>
            <!-- @@form:left -->
            <VCol sm="7">
              <div class="__placer__ pa-4 space-y-5">
                <VTextField
                  density="comfortable"
                  v-model="form.firstName.value"
                  clearable
                  variant="underlined"
                  name="user_first_name"
                  label="Ime *"
                />
                <VTextField
                  density="comfortable"
                  v-model="form.lastName.value"
                  clearable
                  variant="underlined"
                  name="user_last_name"
                  label="Prezime *"
                />
                <VTextField
                  density="comfortable"
                  v-model="form.phone.value"
                  clearable
                  variant="underlined"
                  name="user_phone"
                  label="Telefon *"
                />
                <VTextField
                  density="comfortable"
                  v-model="form.address.value"
                  clearable
                  variant="underlined"
                  name="user_address"
                  label="Adresa za isporuke *"
                  hint="Za kurir službu"
                />
              </div>
            </VCol>
            <!-- @@form:right -->
            <VCol sm="5">
              <div class="__placer__ fill-height rounded ps-5 pe-3 pt-3">
                <VTextarea
                  v-model="form.userNote.value"
                  name="user_note"
                  variant="plain"
                  label="Napomena za prodavce"
                  clearable
                  class="bg-stone-100 fill-height pa-2"
                  active
                />
              </div>
            </VCol>
          </VRow>
        </VContainer>
        <VCardActions class="pa-5">
          <VBtn
            @click.stop="resetFieldsFromStore"
            variant="text"
            size="large"
            class="px-4 ms-5"
          >
            <VIcon start icon="$iconEraser" />
            <span>Poništi</span>
          </VBtn>
          <VSpacer />
          <VBtn
            variant="tonal"
            type="submit"
            size="large"
            color="primary-darken-1"
            class="px-4 me-5"
          >
            <VIcon start icon="$iconSave" />
            <span>Sačuvaj</span>
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
