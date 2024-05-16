<script setup lang="ts">
import { URL_AUTH_social } from "@/config";
import { Dump } from "@/components/dev";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth as fbAuth } from "@/services/firebase";
definePageMeta({
  layout: "blank",
});

// const col1 = collection(fdb, "data:1");
const res$ = ref();
onAuthStateChanged(fbAuth, (user) => {
  console.log(`--onAuthStateChanged`);
  res$.value = user;
});

const googleAuth = () => signInWithPopup(fbAuth, new GoogleAuthProvider());
const facebookAuth = () => signInWithPopup(fbAuth, new FacebookAuthProvider());
const loginSocial = async () => {
  const res = await $fetch(URL_AUTH_social, {
    method: "post",
    body: { auth: res$.value },
  });
  console.log({ res });
};

// const auth = useStoreApiAuthProvideSocial();
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
    <VBtn @click="loginSocial">loginSocial</VBtn>
    <VBtn @click="facebookAuth">facebookAuth</VBtn>
    <VBtn @click="googleAuth">googleAuth</VBtn>
    <VBtn @click="signOut(fbAuth)">logout</VBtn>

    <hr />
    <Dump
      :data="{
        res$,
      }"
    />
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
