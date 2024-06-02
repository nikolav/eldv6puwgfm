<script setup lang="ts">
import { useDisplay } from "vuetify";
import { schemaEmail } from "@/schemas";
import {
  URL_PASSWORD_RESET_REQUEST,
  URL_PASSWORD_RESET_FORM_LINK,
} from "@/config";
import { VSnackbarStatusMessage } from "@/components/ui";

const { width } = useDisplay();
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
const togglePasswordResetRequestOk = useToggleFlag();
const pc1 = useProcessMonitor();
const { watchProcessing } = useStoreAppProcessing();
watchProcessing(() => pc1.processing.value);
const {
  form,
  submit,
  valid: emailValid,
} = useFormDataFields(
  "WHcPZ23wH",
  {
    email: (value: string) => true === schemaEmail.safeParse(value).success,
  },
  {
    onSubmit: async ({ email }) => {
      let result;
      try {
        pc1.begin();
        result = await $fetch(URL_PASSWORD_RESET_REQUEST, {
          method: "POST",
          body: {
            url: URL_PASSWORD_RESET_FORM_LINK,
            email,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        pc1.setError(error);
      } finally {
        pc1.done();
        toggleShowResetRequestScreen.off();
      }
      if (!pc1.error.value) {
        pc1.successful();
        if (result) {
          // signal status:ok
          togglePasswordResetRequestOk.on();
        }
      }
    },
  }
);
const toggleShowResetRequestScreen = useToggleFlag();
// @@eos
</script>
<template>
  <div class="component--ResetPasswordRequestLink d-flex justify-center my-5">
    <VSnackbarStatusMessage
      v-model="togglePasswordResetRequestOk.isActive.value"
    >
      <p class="d-flex flex-col text-center">
        <span> Link za obnovu lozinke je uspešno poslat. </span>
        <span> Proverite svoje email sanduče. </span>
      </p>
    </VSnackbarStatusMessage>
    <VDialog
      :fullscreen="width <= 456"
      max-width="456"
      v-model="toggleShowResetRequestScreen.isActive.value"
      location="center"
      :close-on-content-click="false"
      :transition="DEFAULT_TRANSITION"
      scrim="white"
    >
      <VCard rounded="lg" :class="422 < width ? 'pa-3' : 'pa-0'">
        <VCardActions>
          <VSpacer />
          <VCardSubtitle class="text-center">
            <span>Obnova lozinke</span>
          </VCardSubtitle>
          <VSpacer />
          <VBtn
            variant="plain"
            icon
            density="comfortable"
            @click="toggleShowResetRequestScreen.off"
          >
            <VIcon icon="$close" />
          </VBtn>
        </VCardActions>
        <VCardText>
          <VForm
            @submit.prevent="submit"
            autocomplete="off"
            :class="422 < width ? 'pa-2' : 'px-0 py-2'"
          >
            <div class="min-h-[92px]">
              <VTextField
                v-model.trim="form.email.value"
                variant="underlined"
                label="Email adresa naloga za resetovanje lozinke *"
                hint="Stiže Vam link forme za promenu lozinke na ovu adresu"
                clearable
              >
                <template #prepend>
                  <VIcon
                    v-if="422 < width"
                    color="primary-darken-2"
                    size="small"
                    start
                    icon="$iconEnvelope"
                    class="-rotate-1 !opacity-30"
                  />
                </template>
              </VTextField>
            </div>
            <VCardActions>
              <VSpacer />
              <VBtn
                :disabled="!emailValid"
                type="submit"
                variant="tonal"
                size="large"
                class="px-5 text-none"
                color="primary-darken-2"
                >Pošalji zahtev</VBtn
              >
            </VCardActions>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>
    <slot>
      <a
        @click="toggleShowResetRequestScreen.on"
        class="link--prominent-base text-primary-darken-1"
      >
        <VIcon v-if="322 < width" start icon="$iconRescue" class="opacity-30" />
        <span :style="322 < width ? undefined : 'font-size: 88%'" class="ms-1">
          Zaboravljena lozinka?
        </span>
        <VTooltip
          location="bottom"
          open-delay="345"
          activator="parent"
          text="Pošalji zahtev za promenu lozinke..."
        />
      </a>
    </slot>
  </div>
</template>
<style lang="scss" scoped></style>
