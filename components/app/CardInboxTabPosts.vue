<script setup lang="ts">
import { Dump } from "@/components/dev";
import { FilePicker } from "@/components/ui";

// import natural from "natural";


const DUMP = 0;
//
const PPID = 122333;
const POSTS_IMAGE_prefix = "posts:image:4lWVfROCSaT94C8GWu4:";
//

const auth = useStoreApiAuth();
const uid_ = computed(() => get(auth.user$, "id"));
const { posts } = useQueryPosts(uid_);
const editor = useQuillEditor("#editor", {
  bounds: "#quill--bounds",
  placeholder: "Moja priča...\n   (što bogatije to bolje...)",
});

const fileSelected$ = ref();
const { upload, files } = useApiStorage();
// #
const { form, submit } = useFormDataFields(
  "QuillEditor:2JRhAAtd6",
  {
    title: (value: string) => 1 < value?.length,
  },
  {
    onSubmit: async ({ title }) => {
      // editor.getContent(({ text }: { text: string }) => {
      //   console.log({
      //     title,
      //     text,
      //   });
      // });
    },
  }
);

// @@eos
</script>
<template>
  <VCard class="component--CardInboxTabPosts" min-height="412">
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
          <div
            class="FilePicker--palcer px-2 mt-12 *bg-red d-flex justify-center"
          >
            <FilePicker v-model="fileSelected$" />
          </div>
        </div>
      </div>
      <VCardActions>
        <VSpacer />
        <VBtn type="submit">ok</VBtn>
      </VCardActions>
    </VForm>
    <Dump v-if="DUMP" :data="{ files, posts }" />
  </VCard>
</template>
<style lang="scss" scoped>
</style>
