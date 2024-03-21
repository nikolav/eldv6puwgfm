<script setup lang="ts">
const auth = useStoreApiAuth();
const loginAdmin = async () => {
  await auth.login({
    email: "admin@nikolav.rs",
    password: "122",
  });
};
const { data } = useDocs("@test:122");

// #eos
</script>
<template>
  <section class="page-demo">
    <h1>@demo</h1>
    <VBtn @click="loginAdmin">login:admin [{{ auth.isAuth$ }}]</VBtn>
    <pre>
      {{ JSON.stringify({ data }, null, 2) }}
    </pre>
  </section>
</template>
<style lang="scss" scoped>
</style>
