<script setup lang="ts">
const refCardGold = ref();
const { width: wCardGold } = useElementSize(refCardGold);
// @@eos
</script>
<template>
  <VCard
    ref="refCardGold"
    elevation="5"
    rounded="t-xl3 b-xl"
    class="fill-height overflow-visible !bg-yellow-50"
    :style="`margin-top: calc(${wCardGold * 0.62 * 0.5}px + 2.34rem)`"
  >
    <VAvatar
      class="z-[10] position-absolute start-1/2 -translate-x-[50%] -translate-y-[50%]"
      :size="wCardGold * 0.62"
      image="~/assets/images/gold-circle.png"
    />

    <!-- hides circle bottom half -->
    <VSheet
      class="z-[1] position-absolute w-full *opacity-50 !bg-yellow-50"
      :height="wCardGold * 0.71 * 0.5"
      rounded="t-xl3"
    />
    <VSheet
      class="z-[0] position-absolute start-1/2 -translate-x-[50%] -translate-y-[50%] !bg-yellow-50"
      :width="wCardGold * 0.66"
      :height="wCardGold * 0.66"
      rounded="circle"
      elevation="5"
    />
    <VSpacer
      :style="`padding-bottom: calc(${wCardGold * 0.71 * 0.5}px + .55rem)`"
    />
    <VCardTitle
      class="text-medium-emphasis text-center space-y-5 overflow-visible"
      style="font-size: 2rem"
    >
      <div>
        <strong
          :style="`font-size: ${wCardGold * 0.44}% !important;`"
          style="
            font-weight: bold !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.71);
          "
          class="text-[#cb9e4b] text-h4 !font-sans"
          >Zlatni</strong
        >
      </div>
      <div>
        <strong
          :style="`font-size: ${wCardGold * 0.44}% !important;`"
          style="
            font-weight: bold !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.71);
          "
          class="text-[#cb9e4b] text-h4 !font-sans"
          >paket</strong
        >
      </div>
    </VCardTitle>
    <VDivider
      thickness="12"
      class="mx-3 mt-10 border-opacity-100 border-black border-dotted"
    />
    <VCardText>
      <div class="d-flex items-center">
        <slot name="action" />
      </div>
      <VList lines="one" class="space-y-3 pt-5 pb-10 !bg-yellow-50">
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Lična karta poljoprivrednog gazdinstva – biografija polj.
            Gazdinstva (tekst sa opisom tog gazdinstva, adresa, kontakt telefon,
            e-mail adresa)</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Mogućnost da ulista neograničeni broj artikla</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Uređivanje lager liste, dostupnosti proizvoda kao i količine.</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans">Korpa / e-shop</span>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Inbox za komunikaciju sa kupcem</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Evidencija primljenih porudžbina</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Recenzije / OCENE I KOMENTARI</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Za lager listu svojih proizvoda nalaziće se u samom vrhu datih
            proizvoda koji su razvrstani po kategorijama ( bašta/ meso/
            zimnica….)</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Video prezentacija poljoprivrednog gazdinstva</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Jedna video reklama za proizvod / proizvode</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans">ONLINE PODRŠKA 24/7</span>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Podrška oko BRENDINGA ( DIZAJN I REDIZAJN ETIKETE, LOGO, BREND BOOK
            STANDARDA)</span
          >
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Promo pozicija na prvoj strani samog portala
          </span>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VIcon color="#e98a00" :size="32" icon="$iconCheck" />
          </template>
          <span class="text-body-1 !font-sans"
            >Opcija da na promo poziciji imamo fiksno jedan proizvod ili opciju
            da se svakim osvežavanjem stranice menja artikl koji se promoviše.
          </span>
        </VListItem>
      </VList>
    </VCardText>
    <VSheet
      :height="wCardGold * 0.71 * 0.44"
      rounded="t-lg b-xl"
      color="transparent"
      class="z-[1] w-full bottom-0 position-absolute !bg-[url('~/assets/images/bg-gold.png')] !bg-cover !bg-no-repeat"
    >
      <VDivider
        thickness="12"
        class="border-opacity-100 border-black border-dotted position-absolute z-[1] w-full ma-0 pa-0 -translate-y-[50%]"
      />
      <div class="position-absolute w-full top-[44%] -translate-y-[50%]">
        <VCardTitle
          style="
            letter-spacing: 0.122rem !important;
            color: white !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.88);
            font-size: 2.55rem !important;
          "
          class="overflow-visible text-h3 !font-sans text-high-emphasis text-center"
          >1200 din. / 1 mesec</VCardTitle
        >
      </div>
    </VSheet>
  </VCard>
</template>
<style lang="scss" scoped></style>
