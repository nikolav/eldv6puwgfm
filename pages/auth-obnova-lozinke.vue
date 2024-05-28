<script setup lang="ts">
import { URL_PASSWORD_RESET_OBNOVA_LOZINKE } from "@/config";
import { VSnackbarStatusMessage } from "@/components/ui";
definePageMeta({
  layout: false,
});

const key$ = ref();
const route = useRoute();

const togglePasswordResetStatus = useToggleFlag();
const pc1 = useProcessMonitor();
const { watchProcessing } = useStoreAppProcessing();
watchProcessing(() => pc1.processing.value);

const pwdtoggle = useToggleFlag();
const {
  form,
  submit,
  valid: formValid,
} = useFormDataFields(
  "x2UJ8D5exRcMfT",
  {
    password: (value: any) => value && 0 < String(value).length,
    passwordRepeat: True,
  },
  {
    onSubmit: async ({ password, passwordRepeat }) => {
      let result;
      if (password != passwordRepeat) return;
      try {
        pc1.begin();
        result = await $fetch(URL_PASSWORD_RESET_OBNOVA_LOZINKE, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            key: key$.value,
            password,
          },
        });
      } catch (error) {
        pc1.setError(error);
      } finally {
        pc1.done();
      }
      if (!pc1.error.value) {
        pc1.successful();
        if (result) {
          // signal success; redirect /
          togglePasswordResetStatus.on();
          setTimeout(() => {
            reloadNuxtApp({ path: "/", persistState: false });
          }, 3456);
        }
      }
    },
  }
);
onceMountedOn(
  () => route.query?.key,
  () => {
    key$.value = route.query.key;
  }
);

// @@eos
</script>
<template>
  <section
    class="page--auth-obnova-lozinke d-flex items-center justify-center fill-height !bg-stone-50"
  >
    <VSnackbarStatusMessage v-model="togglePasswordResetStatus.isActive.value">
      <p class="d-flex flex-col">
        <span>Lozinka je uspešno obnovljena.</span>
        <NuxtLink :to="{ name: 'index' }">
          <a class="link--prominent-base"> 🏠 Povratak na početnu stranu. </a>
        </NuxtLink>
      </p>
    </VSnackbarStatusMessage>
    <VCard
      rounded="lg"
      max-width="550"
      width="550"
      min-height="400"
      elevation="1"
      class="pa-5"
    >
      <VForm @submit.prevent="submit" autocomplete="off" class="space-y-10">
        <VCardTitle class="text-center">
          <VIcon
            start
            class="opacity-10 -translate-y-[2px]"
            size="small"
            icon="$iconLock"
          />
          <span class="text-disabled"> Obnova lozinke </span>
        </VCardTitle>
        <VCardText class="space-y-5">
          <VTextField
            v-model.trim="form.password.value"
            label="Nova lozinka *"
            variant="underlined"
            :type="pwdtoggle.isActive.value ? 'text' : 'password'"
            clearable
          >
            <template #prepend>
              <VIcon class="!opacity-20" icon="$iconKey" />
            </template>
            <template #append>
              <VBtn
                @click="pwdtoggle"
                density="comfortable"
                icon
                size="small"
                variant="text"
              >
                <VIcon
                  :icon="pwdtoggle.isActive.value ? '$iconEye' : '$iconEyeOff'"
                />
              </VBtn>
            </template>
          </VTextField>
          <VTextField
            v-model.trim="form.passwordRepeat.value"
            label="Nova lozinka ponovo *"
            variant="underlined"
            :type="pwdtoggle.isActive.value ? 'text' : 'password'"
            clearable
          >
            <template #prepend>
              <VIcon class="!opacity-20" icon="$iconKey" />
            </template>
            <template #append>
              <VBtn
                disabled
                density="comfortable"
                icon
                size="small"
                variant="plain"
              >
                <VIcon
                  :icon="pwdtoggle.isActive.value ? '$iconEye' : '$iconEyeOff'"
                />
              </VBtn>
            </template>
          </VTextField>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            type="submit"
            :disabled="
              !formValid || form.password.value != form.passwordRepeat.value
            "
            rounded
            size="large"
            variant="tonal"
            color="error"
            class="px-5"
          >
            <VIcon start icon="$iconSave" size="large" />
            <span>Resetuj lozinku</span>
          </VBtn>
          <VSpacer />
        </VCardActions>
      </VForm>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
