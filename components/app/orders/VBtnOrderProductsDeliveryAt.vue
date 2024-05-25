<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps<{ oid: number | undefined }>();

const { $formated_DMMMYYYY, $dayjs } = useNuxtApp();
const dd$ = ref();
const dtoday = new Date().getTime() - 86400000;
const toggleCalOpen = useToggleFlag();
const dGtToday = (d: any) => dtoday <= d.getTime();
const { updateProductsDeliveryDate, productsDelivery } = useQueryManageOrder(
  () => props.oid
);
const deliveryAt = computed(() =>
  isEmpty(productsDelivery.value)
    ? undefined
    : ((dd) => {
        for (let pid in dd) {
          return dd[pid];
        }
      })(productsDelivery.value)
);
const deliveryDateSubmit = async () => {
  if (!dGtToday(dd$.value)) return;
  // new Date().toISOString()
  // const d = dd$.value.toISOString()
  await updateProductsDeliveryDate(dd$.value);
};

watch(deliveryAt, (dd) => {
  if (!dd) {
    dd = new Date();
  }
  dd$.value = new Date(dd);
});

// @@eos
</script>
<template>
  <div>
    <VBtn
      id="ID--VpwlJx0mMu"
      @click="toggleCalOpen.on"
      color="on-primary"
      icon
      variant="text"
      class="component--VBtnOrderProductsDeliveryAt"
      v-bind="$attrs"
    >
      <VIcon size="large" icon="$iconCalendar" />

      <VTooltip location="bottom" open-delay="345" activator="parent">
        <span>Očekivani datum isporuke</span>
        <pre class="d-inline-block opacity-40" v-if="deliveryAt">
 - <em>{{ $formated_DMMMYYYY(deliveryAt) }}</em></pre>
        <span v-else>...</span>
      </VTooltip>
    </VBtn>
    <VMenu
      target="#ID--VpwlJx0mMu"
      v-model="toggleCalOpen.isActive.value"
      location="center"
      :close-on-content-click="false"
    >
      <VDatePicker
        elevation="5"
        v-model="dd$"
        color="primary-lighten-1"
        show-adjacent-months
        rounded="t-xl b-lg"
        :allowed-dates="dGtToday"
        :display-value="dd$"
      >
        <template #actions>
          <VBtn
            @click="dd$ = new Date()"
            variant="plain"
            size="small"
            color="on-primary"
            >Danas</VBtn
          >
          <VSpacer />
          <VBtn
            @click="deliveryDateSubmit"
            class="px-5"
            variant="elevated"
            color="primary-lighten-1"
            rounded="pill"
            size="large"
          >
            <VIcon
              color="on-primary"
              start
              icon="$iconSave"
              class="opacity-20"
            />
            <strong>OK</strong>
          </VBtn>
        </template>
        <template #title>
          <div class="d-flex items-center">
            <span>Datum isporuke</span>
            <VSpacer />
            <VBtn
              @click="toggleCalOpen.off"
              color="on-primary"
              icon
              variant="plain"
              size="small"
              density="comfortable"
            >
              <VIcon icon="$close" />
            </VBtn>
          </div>
        </template>
        <template #header>
          <VCardTitle>{{ $formated_DMMMYYYY(dd$) }}</VCardTitle>
        </template>
      </VDatePicker>
    </VMenu>
  </div>
</template>
<style lang="scss" scoped></style>
