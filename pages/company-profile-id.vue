<script setup lang="ts">
import { useDisplay } from "vuetify";
import menuDistricts from "@/assets/districts-serbia.json";
import type { ICompanyProfile, IStorageFileInfo } from "@/types";
import { UserAvatarPicker } from "@/components/ui";

definePageMeta({
  layout: "company-profile",
  middleware: "authorized-company",
});

useHead({
  title: "Lična karta gazdinstva",
});
const tab$ = ref("kontakt");

const { smAndUp } = useDisplay();
const auth = useStoreApiAuth();
const toggleProfileSaved = useToggleFlag();
const toggleProfileUpdating = useToggleFlag();

const {
  key: { FORM_COMPANY_ID, APP_PROCESSING },
  docs: { TAG_COMPANY_PROFILE_prefix, COM_PHOTOS_prefix },
  com: { FIELDS },
  links: {
    external: { RPU: lnRPU },
  },
  io: { IOEVENT_COM_PHOTOS_CHANGE_prefix },
} = useAppConfig();
const appProcessing$ = useGlobalFlag(APP_PROCESSING);

const uid = get(auth.user$, "id");
const { data: comProfile, put: profileUpsert } = useDoc<ICompanyProfile>(
  `${TAG_COMPANY_PROFILE_prefix}${uid}`
);
const {
  form,
  dump: dumpFormData,
  valid: formValid,
} = useFormDataFields(
  FORM_COMPANY_ID,
  // all fields True()
  FIELDS.reduce((res, field) => {
    res[field] = True;
    return res;
  }, <Record<string, any>>{})
);
watchEffect(() => {
  form.slug.value = toLower(
    words(form.name.value).concat(String(uid)).join("-")
  );
});
// fill fields @init
const formDataInitFromStore = () => {
  forEach(FIELDS, (field) => {
    form[field].value = get(comProfile.value, `data.${field}`) || "";
  });
};
const { runSetup: formInit } = useRunSetupOnce(formDataInitFromStore);
onMounted(() => {
  watch(comProfile, formInit);
});

const submitFormCompanyId = async () => {
  if (!formValid.value) return;
  let error_;
  try {
    toggleProfileUpdating.on();
    await profileUpsert(dumpFormData());
  } catch (error) {
    error_ = error;
  }
  if (!error_) toggleProfileSaved.on();
  toggleProfileUpdating.off();
};

// # com.photos
const comImage$ = ref();
const resetComImage = () => {
  comImage$.value = [];
};
const tag_COM_PHOTOS = `${COM_PHOTOS_prefix}${uid}`;
const { upload, publicUrl, remove, IO } = useApiStorage();
const {
  data: comPhotos$,
  tags,
  reload,
} = useDocs<IStorageFileInfo>(tag_COM_PHOTOS);
watchEffect(() => useIOEvent(IO.value, reload));
useIOEvent(`${IOEVENT_COM_PHOTOS_CHANGE_prefix}${uid}`, reload);

const carouselCurrent$ = ref();
const submitComImageUpload = async () => {
  let err_;
  let resUpload;
  let id;

  const file = get(comImage$.value, "[0]");
  if (!file) return;

  try {
    appProcessing$.value = true;
    resUpload = await upload({
      image: {
        file,
        data: {},
      },
    });
    id = Number(get(resUpload, "image.id"));
    if (!id) throw "--submitComImageUpload:no-id";
    // image uploaded; bind `doc-tag`
    await tags(id, { [tag_COM_PHOTOS]: true });
  } catch (error) {
    err_ = error;
    console.error(error);
  }

  if (!err_) {
    resetComImage();
    carouselCurrent$.value = get(resUpload, "image.data.file_id");
  }

  appProcessing$.value = false;
};

const comPhotosRemove = async () => {
  if (!carouselCurrent$.value) return;

  let err_;
  let resRm;

  try {
    appProcessing$.value = true;
    resRm = await remove(carouselCurrent$.value);
  } catch (error) {
    err_ = error;
    console.error(error);
    // pass
  }
  if (!err_) {
    // drop `doc-tag` link
    await tags(Number(get(resRm, "data.storageRemoveFile.file.id")), {
      [tag_COM_PHOTOS]: false,
    });
    // rm:success; set random current slide
    // @nextpaint, await io
    await nextTick(() => {
      if (!isEmpty(comPhotos$.value)) {
        carouselCurrent$.value = get(sample(comPhotos$.value), "data.file_id");
      }
    });
  }
  appProcessing$.value = false;
};

const comName = computed(() => get(comProfile.value, "data.name"));
const comPagePublicUrl_ = useCompanyPublicUrl(uid, comName);
watchEffect(() => {
  console.log({ uid, comName: comName.value });
});

