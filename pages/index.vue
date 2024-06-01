<script setup lang="ts">
// https://github.com/surmon-china/videojs-player
import dayjs from "dayjs";
import { useDisplay } from "vuetify";
import {
  // LikeDislike,
  BlogReceptiLinkProminent,
  CardProductDisplay,
  FooterKakoOvoFunkcionise,
  HeaderProminent,
  MailingListSave,
  OverviewsFake,
  TopicChat,
  VCardCompanyDisplay,
} from "@/components/app";
import { LightboxSlides, VSnackbarStatusMessage } from "@/components/ui";

definePageMeta({
  scrollToTop: false,
});

// utils
const { smAndUp, mdAndUp, lgAndUp, width } = useDisplay();
const {
  date: { ISO_FORMAT },
} = useAppConfig();

// const
const d1MonthAgo = dayjs().subtract(1, "month");

// products popular
const { products: productsPopular_ } = useQueryProductsSearch({
  sortBy: 8,
  limit: 20,
});
const productsPopular = computed(() =>
  take(
    shuffle(productsPopular_.value),
    lgAndUp.value ? 10 : mdAndUp.value ? 8 : smAndUp.value ? 6 : 3
  )
);

// get random rwd-based number products newer than 1month
const { products: productsLatest1Month } = useQueryProductsSearch({
  date_after: d1MonthAgo.format(ISO_FORMAT),
});
const productsLatest = computed(() =>
  take(
    shuffle(productsLatest1Month.value),
    lgAndUp.value ? 10 : mdAndUp.value ? 8 : smAndUp.value ? 6 : 3
  )
);

const { products: productsPromo } = useQueryProductsPromo();

// take 10:max random users:com newer than 1month
const { companies: companiesAll } = useQueryCompaniesList(
  undefined,
  false,
  true
);
const companiesNew = computed(() =>
  sampleSize(
    filter(companiesAll.value, (com) =>
      dayjs(com.created_at).isAfter(d1MonthAgo)
    ),
    10
  )
);

// --slides-promo
const slidesPromoMaterial = [
  {
    type: "pdf",
    src: "/prodajna-prezentacija-12941639168.pdf",
    caption: "Prodajna prezentacija | KANTAR.RS",
  },
  {
    type: "pdf",
    src: "/uputstvo-za-fotografisanje-hrane-12941639168.pdf",
    caption: "Uputstvo za fotografisanje hrane | KANTAR.RS",
  },
  {
    type: "youtube",
    src: "https://youtu.be/Vkz7yTHlrmk",
    caption: "Obrada slika za sajt | KANTAR.RS",
  },
];

const saveEmail$ = ref();
const toggleEmailSaved = useToggleFlag();
// #eos
</script>

