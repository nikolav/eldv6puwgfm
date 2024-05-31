<script setup lang="ts">
const props = defineProps<{ order: any }>();
const emit = defineEmits<{
  (e: "changeCompleted", val: boolean): void;
}>();
const oid = computed(() => get(props.order, "id"));
const { setCompleted } = useQueryManageOrder(oid);
const toggleCompleted = async () =>
  oid.value ? await setCompleted(!props.order.completed) : undefined;
// @@eos
</script>
<template>
  <VBtn
    :color="props.order?.completed ? 'success-darken-2' : 'rgba(0,0,0,.22)'"
    :variant="props.order?.completed ? 'tonal' : 'text'"
    icon
    @click="toggleCompleted"
    density="comfortable"
  >
    <VIcon icon="$iconCompleted" />
    <VTooltip location="bottom" activator="parent" open-delay="345">
      <span
        >Označi narudžbu
        <pre class="d-inline-block opacity-40">#{{ oid }}</pre>
        kao
      </span>
      <pre class="d-inline-block opacity-40"
        >{{ props.order?.completed ? "Nije gotova" : "Gotova" }}.</pre
      >
    </VTooltip>
  </VBtn>
</template>
<style lang="scss" scoped></style>
