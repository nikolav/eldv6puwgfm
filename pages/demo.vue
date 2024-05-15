<script setup lang="ts">
// import { URL_AUTH_social } from "@/config";
import { Dump } from "@/components/dev";
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
// const loginSocial = async () => {
//   const res = await $fetch(URL_AUTH_social, {
//     method: "post",
//     body: { auth: res$.value },
//   });
//   console.log({ res });
// };

const auth = useStoreApiAuthProvideSocial();
// #eos
</script>
<template>
  <section class="page--demo.index">
    <NuxtLink :to="{ name: 'index' }">-index</NuxtLink>
    <!-- <SocialShare
      :style="false"
      :label="false"
      url="https://kantar.rs/"
      network="facebook"
    >
      <template #icon>
        <VBtn icon size="small" variant="plain">
          <VIcon icon="$close" size="large" />
        </VBtn>
      </template>
    </SocialShare> -->
    <hr />
    <VBtn @click="auth.loginFacebook({ company: true })">loginFacebook</VBtn>
    <VBtn @click="auth.loginGoogle({ company: true })">loginGoogle</VBtn>
    <VBtn @click="auth.api.logout">logout</VBtn>

    <hr />

    <!-- <VBtn @click="googleAuth">auth:google:fetch-auth</VBtn>
    <VBtn @click="facebookAuth">auth:facebook:fetch-auth</VBtn>
    <VBtn @click="signOut(fbAuth)">logout</VBtn> -->
    <hr />
    <Dump
      :data="{
        isAuthenticated: auth.api.isAuthenticated$,
        user: auth.api.user$,
        token: auth.api.token$,
      }"
    />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
