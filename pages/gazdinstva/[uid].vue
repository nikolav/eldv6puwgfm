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

// @@eos
</script>
<template>
  <section class="page--gazdinstva:uid">
    <pre>{{ JSON.stringify(route.params) }}</pre>
    <pre>{{ JSON.stringify(vars, null, 2) }}</pre>
  </section>
</template>
<style lang="scss" scoped>
</style>
