<script setup lang="ts">
import { Dump } from "@/components/dev";
import { SerbiaMapSVG } from "@/components/app";
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

// const res$ = ref();
// onAuthStateChanged(fbAuth, (user) => {
//   console.log(`--onAuthStateChanged`);
//   res$.value = user;
// });

// const googleAuth = () => signInWithPopup(fbAuth, new GoogleAuthProvider());
// const facebookAuth = () => signInWithPopup(fbAuth, new FacebookAuthProvider());

// const toggle = useToggleFlag();
// const { profile, avatar } = useProfileData(3);

const district$ = ref();

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
    <VSheet
      elevation="1"
      rounded="lg"
      class="mx-auto pa-4 d-flex items-center justify-center w-fit"
    >
      <SerbiaMapSVG v-model="district$" class="h-[512px]" />
    </VSheet>
    <Dump :data="{ district: district$ }" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
