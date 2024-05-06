<script setup lang="ts">
import { emojify } from "node-emoji";
const {
  key: { ORDER_ID },
} = useAppConfig();
const cart = useStoreCart();
const OID$ = useGlobalVariable(ORDER_ID);

const showPijaca = () => {
  OID$.value = null;
  cart.close();
  nextTick(() => navigateTo({ name: "index" }));
};
// @@eos
</script>
<template>
  <VSheet
    position="relative"
    color="transparent"
    class="*bg-blue component--CardOrderConfirmSuccess fill-height d-flex justify-center items-center"
  >
    <VBtn
      @click="showPijaca"
      class="text-primary position-absolute top-4 start-4 z-[1]"
      icon
      variant="elevated"
      color="on-primary"
      size="x-large"
      elevation="3"
    >
      <VIcon size="x-large" icon="$iconStoreFront" />
      <VTooltip
        activator="parent"
        text="Pijaca"
        open-delay="345"
        location="bottom"
      />
    </VBtn>
    <VBtn
      @click="showPijaca"
      class="position-absolute top-4 end-4 z-[1]"
      icon="$close"
      variant="text"
      size="x-large"
    >
      <VIcon size="x-large" icon="$close" />
    </VBtn>
    <!-- <VBtn @click="$emit('order-confirmed')">ok:clear</VBtn> -->
    <VContainer fluid class="*bg-red !max-w-[952px]">
      <VRow>
        <VCol sm="3" class="d-flex items-center justify-center">
          <VIcon color="success-darken-1" :size="256" icon="$success" />
        </VCol>
        <VCol
          sm="8"
          offset="1"
          class="d-flex flex-col items-center justify-center"
        >
          <VCard class="!bg-white/40 backdrop-blur-md" elevation="1">
            <VCardTitle>
              <h4 style="font-size: 111%" class="text-center">
                <strong style="font-size: 122%">👌🏻</strong> Vaša narudžba je
                uspešno prosleđena.
              </h4>
            </VCardTitle>
            <VCardSubtitle
              style="font-size: 89%"
              class="text-center text-medium-emphasis"
              >Ref #<em class="text-body-1">{{ OID$ }}</em></VCardSubtitle
            >
            <VCardText
              style="font-size: 111% !important"
              class="indent-4 space-y-6 px-5 pt-4 !leading-6 !font-sans !tracking-widest text-body-1 text-medium-emphasis"
            >
              <p class="">
                Spisak artikala za otpremanje je poslat u
                <em>Inbox</em> svakog od proizvođača. Očekujte dalju
                komunikaciju sa njihove strane i izveštaje o statusu vaše
                poručene robe.
              </p>
              <p class="text-center indent-0">
                Hvala Vam što koristite
                <a @click="showPijaca" class="text-primary link--prominent">
                  <strong> KANTAR.RS </strong>
                </a>
              </p>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
