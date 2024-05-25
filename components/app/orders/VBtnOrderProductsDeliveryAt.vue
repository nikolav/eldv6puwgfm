<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps<{ oid: number | undefined }>();

const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();

// stores
const { updateProductsDeliveryDate, productsDelivery } = useQueryManageOrder(
  () => props.oid
);

// utils
const { $formated_DMMMYYYY } = useNuxtApp();
const dtoday = new Date().getTime() - 86400000;
const toggleCalOpen = useToggleFlag();
const dGtToday = (d: any) => dtoday <= d.getTime();

// refs
const dd$ = ref();
const deliveryAt = computed(() =>
  isEmpty(productsDelivery.value)
    ? undefined
    : ((dd) => {
        for (let pid in dd) {
          return dd[pid];
        }
      })(productsDelivery.value)
);

// handlers
const deliveryDateSubmit = async () => {
  if (!dGtToday(dd$.value)) return;
  let err;
  try {
    await updateProductsDeliveryDate(dd$.value);
  } catch (error) {
    err = error;
  }
  if (!err) toggleCalOpen.off();
};

// watches
watch(deliveryAt, (dd) => {
  dd$.value = dd ? new Date(dd) : new Date();
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
      :transition="DEFAULT_TRANSITION"
    >
      <VDatePicker
        elevation="5"
        v-model="dd$"
        color="primary-lighten-1"
        show-adjacent-months
        rounded="lg t-xl"
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
            <span class="opacity-50">Datum isporuke</span>
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
          <VCardTitle class="text-center pb-5">{{
            $formated_DMMMYYYY(dd$)
          }}</VCardTitle>
        </template>
      </VDatePicker>
    </VMenu>
  </div>
</template>
<style lang="scss" scoped></style>
