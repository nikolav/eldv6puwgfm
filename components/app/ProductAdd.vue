<script setup lang="ts">
import { useDisplay } from "vuetify";

const props_ = defineProps<{ close: () => void }>();

const { smAndUp } = useDisplay();

const submitProductAdd = async () => {
  console.log(`@submitProductAdd`);
};

// #eos
</script>
<template>
  <VSheet :rounded="0" :elevation="0" class="fill-height d-flex flex-col">
    <!-- @toolbar -->
    <VToolbar flat color="transparent">
      <VBtn
        @click="props_.close"
        icon
        variant="text"
        size="large"
        color="primary-darken-1"
      >
        <VIcon icon="$prev" size="large" />
        <VTooltip
          activator="parent"
          text="Nazad"
          open-delay="345"
          location="bottom"
        />
      </VBtn>
      <VSpacer />
      <h2 class="text-h5 !font-sans text-medium-emphasis">
        Ulistavanje proizvoda
      </h2>
      <VSpacer />
      <VBtn
        @click="close"
        icon
        variant="text"
        size="large"
        color="primary-darken-1"
      >
        <VIcon icon="$close" size="large" />
        <VTooltip
          activator="parent"
          text="Zatvori"
          open-delay="345"
          location="bottom"
        />
      </VBtn>
    </VToolbar>

    <!-- @form -->
    <VForm @submit.prevent="submitProductAdd" class="grow d-flex flex-col">
      <div class="grow *bg-red">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
          vitae quas ab ullam repudiandae fugiat. Dolores repudiandae facere et,
          aliquam voluptatum odit magni aut. In delectus repellendus labore
          maiores voluptatem.
        </p>
      </div>
      <VToolbar flat color="transparent" class="pa-sm-4">
        <VSpacer />
        <VBtn
          :size="smAndUp ? 'large' : undefined"
          variant="tonal"
          color="primary"
          type="submit"
        >
          <VIcon icon="$iconSave" start />
          <strong>Ulistaj</strong>
        </VBtn>
      </VToolbar>
    </VForm>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
