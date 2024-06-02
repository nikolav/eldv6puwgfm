<script setup lang="ts">
import { useDisplay } from "vuetify";
const props = defineProps<{
  modelValue?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", m: string): void;
}>();

const submitSearch = noop;

const { width } = useDisplay();

// @@eos
</script>
<template>
  <section class="component--MainSearchBox">
    <!-- @main:search -->
    <VForm
      @submit.prevent
      class="*bg-red mx-auto mt-[92px] max-w-[512px] sm:mt-[122px] translate-x-[7.45rem] 2xl:mt-[109px] 2xl:translate-x-[20rem]"
      :class="[
        width < 832 ? '!translate-x-0' : undefined,
        width < 650 ? '!mt-[112px] max-w-[92%]' : undefined,
      ]"
    >
      <VTextField
        :model-value="props.modelValue"
        @update:model-value="(v) => $emit('update:modelValue', v)"
        name="pretraga"
        autofocus
        variant="solo"
        label="Traži:"
        rounded="pill"
        center-affix
        clearable
        single-line
        placeholder="Voće, povrće, sir..."
      >
        <template #prepend-inner>
          <span class="ps-3"></span>
        </template>
        <template #append-inner>
          <VBtn
            @click.stop="submitSearch"
            class="rounded-e-pill fill-height translate-x-[14px]"
            icon
            size="x-large"
            color="primary"
            variant="elevated"
            ><VIcon icon="$iconMagnifyingGlass" class="-translate-x-[2px]"
          /></VBtn>
        </template>
      </VTextField>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
