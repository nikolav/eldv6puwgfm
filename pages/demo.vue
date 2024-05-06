<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "blank",
});

const { count, inc, dec, reset } = useCounter(10);
const i$ = ref();
watch(count, (c) => {
  if (!c) {
    clearInterval(i$.value);
    console.log(`done`);
  }
});
const ok = () => {
  reset();
  i$.value = setInterval(dec, 122);
};
// #eos
</script>
<template>
  <section class="page--demo.index">
    <pre>[{{ count }}]</pre>
    <VBtn @click="inc()">inc</VBtn>
    <VBtn @click="dec()">dec</VBtn>
    <VBtn @click="reset()">reset</VBtn>
    <VBtn @click="ok">ok</VBtn>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
