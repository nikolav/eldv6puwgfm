<script setup lang="ts">
import { VBtnToggleOrdersShowCompleted } from "@/components/app";
const auth = useStoreApiAuth();
// @@eos
</script>
<template>
  <div class="__spacer__ *bg-red border-s mt-10">
    <VCardItem>
      <template #append>
        <VBtnToggleOrdersShowCompleted :uid="get(auth.user$, 'id')" />
      </template>
      <VCardTitle class="text-medium-emphasis text-center">
        <h4>Nemate nijednu narudžbenicu.</h4>
        <h5>
          Još uvek niste poručili robu na
          <NuxtLink :to="{ name: 'index' }" target="_blank"
            ><a class="link--prominent-base text-primary"> kantar.rs </a>
          </NuxtLink>
        </h5>
      </VCardTitle>
    </VCardItem>
    <VContainer>
      <VRow>
        <VCol sm="7">
          <VCardText class="space-y-5 indent-2" style="font-size: 1.011rem">
            <p>
              Postoji više načina na koje možete doći do onoga što Vas zanima na
              kantar.rs:
            </p>
            <p>
              Prvo i najočigledije, ako tražite robu iz određene kategorije, na
              svakoj strani istaknut je<NuxtLink
                :to="{ name: 'index' }"
                target="_blank"
                ><a class="link--prominent-base text-primary">brzi meni </a>
              </NuxtLink>
              sa linkovima ka svakodnevnim namirinicama, pićem i zanatskim
              proizvodima u ponudi.
            </p>
            <p>
              Ako još uvek ne nalazite šta Vam odgovara, uporedite
              <em class="text-body-1">sve</em> preduzetnike Srbije ulistane u
              naš sistem i lično im se obratite.<NuxtLink
                :to="{ name: 'karta' }"
                target="_blank"
                ><a class="link--prominent-base text-primary"
                  >Pretražite celu Srbiju
                </a>
              </NuxtLink>
              u dva klika...
            </p>
            <p>
              Takođe, za preciznu pretragu, tu je i klasična pretraga proizvoda
              po tekstu i kriterijumima u vrhu strane ako znate tačno šta Vas
              zanima.
            </p>
            <p>Hvala na poverenju.</p>
            <p>Vaš kantar.rs 👋🏻</p>
          </VCardText>
        </VCol>
        <VCol sm="5" class="*bg-red">
          <VImg
            width="88%"
            src="/kantarlogo.jpg"
            class="mx-auto mt-5 opacity-10"
          />
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
<style lang="scss" scoped></style>
