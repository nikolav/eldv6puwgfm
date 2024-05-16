<script setup lang="ts">
import { Dump } from "@/components/dev";
import { SocialShareTopicButton } from "@/components/app";
definePageMeta({
  layout: "blank",
});

// const col1 = collection(fdb, "data:1");

// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index-</NuxtLink>
    <!-- <SocialShare
      :style="false"
      :label="false"
      url="https://nikolav.rs/"
      network="facebook"
    >
      <template #icon>
        <SocialShareTopicButton />
      </template>
    </SocialShare> -->
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
