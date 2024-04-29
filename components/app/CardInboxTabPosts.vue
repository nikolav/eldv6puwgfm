<script setup lang="ts">
// import { Dump } from "@/components/dev";
import { FilePicker } from "@/components/ui";
import { PostsItem } from "@/components/app";

const {
  // story: { STORY_MIN_CONTENT_LENGTH },
  key: { POST_IMAGES_prefix, APP_PROCESSING },
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
// const editor = useQuillEditor("#editorMyyL2ThnLsV", {
//   bounds: "#quill--bounds",
//   placeholder: "Moja priča...\n   (što bogatije to bolje...)",
// });

const appProcessing$ = useGlobalFlag(APP_PROCESSING);
const fileSelected$ = ref();
const { upload } = useApiStorage();
const { tags } = useDocs();
const upl = useProcessMonitor();
const postSaved$ = computed({
  get: () => !upl.processing.value && upl.success.value,
  set: (flag: boolean) => (upl.success.value = flag),
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
const title_ = ref();
const { submit } = useFormDataFields(
  "QuillEditor:CbmEHEEF",
  {
    // title: (value: string) => 1 < value?.length,
  },
  // {
  //   onSubmit: async () => {
  //     // @@todo reuse component
  //     editor.getContent(
  //       async ({ text, content }: { text: string; content: any }) => {
  //         if (!text) return;
  //         if (!title_.value) return;
  //         let postId;
  //         upl.begin();
  //         try {
  //           postId = Number(
  //             get(
  //               await postsUpsert(
  //                 {
  //                   title: title_.value,
  //                   content: JSON.stringify(content),
  //                 },
  //                 postSelected$.value?.id || undefined
  //               ),
  //               "data.postsUpsert.id"
  //             )
  //           );

  //           if (!postId) throw "--error-post-failed";
  //           if (!fileSelected$.value) {
  //             upl.successful();
  //             return;
  //           }

  //           const imageId = Number(
  //             get(
  //               await upload({
  //                 image: {
  //                   file: fileSelected$.value,
  //                   data: {},
  //                 },
  //               }),
  //               "image.id"
  //             )
  //           );

  //           if (!imageId) throw "--failed-image-upload";

  //           // bind/tag image to post
  //           if (
  //             !isEmpty(
  //               get(
  //                 await tags(imageId, {
  //                   [`${POST_IMAGES_prefix}${postId}:${imageId}`]: true,
  //                 }),
  //                 "data.docsTags"
  //               )
  //             )
  //           )
  //             upl.successful();
  //         } catch (error) {
  //           upl.setError(error);
  //         } finally {
  //           storyIdSaved$.value = postId;
  //           storyTitleSaved$.value = title_.value;
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
const clearStory = () => {
  title_.value = undefined;
  // editor.clear();
  fileSelected$.value = null;
  postIdSelected$.value = undefined;
};
// @@eos
</script>
<template>
  <VCard class="component--CardInboxTabPosts" min-height="412">
    <!-- @signal:order-sent -->
    <VSnackbar
      min-width="555"
      v-model="postSaved$"
      color="transparent"
      variant="text"
      close-delay="122333"
    >
      <VAlert prominent rounded="lg" type="success" elevation="4">
        <div class="d-flex justify-between items-center">
          <NuxtLink :to="storyPublicUrl$" external target="_blank">
            <strong class="me-4 text-xl">👌🏻 </strong>
            <a class="text-truncate text-decoration-underline"
              >📃 {{ storyTitleSaved$ }}</a
            >
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

    <VForm @submit.prevent="submit" autocomplete="off">
      <div class="!grid grid-cols-[1fr,222px] *bg-red-200">
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
            label="Naslov artikla *"
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
            <section class="fill-height border-0" id="editorMyyL2ThnLsV" />
          </div>
        </div>

        <!-- @@col.images -->
        <div class="*bg-lime-200">
          <div class="FilePicker--placer px-2 mt-12 d-flex justify-center">
            <FilePicker v-model="fileSelected$" />
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
                class="top-0 inset-x-0 z-[1]"
              >
                <VSpacer />
                <VBtn icon="$loading" @click="postsReload" />
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
                        @posts-edit="
                          (ppid) => {
                            postIdSelected$ = ppid;
                          }
                        "
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
