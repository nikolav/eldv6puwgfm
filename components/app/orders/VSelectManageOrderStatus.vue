<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps<{ oid: number | undefined }>();
const {
  orders: { ORDER_STATUS },
} = useAppConfig();
const { loading, productsStatus, updateProductsStatus } = useQueryManageOrder(
  () => props.oid
);

const status_ = computed(() =>
  isEmpty(productsStatus.value)
    ? undefined
    : ((ps) => {
        for (let i in ps) {
          return ps[i];
        }
      })(productsStatus.value)
);
// const statusUpdate = async (status: number) => {
//   if (status == status_.value) return;
//   return await orderData({ status });
// };
const icon_ = computed(
  () => get(ORDER_STATUS, `[${status_.value}].icon`) || "$warning"
);
const items = [
  {
    value: 1,
    title: ORDER_STATUS[1].title,
    props: {
      prependIcon: ORDER_STATUS[1].icon,
    },
  },
  {
    value: 2,
    title: ORDER_STATUS[2].title,
    props: {
      prependIcon: ORDER_STATUS[2].icon,
    },
  },
  {
    value: 3,
    title: ORDER_STATUS[3].title,
    props: {
      prependIcon: ORDER_STATUS[3].icon,
    },
  },
  {
    value: 4,
    title: ORDER_STATUS[4].title,
    props: {
      prependIcon: ORDER_STATUS[4].icon,
    },
  },
];
// @@eos
</script>
<template>
  <em class="__placer__ pa-0 ma-0 d-inline-flex max-w-[69px] items-center">
    <VSelect
      :items="items"
      class="component--VSelectManageOrderStatus scale-[72%]"
      center-affix
      density="compact"
      :loading="loading"
      :model-value="status_"
      @update:modelValue="updateProductsStatus"
      variant="solo-filled"
      bg-color="primary-lighten-1"
      rounded="pill"
      flat
      placeholder="Status narudžbenice"
      single-line
      :list-props="{
        density: 'comfortable',
        class: 'py-0',
      }"
      :menu-props="{
        location: 'bottom end',
      }"
      hide-details
      v-bind="$attrs"
    >
      <template #prepend-inner>
        <VIcon class="pa-0 ma-0" :icon="icon_" />
      </template>
    </VSelect>
    <VTooltip location="bottom" open-delay="345" activator="parent">
      <span>Status narudžbenice</span>
      <template v-if="status_">
        <em class="opacity-40 text-body-2 !font-sans">
          - {{ get(ORDER_STATUS, `[${status_}].title`) }}</em
        >
      </template>
    </VTooltip>
  </em>
</template>
<style lang="scss" scoped></style>
