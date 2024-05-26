<script setup lang="ts">
const props = defineProps<{
  modelValue?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", m: string): void;
}>();

const submitSearch = noop;

// @@eos
</script>
<template>
  <section class="component--MainSearchBox">
    <!-- @main:search -->
    <VForm
      @submit.prevent
      class="*bg-red mx-auto mt-[92px] max-w-[512px] sm:max-w-[550px] sm:mt-[122px] sm:translate-x-[7.45rem] 2xl:mt-[109px] 2xl:translate-x-[20rem]"
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
