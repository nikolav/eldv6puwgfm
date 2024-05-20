<script setup lang="ts">
import { HeaderProminent } from "@/components/app";
import { API_URL } from "@/config";

const packageSelected = async (packageType: string) => {
  console.log({ packageType });
  try {
    await $fetch(`${trim(API_URL, "/")}/packages-request`, {
      method: "POST",
      body: {
        type: "type",
        message:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus qui tenetur exercitationem!",
      },
    });
  } catch (error) {
    //
  }
};

// @@eos
</script>
<template>
  <section class="page--paketi">
    <VSpacer class="mt-16" />
    <VContainer class="!max-w-[1450px] mx-auto">
      <HeaderProminent>
        <template #text>
          <h2
            class="ps-20 mt-16 text-truncate font-sans !tracking-wider opacity-60"
            style="font-size: 3rem"
          >
            <strong>
              Paketi usluga
              <NuxtLink :to="{ name: 'index' }" target="_blank">
                <a class="link--prominent-base text-primary"> kantar.rs </a>
              </NuxtLink>
            </strong>
          </h2>
        </template>
        <template #prepend>
          <VIcon
            style="font-size: 12rem"
            class="rotate-[-5deg] opacity-20 translate-x-3"
            icon="$iconMedal"
          />
        </template>
      </HeaderProminent>
      <VSpacer class="mb-5" />
      <VRow>
        <!-- bronze -->
        <VCol md="4">
          <VCard
            elevation="2"
            min-height="812"
            rounded="t-xl b-lg"
            class="!bg-stone-100 fill-height"
          >
            <VImg min-height="256" cover src="/kantarlogo-bronze.png">
              <VIcon
                color="white"
                icon="$iconStar"
                class="position-absolute bottom-1 end-1 *translate-y-[12%] opacity-10"
                :size="33"
              />
            </VImg>
            <VCardTitle
              class="text-medium-emphasis pa-5 text-center mt-2"
              style="font-size: 2rem"
              >Bronzani paket</VCardTitle
            >
            <VCardSubtitle class="text-center">
              Besplatan podrazumevani paket
            </VCardSubtitle>
            <VCardTitle class="mt-10 text-medium-emphasis text-center">
              Uključuje:
            </VCardTitle>
            <VCardText class="pa-3" style="font-size: 1.034rem">
              <VList class="font-sans" bg-color="transparent">
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Neograničen broj artikala za ulistavanje
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Podrška oko prezentacije proizvoda </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Jedna video reklama </span>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VCol>
        <!-- siver -->
        <VCol md="4">
          <VCard
            elevation="4"
            min-height="812"
            rounded="t-xl b-lg"
            class="!bg-slate-50 fill-height"
          >
            <VImg min-height="256" cover src="/kantarlogo-silver.png">
              <VIcon
                color="white"
                icon="$iconStar"
                class="position-absolute bottom-1 end-1 *translate-y-[12%] opacity-10"
                :size="33"
              />
              <VIcon
                color="white"
                icon="$iconStar"
                class="position-absolute bottom-1 end-9 *translate-y-[12%] opacity-10"
                :size="33"
              />
            </VImg>
            <VCardTitle
              class="text-medium-emphasis pa-5 text-center mt-2"
              style="font-size: 2rem"
              >Srebrni paket</VCardTitle
            >
            <VCardSubtitle
              class="text-center !opacity-50"
              style="font-size: 1.44rem"
            >
              50.000 dinara mesečno
            </VCardSubtitle>
            <VCardTitle class="mt-10 text-medium-emphasis text-center">
              Uključuje:
            </VCardTitle>
            <VCardText class="pa-3" style="font-size: 1.034rem">
              <VList class="font-sans" bg-color="transparent">
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Neograničen broj artikala za ulistavanje
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Jedno zakuplenjo mesto u premium sekciji
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Brending </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Dve video reklame </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Podrška 24/7</span>
                </VListItem>
              </VList>
            </VCardText>

            <VSpacer class="mb-48" />
            <VCardActions class="position-absolute bottom-0 w-full">
              <VSpacer />
              <VBtn
                @click="packageSelected('srebrni')"
                height="4rem"
                width="55%"
                variant="elevated"
                color="#6b7280"
                size="x-large"
                rounded="lg"
                class="px-5 ma-5"
                elevation="1"
              >
                Izaberi paket
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VCol>
        <!-- zlatni -->
        <VCol md="4">
          <VCard
            elevation="5"
            min-height="812"
            rounded="t-xl b-lg"
            class="!bg-yellow-50 fill-height"
          >
            <VImg min-height="256" cover src="/kantarlogo-gold.png">
              <div
                class="position-absolute bottom-1 end-1 *translate-y-[12%] opacity-30"
              >
                <VIcon color="white" icon="$iconStar" :size="33" />
                <VIcon color="white" icon="$iconStar" :size="33" />
                <VIcon color="white" icon="$iconStar" :size="33" />
              </div>
            </VImg>
            <VCardTitle
              class="text-medium-emphasis pa-5 text-center mt-2"
              style="font-size: 2rem"
              >Zlatni paket</VCardTitle
            >
            <VCardSubtitle
              class="text-center !opacity-50"
              style="font-size: 1.44rem"
            >
              80.000 dinara mesečno
            </VCardSubtitle>
            <VCardTitle class="mt-10 text-medium-emphasis text-center">
              Uključuje:
            </VCardTitle>
            <VCardText class="pa-3" style="font-size: 1.034rem">
              <VList class="font-sans" bg-color="transparent">
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Neograničen broj artikala za ulistavanje
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">
                    Dva zakuplenja mesta u premium sekciji
                  </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Brending </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Marketing na društvenim mrežama </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2">Video reklama za svaki proizvod </span>
                </VListItem>
                <VListItem>
                  <VIcon class="opacity-40" icon="$iconCheck" />
                  <span class="ps-2"> Podrška 24/7</span>
                </VListItem>
              </VList>
            </VCardText>

            <!-- compensate whitespace for abs VCardActions -->
            <VSpacer class="mb-48" />
            <VCardActions class="position-absolute bottom-0 w-full">
              <VSpacer />
              <VBtn
                @click="packageSelected('zlatni')"
                class="px-5 ma-5"
                color="#eab308"
                elevation="1"
                height="4rem"
                rounded="lg"
                size="x-large"
                variant="elevated"
                width="55%"
              >
                Izaberi paket
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
      <VDivider class="border-opacity-50 my-12" />
    </VContainer>
  </section>
</template>
<style lang="scss" scoped></style>
