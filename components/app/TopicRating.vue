<script setup lang="ts">
const props = defineProps<{
  topic: string;
  small?: boolean | undefined;
  text?: boolean | string | undefined;
}>();
const {
  rating,
  ratingsCount,
  rate,
  val: ratingValue,
  store,
} = useTopicRating(props.topic);

// @@eos
</script>
<template>
  <section class="component--TopicRating">
    <div class="d-flex items-center">
      <strong v-if="!props.small" class="text-[112%] px-2 align-self-center">
        <pre>{{ rating }}</pre>
      </strong>
      <VDivider v-if="!props.small" vertical />
      <VRating
        v-bind="$attrs"
        :model-value="ratingValue"
        @update:model-value="rate"
        active-color="orange"
        hover
        clearable
        :density="props.small ? 'compact' : undefined"
        :size="props.small ? 'small' : undefined"
      />
    </div>
    <p
      v-if="false !== props.text"
      class="ps-2 text-medium-emphasis *text-center -translate-y-[.55rem]"
    >
      <small v-if="true !== props.text">{{ props.text }}</small>
      <template v-else>
        <small>
          broj ocena
          <pre class="text-black d-inline-block">{{ ratingsCount }}</pre>
        </small>
      </template>
    </p>
  </section>
</template>
<style lang="scss" scoped>
</style>
