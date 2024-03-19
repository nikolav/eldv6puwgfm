<script setup lang="ts">
// https://github.com/surmon-china/videojs-player
// import { VideoPlayer } from "@videojs-player/vue";

useHead({
  title: "--home",
});

const toggle = useToggleFlag();

const { APP_PROCESSING } = useAppConfig().key;
const flags$ = useStoreFlags();
const appProcessingToggle = () => {
  toggle();
  flags$.toggle(APP_PROCESSING);
};

// #eos
</script>

<template>
  <section id="page-demo" class="pa-2 pa-md-4">
    <h1>👋🏽👷🏽‍♂️ zdravo</h1>
    <h1>@page: Izbor</h1>
    <VBtnGroup>
      <VBtn
        width="122"
        @click="appProcessingToggle"
        variant="elevated"
        color="primary"
        size="large"
        >:[{{ toggle.isActive.value }}]</VBtn
      >
      <VBtn
        width="122"
        @click="appProcessingToggle"
        variant="elevated"
        color="primary2"
        size="large"
        >:[{{ toggle.isActive.value }}]</VBtn
      >
      <VBtn
        width="122"
        @click="appProcessingToggle"
        variant="elevated"
        color="primary3"
        size="large"
        >:[{{ toggle.isActive.value }}]</VBtn
      >
    </VBtnGroup>
    <template v-for="n in 5" :key="n">
      <p class="mb-4 indent-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam velit
        atque illum id maiores minus neque, harum eos. Mollitia dolore
        blanditiis tempora laborum deserunt! Ullam dignissimos tempora laborum?
        Cumque ipsam vel, facere ducimus voluptas, ullam blanditiis sequi culpa
        recusandae id quisquam dolorum nostrum! Numquam, repudiandae. Temporibus
        delectus sapiente laboriosam officia qui soluta dolorem ipsa, earum
        praesentium quasi ullam doloribus rerum nihil, sunt id deserunt quos
        adipisci iusto eius vel, at fugiat eveniet in. Reiciendis expedita quasi
        numquam est illo hic doloribus praesentium tempore ad laboriosam amet
        dignissimos voluptas temporibus molestiae necessitatibus, odio at fuga
        eaque eveniet omnis exercitationem. Numquam, quidem voluptatibus beatae
        natus earum ducimus nesciunt aliquam illum qui, neque animi quia vitae
        dicta assumenda tempora labore hic? Necessitatibus, dignissimos.
        Impedit, necessitatibus?
      </p>
    </template>
  </section>
</template>

<style scoped lang="scss">
</style>
