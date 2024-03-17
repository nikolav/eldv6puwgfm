<script setup lang="ts">
// https://github.com/surmon-china/videojs-player
// import { VideoPlayer } from "@videojs-player/vue";

useHead({
  title: "--home",
});

// #eos
</script>

<template>
  <section id="page-demo" class="pa-2 pa-md-4">
    <h1>@home</h1>
    <template v-for="n in 5" :key="n">
      <p class="mb-4 indent-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        temporibus quos nesciunt at quod voluptates obcaecati doloribus magnam
        voluptate porro magni ducimus, reiciendis id inventore, illum eos eum
        corrupti ut?
      </p>
    </template>
  </section>
</template>

<style scoped lang="scss">
</style>
