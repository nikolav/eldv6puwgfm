<script setup lang="ts">
import type { ICompanyProfile } from "@/types";
import { TOKEN_DEFAULT } from "@/config";
import {
  TopicRating,
  ProductSlideImage,
  LikeDislike,
  TopicChat,
} from "@/components/app";

definePageMeta({
  layout: "blank",
});

const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  docs: { TAG_COMPANY_PROFILE_prefix, COM_PHOTOS_prefix },
  key: { COM_LIKES_prefix, TOPIC_CHAT_COM_prefix, COM_RATING_prefix },
} = useAppConfig();

const auth = useStoreApiAuth();
const route = useRoute();

const { runSetup: setupUserDefault } = useRunSetupOnce(() =>
  auth.tokenPut(TOKEN_DEFAULT)
);
watchEffect(() => {
  if (auth.initialized$ && !auth.token$) setupUserDefault();
});

const uid_ = computed(() =>
  Number(last(String(get(route.query, "slug")).split("-")))
);
const { users } = useQueryUsers();
const { data: comProfile } = useDoc<ICompanyProfile>(
  `${TAG_COMPANY_PROFILE_prefix}${uid_.value}`
);
const comUser = computed(() => find(users.value, { id: String(uid_.value) }));
const { data: photos } = useDocs(`${COM_PHOTOS_prefix}${uid_.value}`);
const { products } = useProducts(uid_);
const { publicUrl } = useApiStorage(true, true);

const pageTitle = computed(() => get(comProfile.value, "data.name") || "");
useHead({
  title: pageTitle,
});
const comName_ = computed(() => get(comProfile.value, "data.name"));
const comOwner_ = computed(
  () =>
    `${get(comProfile.value, "data.ownerFirstName")} ${get(
      comProfile.value,
      "data.ownerLastName"
    )}`
);
const comAbout_ = computed(() => get(comProfile.value, "data.about"));
const comDeliver_ = computed(() => get(comProfile.value, "data.delivery"));
const comPin_ = computed(() => get(comProfile.value, "data.pin"));
const comTel_ = computed(() => get(comProfile.value, "data.phone"));
const comAddress_ = computed(() => get(comProfile.value, "data.address"));
const comDistrict_ = computed(() => get(comProfile.value, "data.district"));

// @@eos
</script>
<template>
  <section class="page--gazdinstvo:slug fill-height pa-0 ma-0">
    <VContainer fluid class="*bg-red fill-height">
      <!-- @row:main -->
      <VRow no-gutters class="*bg-lime fill-height">
        <!-- @panel:left -->
        <VCol cols="12" sm="7" class="*bg-orange">
          <VRow no-gutters class="fill-height">
            <!-- @panel:kontakt -->
            <VCol cols="12" sm="10">
              <VCard
                rounded="0"
                variant="flat"
                class="pa-0 pe-2 *bg-yellow mx-auto fill-height"
              >
                <template #prepend>
                  <TopicRating text :topic="`${COM_RATING_prefix}${uid_}`" />
                </template>
                <!-- @social -->
                <template #append>
                  <div class="d-flex items-center gap-6">
                    <TopicChat
                      :title="comName_"
                      :topic="`${TOPIC_CHAT_COM_prefix}${uid_}`"
                    />
                    <LikeDislike :topic="`${COM_LIKES_prefix}${uid_}`" />
                  </div>
                </template>
                <!-- @com:title name pin -->
                <div class="d-flex items-center justify-between px-2 mb-2">
                  <VCardTitle
                    ><h1 class="text-h4">
                      {{ comName_ }}
                    </h1></VCardTitle
                  >
                  <VCardSubtitle
                    ><VBadge inline color="primary-darken-1" rounded="lg">
                      <template #badge>
                        <small class="opacity-60">PG#</small>
                        <strong class="ms-1">{{ comPin_ }}</strong>
                      </template>
                    </VBadge></VCardSubtitle
                  >
                </div>
                <VRow dense class="*bg-red">
                  <VCol cols="12" sm="7">
                    <VSheet elevation="2" class="ma-1" rounded>
                      <VCardTitle class="indent-2">O nama</VCardTitle>
                      <VCardText
                        ><p>{{ comAbout_ }}</p></VCardText
                      >
                    </VSheet>
                  </VCol>
                  <VCol cols="12" sm="5" class="*bg-orange d-flex">
                    <VSheet elevation="2" class="ma-1 grow" rounded>
                      <VCardTitle class="indent-2">Dostava</VCardTitle>
                      <VCardText
                        ><p>{{ comDeliver_ }}</p></VCardText
                      >
                    </VSheet>
                  </VCol>
                </VRow>
                <VRow class="*mt-n2">
                  <VCol cols="12">
                    <!-- @sheet:contact -->
                    <VSheet
                      elevation="2"
                      class="ma-1 px-4 py-2 pt-3"
                      color="primary"
                      rounded
                    >
                      <VCardTitle class="indent-2">Kontakt</VCardTitle>
                      <VCardText class="space-y-4 mt-4">
                        <div class="d-flex items-center justify-between gap-6">
                          <VTextField
                            :model-value="comOwner_"
                            label="Gazda, Ime i Prezime"
                            variant="underlined"
                            readonly
                          />
                          <VTextField
                            type="tel"
                            :model-value="comTel_"
                            label="Telefon"
                            variant="underlined"
                            readonly
                          />
                        </div>
                        <div class="d-flex items-center justify-between gap-4">
                          <VTextField
                            :model-value="comAddress_"
                            label="Adresa gazdinstva"
                            variant="underlined"
                            readonly
                          />
                          <VTextField
                            :model-value="comDistrict_"
                            label="Okrug"
                            variant="underlined"
                            readonly
                          />
                        </div>
                      </VCardText>
                    </VSheet>
                  </VCol>
                </VRow>
              </VCard>
            </VCol>
            <!-- @products:track -->
            <VCol cols="12" sm="2">
              <VSheet
                class="!max-h-[96vh] fill-height border-opacity-100 border-primary scrollbar-thin-light overflow-auto"
                border="lg"
                rounded="lg"
                elevation="4"
                position="relative"
              >
                <VCardTitle
                  class="!text-sm text-center bg-primary d-block position-absolute w-100"
                  >Proizvodi</VCardTitle
                >
                <VDataIterator :items="products" :items-per-page="-1">
                  <template #default="{ items }">
                    <div class="space-y-3 pb-2 pt-14">
                      <ProductSlideImage
                        v-for="node in items"
                        :key="node.raw.id"
                        :publicUrl="publicUrl"
                        :product="node.raw"
                      />
                    </div>
                  </template>
                </VDataIterator>
              </VSheet>
            </VCol>
          </VRow>
        </VCol>
        <!-- @panel:right -->
        <VCol cols="12" sm="5" class="*bg-blue fill-height ps-3">
          <VHover>
            <template #default="{ isHovering, props }">
              <VCarousel
                v-if="!isEmpty(photos)"
                interval="8000"
                v-bind="props"
                continuous
                class="w-100 fill-height"
                :cycle="!isHovering"
                show-arrows="hover"
                hide-delimiters
              >
                <VCarouselItem
                  v-for="node in photos"
                  cover
                  :src="publicUrl(get(node, 'data.file_id'))"
                  :key="node.id"
                />
              </VCarousel>
              <VImg
                v-else
                class="w-100 fill-height"
                :src="DEFAULT_NO_PRODUCT_IMAGE_FOUND"
              />
            </template>
          </VHover>
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>
<style lang="scss" scoped>
</style>
