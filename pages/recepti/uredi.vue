<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "user-profile",
  middleware: "authorized",
});

const navDrawerToolbarHeight = 51;

const auth = useStoreApiAuth();
if (auth.isCompany$) setPageLayout("company-profile");

const {
  form,
  clear: formClear,
  submit,
  valid,
} = useFormDataFields(
  "s6uV8SZ7R5z2",
  {
    title: True,
  },
  {
    onSubmit: (data) => {
      console.log({ data });
    },
  }
);
// @@eos
</script>
<template>
  <section class="page--recepti-uredi *bg-red">
    <VNavigationDrawer
      width="322"
      permanent
      location="end"
      elevation="1"
      class="!bg-stone-50 scrollbar-thin-light"
      :style="`padding-top: ${navDrawerToolbarHeight}px`"
    >
      posts
      <VToolbar
        :height="navDrawerToolbarHeight"
        class="top-0 inset-x-0 scrollbar-thin-light"
        absolute
        elevation="1"
      >
        12
      </VToolbar>
    </VNavigationDrawer>
    <Form
      @submit.prevent="submit"
      class="__placer__ max-w-[911px] mx-auto px-1"
      autocomplete="off"
    >
      <VToolbar
        color="white"
        elevation="1"
        density="comfortable"
        rounded="pill"
      >
        <VToolbarTitle>🚧 strana u izradi</VToolbarTitle>
        <VBtn>1</VBtn>
        <VBtn>2</VBtn>
        <VBtn>3</VBtn>
      </VToolbar>
      <VSheet class="pt-12 px-16">
        <!-- .title -->
        <VTextField
          clearable
          variant="underlined"
          name="title"
          v-model="form.title.value"
          label="Naziv"
        />
      </VSheet>
    </Form>
  </section>
</template>
<style lang="scss" scoped></style>