// @@eos
</script>
<template>
  <section class="page--company-profile-id px-2 px-sm-8">
    <!-- @@todo, reuse component -->
    <!-- @status: --profile-saved -->
    <VSnackbar
      variant="text"
      color="transparent"
      @update:model-value="
        (val) => {
          if (!val) toggleProfileSaved.off();
        }
      "
      v-model="toggleProfileSaved.isActive.value"
    >
      <VAlert type="success" prominent elevation="4">
        <template #append>
          <VBtn
            @click="toggleProfileSaved.off"
            icon
            variant="plain"
            color="on-success"
          >
            <VIcon icon="$close" />
          </VBtn>
        </template>
        <strong> Profil je uspešno sačuvan. </strong>
      </VAlert>
    </VSnackbar>

    <!-- @form: --start -->
    <VForm @submit.prevent="submitFormCompanyId">
      <VCard max-width="812" class="*bg-red mx-auto mt-2 mt-md-8">
        <VCardTitle class="bg-primary pa-4 px-6 d-flex items-center">
          <h2 v-if="smAndUp" class="ms-1 *text-center text-h5 !font-sans">
            <NuxtLink :to="comPagePublicUrl_" external target="_blank">
              <a
                class="d-inline-block transition-transform hover:scale-105 underline underline-offset-4 tracking-wide"
                >Lična karta gazdinstva</a
              ><VIcon
                size="28"
                end
                icon="$iconExternalLink"
                class="opacity-40 translate-y-px ms-4"
              />
            </NuxtLink>
          </h2>
          <NuxtLink v-else :to="comPagePublicUrl_" external target="_blank">
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
            color="primary-darken-1"
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
        <VCardText class="pt-2 *min-h-[302px] pb-1 *bg-red">
          <VWindow v-model="tab$" mandatory class="overflow-visible" continuous>
            <VFadeTransition mode="in-out" leave-absolute>
              <!-- @@window.contact -->
              <VWindowItem value="kontakt">
                <div class="px-sm-2 px-md-8 sm:space-y-4">
                  <div class="d-sm-flex items-baseline justify-between ga-4">
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

                  <div class="d-sm-flex items-baseline justify-between ga-4">
                    <VTextField
                      name="name"
                      v-model="form.name.value"
                      variant="underlined"
                      label="Naziv gazdinstva"
                      clearable
                      :class="smAndUp ? '!grow-[1.122]' : undefined"
                    >
                      <template v-if="smAndUp" #prepend>
                        <VIcon
                          color="primary-darken-2"
                          icon="$iconDowntown"
                          size="x-large"
                          start
                        />
                      </template>
                    </VTextField>
                    <VTextField
                      name="pin"
                      v-model="form.pin.value"
                      variant="underlined"
                      label="Broj PG"
                      clearable
                    >
                      <template #prepend-inner>
                        <pre class="text-disabled text-sm">#</pre>
                      </template>
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

                  <div class="d-sm-flex items-end justify-between ga-4">
                    <!-- @@ https://www.wikiwand.com/sr/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BD%D0%B8_%D0%BE%D0%BA%D1%80%D1%83%D0%B7%D0%B8_%D0%A1%D1%80%D0%B1%D0%B8%D1%98%D0%B5 -->
                    <VSelect
                      v-model="form.district.value"
                      center-affix
                      label="Okrug *"
                      :items="menuDistricts"
                      variant="solo"
                      :class="smAndUp ? 'max-w-[33%]' : undefined"
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
                        />
                      </template>
                    </VSelect>

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
                  <div class="d-flex items-center justify-between gap-4">
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
                        />
                      </template>
                    </VTextField>
                  </div>
                </div>
              </VWindowItem>
            </VFadeTransition>

            <!-- @@window:fotografije -->
            <VFadeTransition mode="in-out" leave-absolute>
              <VWindowItem value="fotografije">
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
                      :src="publicUrl(node.data.file_id)"
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
            </VFadeTransition>

            <!-- @@window:dostava -->
            <VFadeTransition mode="in-out" leave-absolute>
              <VWindowItem value="dostava">
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
                      />
                    </template>
                  </VTextarea>
                </div>
              </VWindowItem>
            </VFadeTransition>

            <!-- @@window:istorija -->
            <VFadeTransition mode="in-out" leave-absolute>
              <VWindowItem value="istorijat">
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
                      />
                    </template>
                  </VTextarea>
                </div>
              </VWindowItem>
            </VFadeTransition>
          </VWindow>
        </VCardText>
        <VCardActions class="pa-4 mt-2">
          <VBtn
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
            class="px-4 px-sm-6"
            color="primary-darken-1"
            :size="smAndUp ? 'x-large' : undefined"
            variant="tonal"
            type="submit"
            :disabled="toggleProfileUpdating.isActive.value"
            :loading="toggleProfileUpdating.isActive.value"
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
<style lang="scss" scoped>
</style>
