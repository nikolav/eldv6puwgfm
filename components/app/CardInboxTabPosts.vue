<script setup lang="ts">
// import { Dump } from "@/components/dev";
import {
  FilePicker,
  VSnackbarStatusMessage,
  LightboxSlides,
} from "@/components/ui";
import { PostsItem } from "@/components/app";

const auth = useStoreApiAuth();
const uid_ = computed(() => get(auth.user$, "id"));
const {
  posts,
  upsert: postsUpsert,
  remove: postsRemove,
  reload: postsReload,
} = useQueryPosts(uid_);

// @@quill:setup
const editor = useQuillEditor("#editorMyyL2ThnLsV", {
  bounds: "#quill--bounds",
  placeholder: "Moja priča...\n\n",
});

const title_ = ref();
const fileSelected$ = ref();
const upl = useProcessMonitor();

// toggle alert:status:saved
//  auto set @upload:success
//   reset at confirm
const postSaved$ = computed({
  get: () => !upl.processing.value && upl.success.value,
  set: (flag: boolean) => (upl.success.value = flag),
});
watch(postSaved$, (saved) => {
  if (saved) {
    // reset flag @success:saved
    fileSelected$.value = undefined;
  }
});

const { watchProcessing } = useStoreAppProcessing();
watchProcessing(() => upl.processing.value);

const postIdSelected$ = ref();
const storyTitleSaved$ = ref();
const storyPublicUrl$ = useStoryPublicUrl(postIdSelected$, storyTitleSaved$);
const storyImageRemoved$ = ref(false);
const {
  // image: storyImage,
  dropImages: storyImagesDrop,
  reload: storyImagesReload,
  update: storyImageUpdate,
  src: storyImageSrc,
} = useStoryImage(postIdSelected$);
const { submit } = useFormDataFields(
  "QuillEditor:CbmEHEEF",
  {
    // title: (value: string) => 1 < value?.length,
  },
  // @@
  {
    onSubmit: async () => {
      // @@todo reuse component
      editor.getContent(
        async ({ text, content }: { text: string; content: any }) => {
          if (!text) return;
          if (!title_.value) return;

          let postId;

          try {
            upl.begin();
            if (storyImageRemoved$.value) await storyImagesDrop();
            postId = Number(
              get(
                await postsUpsert(
                  {
                    title: title_.value,
                    content: JSON.stringify(content),
                  },
                  postIdSelected$.value
                ),
                "data.postsUpsert.id"
              )
            );
            if (!postId) throw "--error-post-failed";
            storyTitleSaved$.value = title_.value;
            postIdSelected$.value = postId;

            if (fileSelected$.value) {
              await nextTick();
              await storyImageUpdate(fileSelected$.value);
            }
          } catch (error) {
            upl.setError(error);
          } finally {
            upl.done();
          }
          if (!upl.error.value) upl.successful();
        }
      );
    },
  }
);

const toggleMenuPostsList = useToggleFlag();

const postsCount = computed(() => posts.value?.length);
const postSelected$ = computed(() =>
  find(posts.value, { id: postIdSelected$.value })
);
watchEffect(() => {
  if (!postIdSelected$.value) return;
  title_.value = postSelected$.value?.title || title_.value;
  const jsondata = postSelected$.value?.content;
  if (jsondata) editor.setContent(JSON.parse(jsondata));
});
watch(postIdSelected$, (ppid) => {
  // new story loaded; release flag
  if (ppid) storyImageRemoved$.value = false;
});

// show image if not manualy removed from filepicker
const fallbackUrl_ = computed(() =>
  !(!storyImageRemoved$.value && postIdSelected$.value)
    ? undefined
    : storyImageSrc.value
);

// clear fields from new post
const clearStory = () => {
  postIdSelected$.value = undefined;
  storyImageRemoved$.value = false;
  fileSelected$.value = undefined;
  editor.clear();
  title_.value = undefined;
};

// @@
const postEditOnClick = (ppid: number) => {
  setTimeout(toggleMenuPostsList.off, 22);
  postIdSelected$.value = ppid;
  fileSelected$.value = null;
  storyImageRemoved$.value = false;
};