<template>
  <section id="page-demo" class="*pa-2 *pa-md-4">
    <!-- mail-save --status -->
    <VSnackbarStatusMessage v-model="toggleEmailSaved.isActive.value">
      <VCardText>
        <strong style="font-size: 1.55rem"> 👌🏻 </strong>
        Email je uspešno sačuvan. Informisaćemo Vas putem elektronske pošte o
        novostima na KANTAR.RS. Hvala.
      </VCardText>
    </VSnackbarStatusMessage>

    <div class="__spacer__ mt-10" />

    <!-- izdvajamo -->
    <!-- <HeaderProminent
      text="Ovog meseca za Vas smo izdvojili: "
      class="ps-12 mt-6 text-medium-emphasis"
      style="font-size: 2.55rem"
    >
      <template #prepend>
        <VIcon
          style="font-size: 7.22rem"
          class="rotate-[-5deg] opacity-20 translate-x-3"
          icon="$iconStarFat"
          color="primary"
        />
      </template>
    </HeaderProminent>

    <VContainer fluid class="products--list">
      <VRow dense>
        <VCol
          :class="lgAndUp ? 'cols5' : undefined"
          :sm="4"
          :md="3"
          lg="auto"
          v-for="p in productsSelection"
          :key="p.id"
        >
          <CardProductDisplay @product-photos-change="noop" :product="p" />
        </VCol>
      </VRow>
    </VContainer> -->

    <!-- popularno -->
    <HeaderProminent
      text="Najtraženije na kantar.rs "
      class="mt-6 text-medium-emphasis"
      :class="[620 < width ? 'ps-12' : '!ps-0']"
      :style="`font-size: ${
        612 < width ? '2.55rem' : 420 < width ? '1.77rem' : '1rem'
      }`"
    >
      <template #prepend>
        <VIcon
          style="font-size: 7.22rem"
          class="rotate-[-5deg] opacity-20 translate-x-3"
          icon="$iconStarFat"
          color="primary"
        />
      </template>
    </HeaderProminent>

    <VContainer fluid class="products--list">
      <VRow dense>
        <VCol
          v-for="p in productsPopular"
          :class="lgAndUp ? 'cols5' : undefined"
          :sm="4"
          :md="3"
          lg="auto"
          :key="p.id"
        >
          <CardProductDisplay @product-photos-change="noop" :product="p" />
        </VCol>
      </VRow>
    </VContainer>

    <!-- sponzorisano -->
    <div class="__spacer__ mt-32" />
    <HeaderProminent
      v-if="0 < productsPromo?.length"
      class="ps-12 mt-12 text-medium-emphasis"
      style="font-size: 2.55rem"
    >
      <template #prepend>
        <VIcon
          style="font-size: 12rem"
          class="rotate-[-5deg] opacity-20 translate-x-3"
          icon="$iconMedal"
          color="primary"
        />
      </template>
      <template #text>
        <h2
          class="mt-12 text-truncate font-sans tracking-wider text-medium-emphasis"
          :class="[720 < width ? 'ps-16' : 'ps-3']"
          :style="`font-size: ${
            580 < width ? '3.14rem' : 400 < width ? '2rem' : '1.22rem'
          }`"
        >
          Premium članovi
        </h2>
      </template>
    </HeaderProminent>
    <VContainer fluid class="products--list" v-if="0 < productsPromo?.length">
      <VRow dense>
        <VCol
          :class="lgAndUp ? 'cols5' : undefined"
          :sm="4"
          :md="3"
          lg="auto"
          v-for="p in productsPromo"
          :key="p.id"
        >
          <CardProductDisplay @product-photos-change="noop" :product="p" />
        </VCol>
      </VRow>
    </VContainer>

    <!-- footer, info -->
    <VSpacer class="__scacer__ mt-36" />
    <div class="px-2">
      <FooterKakoOvoFunkcionise class="mt-16 !max-w-[1350px] !mx-auto" />
    </div>

    <!-- blog, receipt, links -->
    <VSpacer class="__scacer__ mt-36" />
    <div class="max-w-[1366px] mx-auto">
      <HeaderProminent
        :style="`font-size: ${
          480 < width ? '2.44rem' : 322 < width ? '1.88rem' : '1.22rem'
        }`"
        class="mt-8 text-medium-emphasis"
        :class="[420 < width ? 'ps-10' : 'ps-2']"
        text="Ispratite trendove"
      >
        <template #prepend>
          <VIcon
            style="font-size: 8rem"
            class="ms-3 opacity-20"
            icon="$iconRoadSign"
            color="primary"
          />
        </template>
      </HeaderProminent>
      <BlogReceptiLinkProminent />
    </div>

    <!-- welcome -->
    <div class="__scacer__ mt-32" />
    <div v-if="0 < companiesNew?.length" class="max-w-[1366px] mx-auto">
      <HeaderProminent
        class="mt-12 text-medium-emphasis"
        :class="[555 < width ? 'ps-10' : 'ps-2']"
        text="Pozdrav novim članovima"
        :style="`font-size: ${
          750 < width
            ? '2.44rem'
            : 555 < width
            ? '2.22rem'
            : 455 < width
            ? '1.88rem'
            : 300 < width
            ? '1.22rem'
            : '1rem'
        }`"
      >
        <template #prepend>
          <div
            style="font-size: 10rem"
            class="d-flex items-center justify-center"
          >
            <svg
              class="opacity-20 ms-4 text-primary"
              width="1em"
              height="1em"
              viewBox="0 0 428.06 240.24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(-15.972 -15.381)">
                <path
                  fill="currentColor"
                  d="m115.01 200.28c-0.41825-17.762 0.98827-35.701-1.158-53.34-13.283-5.1183-27.181-11.26-38.678-20.395-24.005-18.779-47.876-41.358-57.927-70.889-8.0927-21.766 24.546-36.648 35.601-15.621 12.377 21.573 28.487 41.617 50.37 54.157 26.224 16.742 57.308 21.742 86.708 29.996 41.019 12.232 76.082 43.721 89.685 84.689 1.3877 13.619 22.239 45.267-2.5103 45.295-15.952 3.5533-33.684 1.6888-32.4-18.312-5.2194-16.5-12.382-33.595-25.97-44.915-3.3595 11.606-1.0688 25.012-1.7214 37.386v25.842h-102v-53.892zm189.59 47.192c-3.7845-38.254-20.518-75.119-47.624-102.48 6.1764-13.003 34.868-14.51 50.262-19.79 40.367-8.9446 80.622-31 99.56-69.31 6.2594-19.801 42.762-14.459 36.511 8.0553-7.6959 30.064-31.839 52.951-55.973 70.878-12.181 12.796-41.828 11.195-36.182 34.925-0.26671 28.138-0.0968 56.278-0.14496 84.416h-45.724c-0.22879-2.2331-0.45759-4.4663-0.68638-6.6994zm-13.566-134.84c-28.59-6.6266-40.713-45.565-21.667-67.59 16.296-21.865 52.746-20.23 67.496 2.4582 15.898 20.496 6.2164 52.692-17.278 62.584-8.8167 4.1986-19.134 5.2452-28.551 2.548zm-133.92-8.5429c-28.797-5.1177-45.729-41.744-29.705-66.694 13.937-26.098 54.279-29.901 72.608-6.5027 21.644 22.542 8.9143 63.855-20.627 72.129-7.1751 2.2694-14.914 2.5304-22.276 1.0671z"
                />
              </g>
            </svg>
          </div>
        </template>
      </HeaderProminent>
      <VContainer>
        <div class="__placer__ d-flex items-start gap-2 px-12">
          <VCardCompanyDisplay
            v-for="com in companiesNew"
            :key="com.id"
            :user="com"
          />
        </div>
      </VContainer>
    </div>

    <!-- novi proizvode -->
    <div class="__spacer__ mt-24" />
    <HeaderProminent
      class="mt-32 pb-5 text-medium-emphasis"
      :class="[566 < width ? 'ps-12' : 'ps-2']"
      text="Najnoviji ulistani proizvodi"
      :style="`font-size: ${
        777 < width
          ? '2.44rem'
          : 532 < width
          ? '2.22rem'
          : 420 < width
          ? '1.66rem'
          : 320 < width
          ? '1.22rem'
          : '1rem'
      }`"
    >
      <template #prepend>
        <VIcon
          style="font-size: 9.22rem"
          icon="$iconShine"
          class="opacity-30 ps-5 translate-y-5 translate-x-2"
          color="primary"
        />
      </template>
    </HeaderProminent>
    <!-- <VContainer class="mx-auto">
      <VRow dense>
        <VCol :sm="6" :md="4" v-for="p in productsLatest" :key="p.id">
          <CardProductDisplay @product-photos-change="noop" :product="p" />
        </VCol>
      </VRow>
    </VContainer> -->
    <VContainer fluid class="products--list">
      <VRow dense>
        <VCol
          :class="lgAndUp ? 'cols5' : undefined"
          :sm="4"
          :md="3"
          lg="auto"
          v-for="p in productsLatest"
          :key="p.id"
        >
          <CardProductDisplay @product-photos-change="noop" :product="p" />
        </VCol>
      </VRow>
    </VContainer>

    <!-- user help -->
    <VSpacer class="__spacer__ mt-40" />
    <div class="max-w-[1366px] mx-auto">
      <HeaderProminent
        class="mt-5 text-medium-emphasis"
        :class="[820 < width ? 'ps-10' : 'ps-0']"
        text="Prepoznatljiv proizvod"
        :style="`font-size: ${
          777 < width
            ? '2.55rem'
            : 555 < width
            ? '2.22rem'
            : 420 < width
            ? '1.55rem'
            : 370 < width
            ? '1.22rem'
            : '1rem'
        }`"
      >
        <template #append>
          <VSpacer />
          <div v-if="344 < width" class="scale-125 translate-y-2 me-10">
            <TopicChat
              color="on-primary"
              title="Korisnička podrška"
              topic="user-assist:web"
            />
          </div>
        </template>
        <template #prepend>
          <div class="__placer__ text-center" style="font-size: 11rem">
            <svg
              class="opacity-20 -translate-y-2 rotate-[-2deg] text-primary"
              width="1em"
              height="1em"
              viewBox="0 0 152.31 207.29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(-36.345 -8.8538)">
                <path
                  fill="currentColor"
                  d="m67.892 212.13c-1.3952-4.6191 2.1765-4.2712 5.6716-4 29.79 0.18051 59.597-0.44518 89.373 0.45611 6.8404-2.5577 12.214 9.0284 2.9312 7.0506-32.652 0.79369-65.317 0.39529-97.976 0.49329v-4zm9-39.75v-30.75h85v61.5h-85v-30.75zm66.448 8.3853c6.0593-7.0087 1.8526-19.88-8.3427-18.578-12.861-0.60782-26.078-1.1055-38.687 1.8704-5.88 4.5262-5.0523 18.625 4.2436 18.364 13.773 1.3736 28.042 2.0727 41.625-1.0053l1.1614-0.65079zm-49.448-47.015c1.6748-7.3693 16.938-1.5308 18.204-12.147 3.67-9.5353 3.2442-19.933 4.0395-29.973-9.1199-6.8233-17.756-14.322-24.92-23.221-6.7551-4.4435-16.091-4.9081-21.33-12.092-8.4177-9.2231-13.819-21.574-14.683-33.996 4.2839-7.2845 20.532 2.3688 20.691-8.238-0.80823-4.0181 0.39655-6.0109 4.6403-4.9464 27.287 0.16443 54.573 0.32885 81.86 0.49328-0.30849 5.2914 0.84278 11.573 7.9213 9.4988 9.3584-2.5856 17.21 3.6175 11.286 12.979-3.8837 14.787-13.386 30.739-29.624 33.669-10.426 6.36-16.8 17.797-27.464 23.995-3.289 8.4876-0.54251 18.569 0.0996 27.552 0.10664 11.328 11.704 12.388 19.927 13.874 1.0775 10.611-16.223 3.9594-22.829 5.9334-9.0911-0.50762-18.706 1.2149-27.418-1.4258l-0.34863-0.83835zm37.083-53.294c14.707-15.502 21.892-36.656 23.802-57.623-1.8065-5.4827-15.751-3.7776-11.909 4.4825-0.77678 20.595-6.1523 41.703-18.657 58.386 0.42033 2.2447 5.8568-4.7045 6.7649-5.2458zm-47.668-26.076c-3.9991-8.3769-5.6026-17.553-7.665-26.49-5.947-4.348-18.303-2.1546-11.257 7.1057 3.7115 9.4236 9.5996 19.314 19.579 22.915 1.0443-0.84764-0.62878-2.612-0.65678-3.5303zm76.22 0.89886c9.0737-6.5366 14.459-17.306 16.47-28.069-6.5739-2.9568-16.703-0.8036-14.981 8.6663-0.91512 7.3367-6.1079 16.014-6.1389 22.128 1.7299-0.57472 3.1742-1.7036 4.6493-2.7253zm-81.52 53.536c1.19-6.2656-13.897-5.9927-3.0276-9.3464 2.607-2.8891 4.4215-10.118 5.9067-1.8205 0.53732 3.3822 12.441 3.0008 5.452 5.0847-4.9481-0.69695-6.6861 11.727-8.3311 6.0822zm-31.44-18.045c2.3824-7.3396-17.634-7.0946-7.1765-10.64 8.1393 1.7196 7.681-18.939 11.579-6.2049-1.3353 6.6569 17.663 6.9719 6.4592 10.194-7.0668-1.9795-7.161 19.523-10.861 6.6504zm131.84-6.5787c-0.57031-5.0555-13.495-5.1762-3.374-7.7589 3.6621-1.6578 5.0566-11.525 6.8811-2.6847 1.5243 3.5434 12.062 4.4588 3.2944 6.5722-2.9422 0.14306-5.4144 11.586-6.8015 3.8714z"
                />
              </g>
            </svg>
          </div>
        </template>
      </HeaderProminent>

      <LightboxSlides :slides="slidesPromoMaterial">
        <template #activator="{ open: galleryOpen }">
          <VContainer class="mx-auto">
            <VRow>
              <!-- :cell-1 -->
              <VCol sm="4">
                <VSheet
                  @click="galleryOpen"
                  v-ripple
                  height="256"
                  color="transparent"
                  class="cursor-pointer position-relative overflow-hidden opacity-95 hover:opacity-100"
                  elevation="2"
                  id="bg-image--rHZRlaBLqOX"
                  rounded="lg"
                >
                  <div
                    class="bg-black/60 position-absolute bottom-0 inset-x-0 min-h-[55%] shadow pt-2"
                  >
                    <VSpacer class="mb-8" />
                    <VCardTitle
                      style="font-size: 120% !important"
                      class="text-center text-h5 !font-sans"
                    >
                      <h3 class="text-white">Onlajn prisustvo i obrt</h3>
                    </VCardTitle>
                    <VCardSubtitle
                      class="!text-white text-body-2 !font-mono text-end !opacity-50"
                    >
                      <VIcon icon="$iconPdf" />
                      <em class="align-bottom"> prezentacija.pdf </em>
                    </VCardSubtitle>
                  </div>
                </VSheet>
              </VCol>
              <!-- :cell-2 -->
              <VCol sm="4">
                <VSheet
                  @click="galleryOpen({ startIndex: 1 })"
                  v-ripple
                  height="256"
                  color="transparent"
                  class="cursor-pointer position-relative overflow-hidden opacity-95 hover:opacity-100"
                  elevation="2"
                  id="bg-image--Kqn6iKlGsN1zeu"
                  rounded="lg"
                >
                  <div
                    class="bg-black/60 position-absolute bottom-0 inset-x-0 min-h-[55%] shadow pt-2"
                  >
                    <VSpacer class="mb-8" />
                    <VCardTitle
                      style="font-size: 1.33rem !important"
                      class="text-center text-h5 !font-sans"
                    >
                      <h3 class="text-white" style="font-size: 81%">
                        Dobra reklama dobar proizvod
                      </h3>
                    </VCardTitle>
                    <VCardSubtitle
                      class="!text-white text-body-2 !font-mono text-end !opacity-50"
                    >
                      <VIcon icon="$iconPdf" />
                      <em class="align-bottom"> fotografija.pdf </em>
                    </VCardSubtitle>
                  </div>
                </VSheet>
              </VCol>
              <!-- :cell-3 -->
              <VCol sm="4">
                <VSheet
                  @click="galleryOpen({ startIndex: 2 })"
                  v-ripple
                  height="256"
                  color="transparent"
                  class="cursor-pointer position-relative overflow-hidden opacity-95 hover:opacity-100"
                  elevation="2"
                  id="bg-image--MwnPyfU7q"
                  rounded="lg"
                >
                  <div
                    class="bg-black/60 position-absolute bottom-0 inset-x-0 min-h-[55%] shadow pt-2"
                  >
                    <VSpacer class="mb-8" />
                    <VCardTitle
                      style="font-size: 1.33rem !important"
                      class="text-center text-h5 !font-sans"
                    >
                      <h3 class="text-white" style="font-size: 81%">
                        Priprema slika za sajt
                      </h3>
                    </VCardTitle>
                    <VCardSubtitle
                      class="-translate-y-[3px] !text-white text-body-2 !font-mono text-end !opacity-50"
                    >
                      <VIcon size="x-large" icon="$iconYotubeVideo" />
                      <em class="align-bottom"> Slike za web </em>
                    </VCardSubtitle>
                  </div>
                </VSheet>
              </VCol>
            </VRow>
          </VContainer>
        </template>
      </LightboxSlides>
    </div>

    <div class="__spacer__ mt-32" />
    <div class="max-w-[1492px] mx-auto">
      <HeaderProminent
        class="mt-20 pb-4 text-medium-emphasis"
        :class="[500 < width ? 'ps-12' : 'ps-0']"
        :text="
          355 < width
            ? 'Ovako su nas ocenili naši korisnici i kupci'
            : 'Ovako ste nas ocenili'
        "
        :style="`font-size: ${
          852 < width
            ? '2rem'
            : 612 < width
            ? '1.55rem'
            : 466 < width
            ? '1.22rem'
            : 388 < width
            ? '1rem'
            : '.88rem'
        }`"
      >
        <template #prepend>
          <svg
            style="font-size: 5.67rem"
            class="ms-5 opacity-20 translate-y-3 text-primary"
            width="1em"
            height="1em"
            viewBox="0 0 133.02 128.82"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(-13.488 -18.088)">
              <path
                stroke="currentColor"
                fill="currentColor"
                d="m63.077 145.7c-21.42-5.028-39.923-21.415-46.356-42.619-8.6254-25.803 0.33569-56.944 22.978-72.639 18.867-13.55 45.225-16.637 66.091-5.8316 24.842 12.029 40.859 40.821 35.968 68.297-0.64293 5.725-3.2614 11.134-4.5123 16.603 3.0499 11.07 7.1763 21.888 9.2671 33.184-0.68283 7.5403-10.478 1.9841-15.208 1.5276-7.5602-1.652-15.067-4.0762-22.825-4.4894-10.211 5.9798-22.55 6.9516-34.175 7.1794-3.766-0.0534-7.5593-0.30567-11.226-1.2124zm32.084-6.7589c6.3874-1.0104 11.639-7.5559 18.356-4.8339 8.1426 1.7308 16.139 4.4838 24.452 5.2306 4.2652-3.0563-2.416-10.744-2.4685-15.487-1.3289-5.0374-3.4181-10.106-4.3676-15.142 4.0151-10.405 7.1726-21.503 5.4427-32.756-3.6558-31.141-35.003-56.075-66.222-51.875-24.656 3.2019-47.077 23.132-50.328 48.27-4.4836 28.826 13.938 60.522 42.831 67.779 10.601 2.7678 21.892 2.0174 32.304-1.186z"
              />
            </g>
          </svg>
        </template>
      </HeaderProminent>
      <OverviewsFake />
    </div>

    <!-- mail-lista --prijava -->
    <div class="__spacer__ mt-40" />
    <div class="max-w-[1492px] mx-auto">
      <MailingListSave
        @email-saved="toggleEmailSaved.on"
        v-slot="{ save: mailSave }"
      >
        <HeaderProminent
          class="mt-8 text-medium-emphasis"
          :class="[355 < width ? 'ps-10' : 'ps-2']"
          text="Ostanite informisani"
          :style="`font-size: ${
            422 < width ? '2rem' : 292 < width ? '1.33rem' : '1rem'
          }`"
        >
          <template #prepend>
            <VIcon
              class="opacity-20 ms-5 rotate-[-2deg] -translate-y-2"
              style="font-size: 8rem"
              icon="$iconEnvelopeOpenHandDrawn"
              color="primary"
            />
          </template>
        </HeaderProminent>
        <VCol class="*bg-red !max-w-[912px]">
          <VContainer>
            <VRow
              :class="
                1022 < width ? '!ms-20' : 972 < width ? '!ms-10' : '!ms-0'
              "
            >
              <VCol md="6">
                <VCardText style="font-size: 106%" class="opacity-80">
                  Želim da povremeno dobijam obaveštenja o proizvodima i
                  uslugama na KANTAR.RS na ovu email adresu:
                </VCardText>
              </VCol>
              <VCol md="6">
                <VForm
                  @submit.prevent="mailSave(saveEmail$)"
                  autocomplete="off"
                  class="d-flex items-center"
                >
                  <VTextField
                    type="email"
                    name="save_email"
                    :prepend-icon="322 < width ? '$iconEmailAt' : undefined"
                    v-model.trim="saveEmail$"
                    variant="underlined"
                    clearable
                  />
                  <VBtn
                    class="ms-3"
                    :size="422 < width ? 'x-large' : undefined"
                    type="submit"
                    variant="text"
                    >ok</VBtn
                  >
                </VForm>
              </VCol>
            </VRow>
          </VContainer>
        </VCol>
      </MailingListSave>
    </div>
  </section>
</template>

<style scoped lang="scss">
#bg-image--rHZRlaBLqOX {
  background: white url("~/assets/images/prezentacija-demo.png");
  background-size: 155%;
  background-position: 20% 32%;
  background-repeat: no-repeat;
}
#bg-image--Kqn6iKlGsN1zeu {
  background: white url("~/assets/images/photography01.jpg");
  background-size: 152%;
  background-position: 33% 33%;
  background-repeat: no-repeat;
}
#bg-image--MwnPyfU7q {
  background: white url("~/assets/images/marketing-dm.jpg");
  background-size: 112%;
  background-position: 15% 59%;
  background-repeat: no-repeat;
}
</style>
