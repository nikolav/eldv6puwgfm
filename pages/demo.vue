<script setup lang="ts">
import { Dump } from "@/components/dev"
definePageMeta({
  layout: "blank",
});
const { products$ } = useQueryProductsPrices()

// #eos
</script>
<template>
  <section class="page--demo.index">
    <Dump :data="products$" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi velit
      excepturi ipsa, temporibus voluptates delectus soluta exercitationem earum
      commodi. Veniam neque repellat ipsa eum nemo cum aliquam dolores. Aut,
      accusantium?
    </p>
  </section>
</template>
<style lang="scss" scoped>
.color--blue {
  color: $BLUE_BASE;
}
</style>
