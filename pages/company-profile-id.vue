<script setup lang="ts">
import { useDisplay } from "vuetify";
import menuDistricts from "@/assets/districts-serbia.json";
import type { ICompanyProfile, IStorageFileInfo } from "@/types";
import { UserAvatarPicker, VSnackbarStatusMessage } from "@/components/ui";

// defs
definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});
useHead({
  title: "Lična karta gazdinstva",
});
const {
  com: { FIELDS },
  links: {
    external: { RPU: lnRPU },
  },
  io: { IOEVENT_COM_PHOTOS_CHANGE_prefix },
} = useAppConfig();

// stores
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const { authProfile, userPhotos } = useTopics();
const {
  data: comProfile,
  commit: profileUpsert,
  loading: profileProcessing,
} = useDoc<ICompanyProfile>(() => authProfile(uid.value));

// # handle com photos
const tag_COM_PHOTOS = computed(() => userPhotos(uid.value));
const { upload, remove, IO } = useApiStorage();
const {
  data: comPhotos$,
  tags,
  reload,
} = useDocs<IStorageFileInfo>(tag_COM_PHOTOS);

const ioeventPhotosChange = computed(() =>
  uid.value ? `${IOEVENT_COM_PHOTOS_CHANGE_prefix}${uid.value}` : ""
);
watchEffect(() => useIOEvent(IO.value, reload));
watchEffect(() => useIOEvent(ioeventPhotosChange.value, reload));

// flags
const toggleProfileSaved = useToggleFlag();

const pc1 = useProcessMonitor();
const { watchProcessing } = useStoreAppProcessing();
watchProcessing(() => pc1.processing.value);

// refs
const tab$ = ref("kontakt");
const comName = computed(() => get(comProfile.value, "data.name"));
const comPagePublicUrl = useCompanyPublicUrl(() => uid.value, comName);
// refs:carousel
const carouselCurrent$ = ref();
const comImage$ = ref();

// utils
const { smAndUp } = useDisplay();
const {
  form,
  dump: dumpFormData,
  valid: formValid,
} = useFormDataFields(
  "byKq66p1JWSlZ11RkVG",
  // all *True
  FIELDS.reduce((res, field) => {
    res[field] = True;
    return res;
  }, <Record<string, any>>{})
);

// handlers, helpers
// fill fields @init
const formDataInitFromStore = () => {
  forEach(FIELDS, (field) => {
    form[field].value = get(comProfile.value, `data.${field}`) || "";
  });
};
const resetComImage = () => {
  comImage$.value = [];
};
const submitFormCompanyId = async () => {
  if (!formValid.value) return;
  try {
    pc1.begin();
    await profileUpsert(dumpFormData());
  } catch (error) {
    pc1.setError(error);
  } finally {
    pc1.done();
  }
  if (!pc1.error.value) {
    pc1.successful();
    toggleProfileSaved.on();
  }
};

const submitComImageUpload = async () => {
  let resUpload;
  let imgID;

  const file = get(comImage$.value, "[0]");
  if (!file) return;

  try {
    pc1.begin();
    resUpload = await upload({
      image: {
        file,
        data: {},
      },
    });
    imgID = Number(get(resUpload, "image.id"));
    if (!imgID) throw "--submitComImageUpload:no-id";
    // image uploaded; bind `doc-tag`
    await tags(imgID, { [tag_COM_PHOTOS.value]: true });
  } catch (error) {
    pc1.setError(error);
  } finally {
    pc1.done();
  }

  if (!pc1.error.value) {
    resetComImage();
    carouselCurrent$.value = get(resUpload, "image.data.file_id");
    pc1.successful();
  }
};

const comPhotosRemove = async () => {
  if (!carouselCurrent$.value) return;

  let resRm;

  try {
    pc1.begin();
    resRm = await remove(carouselCurrent$.value);
  } catch (error) {
    pc1.setError(error);
  } finally {
    pc1.done();
  }
  if (!pc1.error.value) {
    // drop `doc-tag` link
    await tags(Number(get(resRm, "data.storageRemoveFile.file.id")), {
      [tag_COM_PHOTOS.value]: false,
    });
    // rm:success; set random current slide
    // @nextpaint, await io
    await nextTick(() => {
      if (!isEmpty(comPhotos$.value)) {
        carouselCurrent$.value = get(sample(comPhotos$.value), "data.file_id");
      }
    });
    pc1.successful();
  }
};

