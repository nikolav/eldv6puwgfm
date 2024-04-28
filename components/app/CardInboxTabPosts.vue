<script setup lang="ts">
// import { Dump } from "@/components/dev";
import { FilePicker } from "@/components/ui";

const {
  story: { STORY_MIN_CONTENT_LENGTH },
  key: { POST_IMAGES_prefix, APP_PROCESSING },
} = useAppConfig();
const auth = useStoreApiAuth();
const uid_ = computed(() => get(auth.user$, "id"));
const { upsert: postsUpsert } = useQueryPosts(uid_);
const editor = useQuillEditor("#editor", {
  bounds: "#quill--bounds",
  placeholder: "Moja priča...\n   (što bogatije to bolje...)",
});

const fileSelected$ = ref();
const { upload } = useApiStorage();
const { tags } = useDocs();
// #
const storyIdSaved$ = ref();
const storyTitleSaved$ = ref();
const storyPublicUrl$ = useStoryPublicUrl(storyIdSaved$, storyTitleSaved$);
// #
const upl = useProcessMonitor();
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
const postSaved$ = computed({
  get: () => !upl.processing.value && upl.success.value,
  set: (flag: boolean) => (upl.success.value = flag),
});
watchEffect(() => {
  appProcessing$.value = upl.processing.value;
});
const { form, submit } = useFormDataFields(
  "QuillEditor:2JRhAAtd6",
  {
    title: (value: string) => 1 < value?.length,
  },
  {
    onSubmit: async ({ title }) => {
      editor.getContent(
        async ({ text, content }: { text: string; content: any }) => {
          if (!(STORY_MIN_CONTENT_LENGTH < text.length)) return;
          console.log(`@saving-story`);
          // @post upload
          // @@todo reuse component
          upl.begin();
          try {
            const postId = Number(
              get(
                await postsUpsert({
                  title,
                  content: JSON.stringify(content),
                }),
                "data.postsUpsert.id"
              )
            );

            storyIdSaved$.value = postId;
            storyTitleSaved$.value = title;

            if (!fileSelected$.value) {
              upl.successful();
              return;
            }

            const imageId = postId
              ? Number(
                  get(
                    await upload({
                      image: {
                        file: fileSelected$.value,
                        data: {},
                      },
                    }),
                    "image.id"
                  )
                )
              : undefined;

            if (postId && imageId) {
              // bind/tag image to post
              if (
                !isEmpty(
                  get(
                    await tags(imageId, {
                      [`${POST_IMAGES_prefix}${postId}:${imageId}`]: true,
                    }),
                    "data.docsTags"
                  )
                )
              )
                upl.successful();
            }
            // console.log({ res });
          } catch (error) {
            upl.setError(error);
          } finally {
            upl.done();
          }
        }
      );
    },
  }
);

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
      close-delay="12345"
    >
      <VAlert type="success" prominent elevation="4">
        <div class="d-flex justify-between items-center">
          <NuxtLink :to="storyPublicUrl$" external target="_blank">
            <strong class="me-4">Sačuvano...</strong>
            <a class="text-truncate text-decoration-underline"
              >📜 {{ storyTitleSaved$ }}</a
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
          class="pb-2 ms-4 *bg-blue-200 min-h-[262px] !max-h-[442px] overflow-auto scrollbar-thin-light"
        >
          <VTextField
            v-model.trim="form.title.value"
            clearable
            label="Naslov artikla *"
            variant="underlined"
            class="ms-4 w-[91%] *mx-auto mt-5 *bg-red"
            hint="Treba da sadrži ključne reči, može da pomogne u pretrazi..."
          >
            <template #prepend>
              <VIcon class="!opacity-20" start icon="$iconFeather" />
            </template>
          </VTextField>
          <div class="mt-5 me-1" id="quill--bounds">
            <!-- @@ -->
            <!-- @editor quill -->
            <section class="fill-height border-0" id="editor" />
          </div>
        </div>

        <!-- @@col.images -->
        <div class="*bg-lime-200">
          <div class="FilePicker--placer px-2 mt-12 d-flex justify-center">
            <FilePicker v-model="fileSelected$" />
          </div>
        </div>
      </div>
      <VCardActions>
        <VSpacer />
        <VBtn variant="tonal" type="submit" size="large">ok</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
