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
    <p
      v-if="false !== props.text"
      class="px-[1rem] text-medium-emphasis text-center -translate-y-[.55rem]"
    >
      <small v-if="true !== props.text">{{ props.text }}</small>
      <template v-else>
        <small>
          broj ocena
          <pre class="text-black d-inline-block">{{ ratingsCount }}</pre>
          , prosek
          <pre class="text-black d-inline-block">{{ rating }}</pre>
        </small>
      </template>
    </p>
  </section>
</template>
<style lang="scss" scoped>
</style>
