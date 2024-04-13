<script setup lang="ts">
// cart.store { code: string; description: string; items: Record<ID, amount> }
const cart = useStoreCart();

// #eos
</script>
<template>
  <VSheet rounded="0" elevation="0">
    <VBtn @click="cart.close">close</VBtn>
    <VBtn @click="cart.put(22, 1)">cart:add</VBtn>
    <VBtn @click="cart.increase(2)">cart:inc</VBtn>
    <VBtn @click="cart.increase(2, -1)">cart:dec</VBtn>
    <VBtn @click="cart.put(2, 122)">cart:set</VBtn>
    <VBtn @click="cart.destroy">cart:destroy</VBtn>
    <VBtn @click="cart.sendOrder">cart:order</VBtn>
    <pre>{{ JSON.stringify(cart.products, null, 2) }}</pre>
    <pre>{{ JSON.stringify(cart.isEmpty, null, 2) }}</pre>
    <pre>{{ JSON.stringify(cart.length, null, 2) }}</pre>
    <pre>{{ JSON.stringify(cart.store$, null, 2) }}</pre>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora alias
      perspiciatis nesciunt officia ipsum saepe similique facilis nam atque
      fugiat? Nobis harum aliquid, esse assumenda maiores optio ad earum dolore.
    </p>
  </VSheet>
</template>
<style lang="scss" scoped>
</style>
