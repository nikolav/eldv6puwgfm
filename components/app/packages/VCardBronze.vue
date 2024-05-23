<script setup lang="ts">
const refCardBronze = ref();
const { width: wCardBronze } = useElementSize(refCardBronze);
// @@eos
</script>
<template>
  <VCard
    ref="refCardBronze"
    elevation="2"
    rounded="t-xl3 b-xl"
    class="fill-height overflow-visible position-relative"
    :style="`margin-top: calc(${wCardBronze * 0.62 * 0.5}px + 2.34rem)`"
  >
    <VAvatar
      class="z-[10] position-absolute start-1/2 -translate-x-[50%] -translate-y-[50%]"
      :size="wCardBronze * 0.62"
      image="~/assets/images/bronze-circle.png"
    />

    <!-- hides circle bottom half -->
    <VSheet
      class="z-[1] position-absolute w-full *opacity-50"
      :height="wCardBronze * 0.71 * 0.5"
      rounded="t-xl3"
    />
    <VSheet
      class="z-[0] position-absolute start-1/2 -translate-x-[50%] -translate-y-[50%]"
      :width="wCardBronze * 0.66"
      :height="wCardBronze * 0.66"
      rounded="circle"
      elevation="2"
    />
    <VSpacer
      :style="`padding-bottom: calc(${wCardBronze * 0.71 * 0.5}px + .55rem)`"
    />
    <VCardTitle
      class="text-medium-emphasis text-center space-y-5 overflow-visible"
      style="font-size: 2rem"
    >
      <div>
        <strong
          :style="`font-size: ${wCardBronze * 0.44}% !important;`"
          style="
            font-weight: bold !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.71);
          "
          class="text-[#d06e53] text-h4 !font-sans"
          >Bronzani</strong
        >
      </div>
      <div>
        <strong
          :style="`font-size: ${wCardBronze * 0.44}% !important;`"
          style="
            font-weight: bold !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.71);
          "
          class="text-[#d06e53] text-h4 !font-sans"
          >paket</strong
        >
      </div>
    </VCardTitle>
    <VDivider
      thickness="12"
      class="mx-3 mt-10 border-opacity-100 border-black border-dotted"
    />
    <VCardText>
      <VList lines="one" class="space-y-3 pt-5 pb-10">
        <VListItem>
          <template #prepend>
            <VIcon color="#953622" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Lična karta poljoprivrednog gazdinstva – biografija polj.
            Gazdinstva (tekst sa opisom tog gazdinstva, adresa, kontakt telefon,
            e-mail adresa)</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#953622" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Mogućnost da ulista neograničeni broj artikla</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#953622" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Uređivanje lager liste, dostupnosti proizvoda kao i količine.</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#953622" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans">Korpa / e-shop</span>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#953622" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Inbox za komunikaciju sa kupcem</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#953622" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Evidencija primljenih porudžbina</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#953622" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Recenzije / OCENE I KOMENTARI</span
          >
        </VListItem>
      </VList>
    </VCardText>
    <VSheet
      :height="wCardBronze * 0.71 * 0.44"
      rounded="t-lg b-xl"
      color="transparent"
      class="z-[1] w-full bottom-0 position-absolute !bg-[url('~/assets/images/bg-bronze.png')] !bg-cover !bg-no-repeat"
    >
      <VDivider
        thickness="12"
        class="border-opacity-100 border-black border-dotted position-absolute z-[1] w-full ma-0 pa-0 -translate-y-[50%]"
      />
      <VCardTitle
        style="
          letter-spacing: 0.122rem !important;
          color: white !important;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.88);
        "
        class="overflow-visible text-h2 !font-sans text-high-emphasis position-absolute w-full text-center top-[47%] -translate-y-[50%]"
        >Besplatno</VCardTitle
      >
    </VSheet>
  </VCard>
</template>
<style lang="scss" scoped></style>
