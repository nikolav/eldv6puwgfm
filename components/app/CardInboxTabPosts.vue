<script setup lang="ts">
// import { Dump } from "@/components/dev";
import { FilePicker } from "@/components/ui";
import { PostsItem } from "@/components/app";

const {
  key: { APP_PROCESSING },
} = useAppConfig();
const auth = useStoreApiAuth();
const uid_ = computed(() => get(auth.user$, "id"));
const {
  posts,
  upsert: postsUpsert,
  remove: postsRemove,
  reload: postsReload,
  loading: postsLoading,
} = useQueryPosts(uid_);
// @@
// const editor = useQuillEditor("#editorMyyL2ThnLsV", {
//   bounds: "#quill--bounds",
//   placeholder: "Moja priča...\n   (što bogatije to bolje...)",
// });

const appProcessing$ = useGlobalFlag(APP_PROCESSING);
const title_ = ref();
const fileSelected$ = ref();
const upl = useProcessMonitor();
const postSaved$ = computed({
  get: () => !upl.processing.value && upl.success.value,
  set: (flag: boolean) => (upl.success.value = flag),
});
watch(postSaved$, (saved) => {
  if (saved) {
    fileSelected$.value = undefined;
  }
});
watchEffect(() => {
  appProcessing$.value = upl.processing.value || postsLoading.value;
});
const storyIdSaved$ = ref();
const storyTitleSaved$ = ref();
const storyPublicUrl$ = useStoryPublicUrl(storyIdSaved$, storyTitleSaved$);
const postIdSelected$ = ref();
watch(storyIdSaved$, (id) => {
  if (id) postIdSelected$.value = id;
});
const storyImageRemoved$ = ref(false);
const {
  image: storyImage,
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
  // {
  //   onSubmit: async () => {
  //     // @@todo reuse component
  //     editor.getContent(
  //       async ({ text, content }: { text: string; content: any }) => {
  //         if (!text) return;
  //         if (!title_.value) return;
  //         upl.begin();

  //         let postId;
  //         try {
  //           if (storyImageRemoved$.value) {
  //             await storyImagesDrop();
  //           }

  //           postId = Number(
  //             get(
  //               await postsUpsert(
  //                 {
  //                   title: title_.value,
  //                   content: JSON.stringify(content),
  //                 },
  //                 postIdSelected$.value
  //               ),
  //               "data.postsUpsert.id"
  //             )
  //           );
  //           if (!postId) throw "--error-post-failed";
  //           storyTitleSaved$.value = title_.value;
  //           postIdSelected$.value = postId;

  //           if (!fileSelected$.value) {
  //             upl.successful();
  //             return;
  //           }
  //           await nextTick();
  //           await storyImageUpdate(fileSelected$.value);
  //           upl.successful();
  //         } catch (error) {
  //           upl.setError(error);
  //         } finally {
  //           upl.done();
  //         }
  //       }
  //     );
  //   },
  // }
);
const toggleMenuPostsList = useToggleFlag();
const postSelected$ = computed(() =>
  find(posts.value, { id: postIdSelected$.value })
);
watchEffect(() => {
  if (!postIdSelected$.value) return;
  title_.value = postSelected$.value?.title || title_.value;
  const jsondata = postSelected$.value?.content;
  // if (jsondata) editor.setContent(JSON.parse(jsondata));
});
watch(postIdSelected$, (ppid) => {
  // new story loaded; release flag
  if (ppid) storyImageRemoved$.value = false;
});

const fallbackUrl_ = computed(() =>
  !(!storyImageRemoved$.value && postIdSelected$.value)
    ? undefined
    : storyImageSrc.value
);
const clearStory = () => {
  postIdSelected$.value = undefined;
  storyImageRemoved$.value = false;
  fileSelected$.value = undefined;
  // editor.clear();
  title_.value = undefined;
};

// @@
const postEditOnClick = (ppid: number) => {
  setTimeout(toggleMenuPostsList.off, 23);
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
    <VSnackbar
      v-model="postSaved$"
      color="transparent"
      variant="text"
      width="489"
    >
      <VAlert :icon="false" prominent rounded="lg" type="success" elevation="4">
        <div class="d-flex justify-between items-center gap-4">
          <NuxtLink
            :to="storyPublicUrl$"
            external
            target="_blank"
            class="d-flex items-center text-truncate"
          >
            <strong class="me-4 text-3xl">👌🏻 </strong>
            <a class="text-decoration-underline"> 📃 {{ storyTitleSaved$ }} </a>
          </NuxtLink>
          <VBtn
            class="ma-4"
            @click="postSaved$ = false"
            color="on-success"
            variant="tonal"
            >ok</VBtn
          >
        </div>
      </VAlert>
    </VSnackbar>

    <VForm class="*bg-red" @submit.prevent="submit" autocomplete="off">
      <div class="!grid grid-cols-[1fr,222px] *bg-red-200 min-h-[392px]">
        <!-- @@col.post -->
        <div
          class="*bg-red pb-2 ms-4 min-h-[262px] !max-h-[442px] overflow-auto scrollbar-thin-light relative"
        >
          <VBtn
            position="absolute"
            class="top-0 end-2 z-[1]"
            variant="plain"
            size="small"
            color="info"
            icon
            density="comfortable"
          >
            <VIcon size="25" icon="$iconHelpCircle" />
            <VMenu
              activator="parent"
              open-on-hover
              open-delay="345"
              :close-on-content-click="false"
              location="bottom end"
            >
              <VSheet
                max-width="320"
                min-width="245"
                class="pa-3 max-w-[320px] min-h-[122px] pb-6"
              >
                <p class="!text-sm pa-1">
                  <strong class="text-xl d-inline-block tracking-widest pa-2">
                    📣 🏆 📜 🥳 </strong
                  ><br />
                  <em class="!italic text-body-2 text-mono">Priče</em> možete da
                  koristite da opišete trendove, najavite značajne događaje,
                  vodite blog, članke, i istaknete dolazeću akciju. Generalan
                  sadržaj promotivne prirode... Uključuje i prateću sliku.
                </p>
              </VSheet>
            </VMenu>
          </VBtn>
          <VTextField
            v-model.trim="title_"
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
          <div class="mt-5 me-1 *bg-red" id="quill--bounds">
            <!-- @@ -->
            <!-- @editor quill -->
            <section
              id="editorMyyL2ThnLsV"
              class="fill-height border-0"
              style="font-size: 111%"
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
          <VIcon icon="$menu" size="33" />
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
          class="px-5 !min-w-[242px]"
          variant="elevated"
          type="submit"
          size="x-large"
        >
          <VIcon size="x-large" start icon="$iconCloudUp" />
          {{ postIdSelected$ ? "Ažuriraj" : "Objavi" }} priču
          <VTooltip activator="parent" open-delay="892" location="top">
            <em
              >Priča je odmah vidljiva i otvorena za reakcije, deljenje,
              pretragu</em
            >
            <VIcon class="mb-[2px] ms-4 opacity-30" end icon="$iconGlobe" />
          </VTooltip>
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
