<script setup lang="ts">
const pClasses = `text-body-1 !font-sans sm:indent-4`;
// #eos
</script>
<template>
  <section class="service-description-auth">
    <VCard
      max-width="640"
      rounded
      class="pa-4 backdrop-blur-lg mx-auto mx-md-0"
      color="rgba(255,255,255,.55)"
    >
      <VCardText class="space-y-2">
        <p :class="pClasses">
          <NuxtLink :to="{ name: 'index' }">
            <a class="hover:underline text-primary">
              <strong>KANTAR.RS</strong>
            </a>
          </NuxtLink>
          Vam omogućava lakše povezivanje sa kupcima u zemlji, kao i jednostavnu
          pretragu i naručivanje proizvoda, dobara i narodnih rukotvorina
          domaćeg porekla. Ova onlajn pijaca povezuje srpske proizvođače i
          zanatlije sa potrošačima koji traže kvalitetne, zdravije i sveže
          proizvode iz cele Srbije. Naša platforma se bavi povezivanjem kupca i
          prodavca. Kupac se dogovara sa prodavcem oko vremena i načina
          isporuke. Kupovinu iz fotelje i dostavu svih proizvoda naručenih na
          teritoriji grada Beograda na kućnu adresu od sada je dostupno putem
          naše platforme KANTAR.RS.
        </p>
      </VCardText>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
