<script setup lang="ts">
import { LightboxSlides } from "@/components/ui";
const slidesVideo = [
  {
    type: "youtube",
    src: "https://youtu.be/8kXazZYa5KY",
  },
];
const slidesPhotos = [
  {
    src: "/gallery-2/p1.jpg",
  },
  {
    src: "/gallery-2/p2.jpg",
  },
  {
    src: "/gallery-2/p3.jpg",
  },
  {
    src: "/gallery-2/p4.jpg",
  },
  {
    src: "/gallery-2/p5.jpg",
  },
];
const slidesPrint = [
  {
    type: "iframe",
    src: "https://www.shopen.com/blog/4-trika-kako-brzo-povecati-online-prodaju",
  },
];

// @@eos
</script>
<template>
  <section class="component--NoDataOrders">
    <VCardTitle class="mt-2 text-center text-medium-emphasis"
      >Trenutno nemate nijednu narudžbinu.</VCardTitle
    >
    <VSpacer />
    <VCardText class="indent-4 space-y-5">
      <p
        style="
          font-size: 1.022rem;
          line-height: 1.44rem;
          letter-spacing: 0.41px;
        "
      >
        Želite da budete primećeni i da se Vaš proizvod bolje vidi? Za Vas smo
        napravili
        <NuxtLink :to="{ name: 'paketi' }" external target="_blank">
          <a
            style="font-size: 1.12rem !important"
            class="!font-sans d-inline text-primary link--prominent-base text-body-1"
            >ove pakete usluga</a
          >
        </NuxtLink>
        koji to omogućuju. Pogledajte i izaberite onaj koji Vam više odgovara.
      </p>
      <p
        style="
          font-size: 1.022rem;
          line-height: 1.44rem;
          letter-spacing: 0.41px;
        "
      >
        Evo i par uspešnih primera i saveta koji mogu pomoći da porudžbine stižu
        redovno u Vaše sanduče:
      </p>
      <VContainer>
        <VRow>
          <VCol sm="4">
            <LightboxSlides :slides="slidesVideo">
              <template #activator="{ open: openGalleryVideo }">
                <VImg
                  border
                  rounded="lg"
                  cover
                  @click="openGalleryVideo"
                  width="100%"
                  min-height="152"
                  src="~/assets/images/kompozicija-small.png"
                  class="!shadow hover:opacity-95 opacity-90 position-relative overflow-hidden cursor-pointer"
                >
                  <div
                    class="position-absolute bottom-0 inset-x-0 bg-black/60 text-white/80 h-[41%] d-flex items-center"
                  >
                    <h4 class="ms-1">Kompozicija</h4>
                  </div>
                </VImg>
              </template>
            </LightboxSlides>
          </VCol>
          <VCol sm="4">
            <LightboxSlides :slides="slidesPhotos">
              <template #activator="{ open: openGalleryPhotos }">
                <VImg
                  border
                  rounded="lg"
                  cover
                  @click="openGalleryPhotos"
                  width="100%"
                  min-height="152"
                  src="~/assets/images/flase-rakija-small.png"
                  class="shadow hover:opacity-95 opacity-90 position-relative overflow-hidden cursor-pointer"
                >
                  <div
                    class="position-absolute bottom-0 inset-x-0 bg-black/60 text-white/80 h-[41%] d-flex items-center"
                  >
                    <h4 class="*ms-n1 text-center">Fotografije sa kantar.rs</h4>
                  </div>
                </VImg>
              </template>
            </LightboxSlides>
          </VCol>
          <VCol sm="4">
            <LightboxSlides :slides="slidesPrint">
              <template #activator="{ open: openGalleryPrint }">
                <VImg
                  border
                  rounded="lg"
                  cover
                  @click="openGalleryPrint"
                  width="100%"
                  min-height="152"
                  src="~/assets/images/pencils-right.png"
                  class="shadow hover:opacity-95 opacity-90 position-relative overflow-hidden cursor-pointer"
                >
                  <div
                    class="position-absolute bottom-0 inset-x-0 bg-black/60 text-white/80 h-[41%] d-flex items-center"
                  >
                    <h4 class="*ms-n1 text-center">
                      Par &#39;trikova&#39; sa
                      <em class="text-body-2">shopen.com</em>
                    </h4>
                  </div>
                </VImg>
              </template>
            </LightboxSlides>
          </VCol>
        </VRow>
      </VContainer>
    </VCardText>
  </section>
</template>
<style lang="scss" scoped></style>