// watchEffect(() => {
//   console.clear();
//   console.log({ postIdSelected$: postIdSelected$.value });
//   console.log({ storyImageRemoved$: storyImageRemoved$.value });
//   console.log({ image: storyImage.value });
//   console.log({ fallbackUrl_: fallbackUrl_.value });
//   console.log({ fileSelected$: fileSelected$.value });
// });
// @@eos
</script>
<template>
  <VCard class="component--CardInboxTabPosts" min-height="412">
    <!-- @signal:order-sent -->
    <VSnackbarStatusMessage v-model="postSaved$">
      <p class="text-center ps-1" style="font-size: 133%">
        <NuxtLink
          :to="storyPublicUrl$"
          external
          target="_blank"
          class="d-flex items-center text-truncate"
        >
          <a class="text-decoration-underline"> 📃 {{ storyTitleSaved$ }} </a>
        </NuxtLink>
      </p>
    </VSnackbarStatusMessage>

    <VForm class="*bg-red" @submit.prevent="submit" autocomplete="off">
      <div class="!grid grid-cols-[1fr,222px] *bg-red-200 min-h-[402px]">
        <!-- @@col.post -left -->
        <div
          class="*bg-red pb-3 ms-3 min-h-[262px] !max-h-[442px] overflow-auto scrollbar-thin-light relative"
        >
          <!-- @@btn:about -->
          <VBtn
            position="absolute"
            class="top-0 end-2 z-[1]"
            variant="plain"
            size="small"
            color="info"
            icon
            density="comfortable"
          >
            <VIcon :size="25" icon="$iconHelpCircle" />
            <VMenu
              activator="parent"
              open-on-hover
              open-delay="345"
              location="bottom end"
            >
              <VSheet
                elevation="3"
                max-width="320"
                min-width="245"
                class="pa-3 max-w-[320px] min-h-[122px] pb-6"
              >
                <LightboxSlides
                  :slides="[
                    {
                      src: '/price-pomoc.mp4',
                    },
                  ]"
                >
                  <template #activator="{ open: helpOpen }">
                    <VBtn
                      @click="helpOpen"
                      class="position-absolute top-2 end-2"
                      variant="tonal"
                      size="large"
                      icon
                      style="font-size: 128%"
                    >
                      <strong> 🎥 </strong>
                      <VTooltip
                        text="Kako da upravljam pričama? Pogledaj kratko video uputstvo..."
                        activator="parent"
                        open-delay="345"
                        location="bottom"
                      />
                    </VBtn>
                  </template>
                </LightboxSlides>
                <div class="!text-sm pa-1">
                  <p
                    style="font-size: 166%"
                    class="text-xl tracking-widest pa-3"
                  >
                    📣 🏆 📜 🥳
                  </p>
                  <p class="prose indent-4">
                    <em
                      style="font-size: 122% !important"
                      class="!italic text-body-2 text-mono"
                      >Priče</em
                    >
                    možete da iskoristite da istaknete akciju, najavite značajne
                    događaje, pišete blog ili kraće članke. Generalno, za
                    sadržaj promotivne prirode... Uključuje i prateću sliku.
                  </p>
                </div>
              </VSheet>
            </VMenu>
          </VBtn>

          <!-- @@title -->
          <VTextField
            v-model="title_"
            clearable
            label="Naslov *"
            variant="underlined"
            class="ms-4 w-[91%] *mx-auto mt-5 *bg-red"
            hint="Treba da sadrži ključne reči, može da pomogne u pretrazi..."
          >
            <template #prepend>
              <VIcon
                size="large"
                class="!opacity-20"
                start
                icon="$iconFeather"
              />
            </template>
          </VTextField>

          <!-- @@editor quill -->
          <div class="mt-5 me-1 *bg-red" id="quill--bounds">
            <section
              id="editorMyyL2ThnLsV"
              class="fill-height border-0 border-s"
              style="font-size: 125%"
            />
          </div>
        </div>

        <!-- @@col.images -->
        <div class="*bg-lime-200">
          <div class="FilePicker--placer px-2 mt-12 d-flex justify-center">
            <FilePicker
              @fallback-image-removed="storyImageRemoved$ = true"
              v-model="fileSelected$"
              :fallback="fallbackUrl_"
            />
          </div>
        </div>
      </div>
      <VCardActions class="mt-6">
        <VSpacer />
        <!-- @@menu manage post -->
        <VBtn
          @click="clearStory"
          class="me-4"
          icon
          size="large"
          color="on-surface"
          variant="elevated"
          elevation="4"
        >
          <VIcon icon="$plus" size="38" />
          <VTooltip activator="parent" open-delay="345" location="bottom">
            <em>Nova priča</em>
          </VTooltip>
        </VBtn>
        <VBtn
          class="me-4"
          icon
          size="large"
          color="on-surface"
          variant="elevated"
          elevation="5"
        >
          <VBadge
            :model-value="!isEmpty(posts)"
            :content="postsCount"
            color="info-darken-1"
            offset-x="-4"
            offset-y="-4"
          >
            <VIcon icon="$menu" size="33" />
          </VBadge>
          <VTooltip activator="parent" open-delay="345" location="bottom">
            <em>Moje priče...</em>
          </VTooltip>

          <!-- @@ -->
          <!-- manage posts, popup -->
          <VMenu
            class="rounded-lg"
            location="center"
            :close-on-content-click="false"
            activator="parent"
            v-model="toggleMenuPostsList.isActive.value"
          >
            <VCard
              border="b-lg"
              rounded="lg"
              class="*pa-4 border-surface"
              position="relative"
            >
              <!-- @@ posts toolbar  -->
              <VToolbar
                elevation="2"
                color="primary"
                absolute
                class="ps-4 top-0 inset-x-0 z-[1]"
              >
                <VIcon class="opacity-30" icon="$iconPage" />
                <VToolbarTitle class="opacity-80 me-0"
                  >Moje priče</VToolbarTitle
                >
                <VBadge
                  :model-value="0 < len(posts)"
                  inline
                  color="primary2"
                  class="opacity-50 ms-0 -translate-x-2 translate-y-px"
                >
                  <template #badge>
                    <pre style="font-size: 108%">{{ len(posts) }}</pre>
                  </template>
                </VBadge>
                <VSpacer />
                <VBtn
                  icon="$loading"
                  @click="
                    () => {
                      postsReload();
                      storyImagesReload();
                    }
                  "
                />
                <VBtn icon="$close" @click="toggleMenuPostsList.off" />
              </VToolbar>
              <!-- post items spacer -->
              <div
                class="p-4 !pt-[92px] min-h-64 !h-[492px] w-[412px] scrollbar-thin-light overflow-auto"
              >
                <!-- @@ posts start -->
                <VDataIterator
                  :items="dataSortedByDateDesc(posts)"
                  :items-per-page="-1"
                  class="space-y-4"
                >
                  <template #no-data>
                    <p class="text-center text-disabled font-italic pa-4">
                      Trenuto nemate priče.
                    </p>
                  </template>
                  <template #default="{ items }">
                    <template v-for="p in items" :key="p.raw.id">
                      <!-- @@PostItems -->
                      <PostsItem
                        :post="p.raw"
                        @posts-remove="postsRemove"
                        @posts-edit="postEditOnClick"
                      />
                    </template>
                  </template>
                </VDataIterator>
              </div>
            </VCard>
          </VMenu>
        </VBtn>
        <VBtn
          elevation="4"
          color="on-surface"
          class="px-3 !min-w-[242px] ms-5"
          variant="elevated"
          type="submit"
          size="x-large"
          rounded
        >
          <VIcon size="x-large" start icon="$iconCloudUp" />
          {{ postIdSelected$ ? "Ažuriraj" : "Objavi" }} priču
          <VTooltip activator="parent" open-delay="892" location="top">
            <em
              >Priča je odmah vidljiva i otvorena za reakcije, deljenje i
              pretragu</em
            >
            <VIcon class="mb-[2px] ms-4 opacity-30" end icon="$iconGlobe" />
          </VTooltip>
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
<style lang="scss" scoped></style>
