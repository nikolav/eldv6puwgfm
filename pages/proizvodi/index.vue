<script setup lang="ts">
import { TOKEN_DEFAULT } from "@/config";

definePageMeta({
  layout: "blank",
});

const auth = useStoreApiAuth();
const route = useRoute();

const { runSetup: setupUserDefault } = useRunSetupOnce(() =>
  auth.tokenPut(TOKEN_DEFAULT)
);
watchEffect(() => {
  if (auth.initialized$ && !auth.token$) setupUserDefault();
});
const { data: vars } = useDocs("@vars");
const pid_ = computed(() =>
  Number(last(String(get(route.query, "slug")).split("-")))
);

// @@eos
</script>
<template>
  <section class="page--proizvodi:pid">
    <VBtn :to="{ name: 'index' }">home</VBtn>
    <pre>{{ JSON.stringify({ pid_, query: route.query, vars }) }}</pre>
  </section>
</template>
<style lang="scss" scoped>
</style>
