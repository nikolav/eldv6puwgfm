<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const calKey = useUniqueId();

// #eos
</script>
<template>
  <section
    class="page--demo d-flex items-center justify-center fill-height bg-stone-200"
  >
    <VSheet elevation="2" width="712" height="589" class="pa-2">
      <VBtn @click="calKey">reload</VBtn>
      <VDivider />
      <iframe
        :key="calKey.ID.value"
        src="https://calendar.google.com/calendar/embed?height=480&wkst=2&ctz=Europe%2FBelgrade&bgcolor=%23F6BF26&showTitle=0&showTabs=0&hl=sr&showCalendars=0&src=dnVrb3ZpY25pa29sYTIwMTRAZ21haWwuY29t&src=ZW4ucnMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%23D50000"
        style="border-width: 0"
        width="640"
        height="480"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </VSheet>
  </section>
</template>
<style lang="scss" scoped>
</style>