// watch
const { runSetup: formInit } = useRunSetupOnce(formDataInitFromStore);
onMounted(() => {
  watch(comProfile, formInit);
});
// onceMountedOn(comProfile, formDataInitFromStore);

watchEffect(() => {
  form.slug.value = toLower(
    words(form.name.value).concat(String(uid.value)).join("-")
  );
});

// @@eos
</script>
<template>
  <section class="page--company-profile-id px-2 px-sm-8">
    <!-- @status --profile-saved -->
    <VSnackbarStatusMessage v-model="toggleProfileSaved.isActive.value">
      <p class="text-center" style="font-size: 1rem">
        <strong> Profil je uspešno sačuvan. </strong>
      </p>
    </VSnackbarStatusMessage>

    <!-- @form: --start -->
    <VForm @submit.prevent="submitFormCompanyId">
      <VCard
        max-width="912"
        rounded="t-lg"
        class="*bg-red mx-auto mt-2 mt-md-8"
      >
        <VCardTitle class="bg-primary pa-5 px-6 d-flex items-center">
          <h2 v-if="smAndUp" class="ms-1 text-h5 !font-sans">
            <NuxtLink :to="comPagePublicUrl" external target="_blank">
              <a
                class="d-inline-block transition-transform hover:scale-105 underline underline-offset-4 tracking-wide"
                >Lična karta gazdinstva</a
              ><VIcon
                :size="24"
                end
                icon="$iconExternalLink"
                class="opacity-30 translate-y-px ms-4"
              />
            </NuxtLink>
          </h2>
          <NuxtLink v-else :to="comPagePublicUrl" external target="_blank">
            <VBtn color="on-primary" icon variant="text">
              <VIcon icon="$iconDowntown" />
            </VBtn>
          </NuxtLink>
          <VSpacer />
          <!-- user avatar -->
          <UserAvatarPicker />
        </VCardTitle>
        <VCardItem class="*bg-red">
          <!-- @@tabs -->
          <VTabs
            show-arrows
            mandatory
            v-model="tab$"
            fixed-tabs
            color="primary"
            align-tabs="center"
            class="*mt-sm-2"
          >
            <VTab value="kontakt">
              <span>Konakt</span>
            </VTab>
            <VTab value="dostava">
              <span>Dostava</span>
            </VTab>
            <VTab value="fotografije">
              <span>Galerija</span>
            </VTab>
            <VTab value="istorijat">
              <span>O nama</span>
            </VTab>
          </VTabs>
        </VCardItem>
        <VCardText class="pt-5">
          <VWindow v-model="tab$" mandatory class="overflow-visible" continuous>
            <!-- @@window.contact -->
            <VWindowItem
              reverse-transition="fade-transition"
              transition="fade-transition"
              value="kontakt"
            >
              <div class="px-sm-2 px-md-5 sm:space-y-3">
                <!-- row:1 -->
                <div class="d-sm-flex items-baseline justify-between ga-5">
                  <VTextField
                    v-model="form.ownerFirstName.value"
                    name="ownerFirstName"
                    variant="underlined"
                    label="Gazda, Ime"
                    clearable
                  >
                    <template v-if="smAndUp" #prepend>
                      <VIcon
                        color="primary-darken-2"
                        icon="$iconOwner"
                        size="x-large"
                        start
                        class="!opacity-20"
                      />
                    </template>
                  </VTextField>
                  <VTextField
                    v-model="form.ownerLastName.value"
                    name="ownerLasttName"
                    variant="underlined"
                    label="Prezime"
                    clearable
                  />
                </div>

                <!-- row:2 -->
                <div class="d-sm-flex items-baseline justify-between ga-5">
                  <VTextField
                    name="name"
                    v-model="form.name.value"
                    variant="underlined"
                    label="Naziv gazdinstva"
                    clearable
                    :class="smAndUp ? '!grow-[2]' : undefined"
                  >
                    <template v-if="smAndUp" #prepend>
                      <VIcon
                        color="primary-darken-2"
                        icon="$iconDowntown"
                        size="x-large"
                        start
                        class="!opacity-20"
                      />
                    </template>
                  </VTextField>

                  <!-- @@pib -->
                  <VTextField
                    name="pib"
                    v-model="form.pib.value"
                    variant="underlined"
                    label="PIB"
                    clearable
                    prefix="#"
                  />

                  <!-- @pin -->
                  <VTextField
                    name="pin"
                    v-model="form.pin.value"
                    variant="underlined"
                    label="Broj PG"
                    clearable
                    prefix="#"
                  >
                    <template v-if="smAndUp" #append>
                      <NuxtLink
                        :to="lnRPU"
                        external
                        target="_blank"
                        class="position-absolute text-disabled"
                      >
                        <VIcon
                          size="small"
                          icon="$iconHelpCircle"
                          class="cursor-pointer"
                        />
                      </NuxtLink>
                    </template>
                  </VTextField>
                </div>

                <!-- row:3 -->
                <div class="d-sm-flex items-end justify-between ga-5">
                  <!-- @@ https://www.wikiwand.com/sr/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BD%D0%B8_%D0%BE%D0%BA%D1%80%D1%83%D0%B7%D0%B8_%D0%A1%D1%80%D0%B1%D0%B8%D1%98%D0%B5 -->
                  <VSelect
                    v-model="form.district.value"
                    center-affix
                    label="Okrug *"
                    :items="menuDistricts"
                    variant="solo"
                    :class="smAndUp ? 'max-w-[30%]' : undefined"
                  >
                    <template #item="{ item, props }">
                      <VListSubheader
                        v-if="item.raw.subheader"
                        :title="item.raw.title"
                      />
                      <VListItem
                        v-bind="props"
                        v-else
                        :title="item.raw.title"
                      />
                    </template>
                    <template v-if="smAndUp" #prepend>
                      <VIcon
                        start
                        size="large"
                        color="primary-darken-2"
                        icon="$iconLocation"
                        class="!opacity-20"
                      />
                    </template>
                  </VSelect>

                  <VTextField
                    name="city"
                    v-model="form.city.value"
                    variant="underlined"
                    label="Mesto"
                    clearable
                    :class="smAndUp ? '!grow-[.5]' : undefined"
                  />
                  <VTextField
                    name="address"
                    v-model="form.address.value"
                    variant="underlined"
                    label="Adresa"
                    clearable
                  >
                    <template v-if="false" #prepend>
                      <VIcon
                        color="primary-darken-2"
                        icon="$iconLocation"
                        size="x-large"
                        start
                      />
                    </template>
                  </VTextField>
                </div>
                <div class="d-flex items-center justify-between gap-5">
                  <VTextField
                    name="phone"
                    v-model="form.phone.value"
                    variant="underlined"
                    label="Telefon"
                    clearable
                  >
                    <template v-if="smAndUp" #prepend>
                      <VIcon
                        color="primary-darken-2"
                        icon="$iconPhone"
                        size="x-large"
                        class="!opacity-20"
                      />
                    </template>
                  </VTextField>
                  <VTextField
                    name="facebook_link"
                    v-model="form.facebook.value"
                    variant="underlined"
                    label="Facebook"
                    clearable
                  >
                    <template v-if="smAndUp" #prepend>
                      <VIcon
                        color="primary-darken-2"
                        icon="$iconFacebook"
                        size="x-large"
                        class="!opacity-20"
                      />
                    </template>
                  </VTextField>
                  <VTextField
                    name="instagram_link"
                    v-model="form.instagram.value"
                    variant="underlined"
                    label="Instagram"
                    clearable
                  >
                    <template v-if="smAndUp" #prepend>
                      <VIcon
                        color="primary-darken-2"
                        icon="$iconInstagram"
                        size="x-large"
                        class="!opacity-20"
                      />
                    </template>
                  </VTextField>
                </div>
              </div>
            </VWindowItem>

            <!-- @@window:fotografije -->
            <VWindowItem
              value="fotografije"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <VForm
                @submit.prevent="submitComImageUpload"
                autocomplete="off"
                class="mx-auto max-w-[591px]"
              >
                <VFileInput
                  center-affix
                  density="compact"
                  v-model="comImage$"
                  name="com_image"
                  variant="solo-filled"
                  rounded
                  show-size
                  chips
                  prepend-icon=""
                  clearable
                >
                  <template v-if="smAndUp" #prepend>
                    <VIcon
                      class="!opacity-40 -rotate-2"
                      size="x-large"
                      icon="$iconImage"
                    />
                  </template>
                  <template #append>
                    <VBtn
                      rounded
                      type="submit"
                      variant="tonal"
                      color="primary-darken-1"
                      :size="smAndUp ? 'large' : undefined"
                    >
                      <VIcon
                        size="large"
                        :start="smAndUp"
                        icon="$iconCloudUp"
                      />
                      <strong v-if="smAndUp">Postavi</strong>
                    </VBtn>
                  </template>
                </VFileInput>
              </VForm>
              <VSheet elevation="2">
                <VCarousel
                  :height="smAndUp ? 333 : 256"
                  color="primary-darken-2"
                  hide-delimiter-background
                  v-model="carouselCurrent$"
                  continuous
                >
                  <VCarouselItem
                    v-for="node in comPhotos$"
                    :key="node.data.file_id"
                    :src="resourceUrl(node.data.file_id)"
                    :value="node.data.file_id"
                  >
                    <div
                      class="!h-fit *bg-red position-absolute top-0 inset-0 d-flex items-center *opacity-50 pa-1"
                    >
                      <VSpacer />
                      <VBtn
                        @click="comPhotosRemove"
                        icon
                        variant="text"
                        color="error"
                      >
                        <VIcon icon="$iconTrash" />
                      </VBtn>
                    </div>
                  </VCarouselItem>
                </VCarousel>
              </VSheet>
            </VWindowItem>

            <!-- @@window:dostava -->
            <VWindowItem
              value="dostava"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="px-sm-2 px-md-16 sm:space-y-4">
                <VTextarea
                  rows="8"
                  name="delivery"
                  v-model="form.delivery.value"
                  variant="underlined"
                  center-affix
                  clearable
                  label="Opis načina dostave do kupaca"
                >
                  <template v-if="smAndUp" #prepend>
                    <VIcon
                      icon="$iconDeliveryTruck"
                      size="42"
                      color="primary-darken-2"
                      start
                      class="!opacity-20"
                    />
                  </template>
                </VTextarea>
              </div>
            </VWindowItem>

            <!-- @@window:istorija -->
            <VWindowItem
              value="istorijat"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="px-sm-2 px-md-16 sm:space-y-4">
                <VTextarea
                  rows="8"
                  name="about"
                  v-model="form.about.value"
                  variant="underlined"
                  center-affix
                  clearable
                  label="Istorijat, o nama, ukratko o našim proizvodima..."
                >
                  <template v-if="smAndUp" #prepend>
                    <VIcon
                      icon="$iconBook"
                      size="x-large"
                      color="primary-darken-2"
                      start
                      class="!opacity-20"
                    />
                  </template>
                </VTextarea>
              </div>
            </VWindowItem>
          </VWindow>
        </VCardText>

        <VCardActions class="pa-4 px-sm-12 pb-sm-8">
          <VBtn
            rounded
            @click="formDataInitFromStore"
            class="px-4 px-sm-6"
            color="secondary-lighten-1"
            :size="smAndUp ? 'x-large' : undefined"
            variant="text"
          >
            <VIcon
              :size="smAndUp ? 'large' : undefined"
              :start="smAndUp"
              icon="$iconEraser"
            />
            <strong v-if="smAndUp">Poništi</strong>
          </VBtn>
          <VSpacer />
          <VBtn
            rounded
            class="px-4 px-sm-6"
            color="primary-darken-1"
            :size="smAndUp ? 'x-large' : undefined"
            variant="tonal"
            type="submit"
            :disabled="profileProcessing"
            :loading="profileProcessing"
          >
            <VIcon
              :size="smAndUp ? 'large' : undefined"
              :start="smAndUp"
              icon="$iconSave"
            />
            <strong v-if="smAndUp">Sačuvaj</strong>
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
