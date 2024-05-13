<script setup lang="ts">
import { Dump } from "@/components/dev";
import { LikeDislikeStatus, LikeDislike } from "@/components/app"
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

const topic = "foo122333:2";
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
    <LikeDislikeStatus :topic="topic" />
    <LikeDislike :topic="topic" />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
