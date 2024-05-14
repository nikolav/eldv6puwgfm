<script setup lang="ts">
import { Dump } from "@/components/dev";
import { LightboxSlides } from "@/components/ui";
// import {
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { auth as fbAuth } from "@/services/firebase";
definePageMeta({
  layout: "blank",
});

// const col1 = collection(fdb, "data:1");
// const res$ = ref();
// onAuthStateChanged(fbAuth, (user) => {
//   console.log(`--onAuthStateChanged`);
//   res$.value = user;
// });

// const googleAuth = () => signInWithPopup(fbAuth, new GoogleAuthProvider());
// const facebookAuth = () => signInWithPopup(fbAuth, new FacebookAuthProvider());

// const toggle = useToggleFlag();
// const { profile, avatar } = useProfileData(3);

const auth = useStoreApiAuth();

const { $lightbox } = useNuxtApp();

const ok = () => {
  $lightbox.open([
    {
      type: "pdf",
      src: "/prodajna-prezentacija.pdf",
      caption: "Prodajna prezentacija",
    },
  ]);
};
const slidesPdf = [
{
    type: "pdf",
    src: "/prodajna-prezentacija.pdf",
    caption: "Prodajna prezentacija | KANTAR.RS",
  },
  {
    type: "pdf",
    src: "/uputstvo-za-fotografisanje-hrane.pdf",
    caption: "Uputstvo za fotografisanje hrane | KANTAR.RS",
  },
  {
    type: "youtube",
    src: "https://youtu.be/YLXs6MUna70",
    caption: "Obrada slika za sajt | KANTAR.RS",
  },
];
// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index</NuxtLink>
    <!-- <hr />
    <VBtn @click="googleAuth">auth:google</VBtn>
    <VBtn @click="facebookAuth">auth:facebook</VBtn>
    <VBtn @click="signOut(fbAuth)">logout</VBtn> -->
    <hr />
    <LightboxSlides
      :slides="slidesPdf"
      :options="{
        startIndex: 0,
      }"
    >
      <template #activator="{ open: galleryOpen }">
        <VBtn @click="galleryOpen">:show</VBtn>
      </template>
    </LightboxSlides>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
