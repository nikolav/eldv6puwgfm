<script setup lang="ts">
import { VideoPlayer } from "@videojs-player/vue";
// @@eos
</script>
<template>
  <section class="component--NoDataProducts">
    <VCardTitle class="text-medium-emphasis text-center mt-5"
      >Trenutno nemate robe u ponudi. ⛔</VCardTitle
    >
    <VContainer class="pb-10">
      <VCardText class="max-w-[722px] mx-auto text-body-1">
        <p class="!tracking-wider">
          Ako ste novi na platformi pogledajte ovo kratko uputstvo kako da
          pravilno izlažete svoje artikle.
        </p>
      </VCardText>
      <VSheet rounded class="overflow-hidden w-fit mx-auto mt-1" elevation="1">
        <VideoPlayer
          :width="722"
          src="/ulistavanje-pomoc.mp4"
          poster="/etc/poster01.png"
          controls
          :volume="0.44"
          loop
        />
      </VSheet>
    </VContainer>
  </section>
</template>
<style lang="scss" scoped></style>
