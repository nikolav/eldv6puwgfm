<script setup lang="ts">
import { Dump } from "@/components/dev";
import { ProvideChatData } from "@/components/app";
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

const { CHAT_MAIN } = useTopics();
const topicChatMain = useGlobalVariable(CHAT_MAIN);

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
    <ProvideChatData topic="@demo1" v-slot="{ length }">
      <VBtn @click="topicChatMain = '@demo1'">@demo1 [{{ length }}]</VBtn>
    </ProvideChatData>
    <ProvideChatData topic="@demo2" v-slot="{ length }">
      <VBtn @click="topicChatMain = '@demo2'">@demo2 [{{ length }}]</VBtn>
    </ProvideChatData>
    <ProvideChatData topic="@demo1" v-slot="{ length }">
      <VBtn @click="topicChatMain = '@demo1'">@demo1 [{{ length }}]</VBtn>
    </ProvideChatData>
    <VBtn @click="topicChatMain = undefined">clear</VBtn>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
