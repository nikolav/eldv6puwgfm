<script setup lang="ts">
import type { ITopicChatMessage, IDoc, TDocData } from "@/types";
import { mergeProps } from "vue";

const props = defineProps<{
  doc: IDoc<TDocData<ITopicChatMessage>>;
  dateFormated: (d: string) => string;
  remove: (id: number) => void;
}>();
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const ownsMessage = (mid: any) => uid.value == mid;

// @@eos
</script>
<template>
  <VHover open-delay="345">
    <template #default="{ isHovering, props: props_ }">
      <VSheet
        :color="
          ownsMessage(props.doc.data?.uid) ? 'primary2-darken-1' : undefined
        "
        class="component--ChatSimpleMessage"
        :border="ownsMessage(props.doc.data?.uid) ? 's-lg' : undefined"
        v-bind="mergeProps($attrs, props_)"
        position="relative"
        rounded
      >
        <VForm
          v-if="isHovering"
          class="position-absolute top-1 end-1"
          @submit.prevent="() => props.remove(Number(props.doc.id))"
          autocomplete="off"
        >
          <VBtn
            type="submit"
            color="error"
            icon
            variant="plain"
            size="small"
            density="comfortable"
          >
            <VIcon icon="$iconTrash" />
          </VBtn>
        </VForm>
        <em class="ps-2 text-medium-emphasis">{{
          get(props.doc, "data.name")
        }}</em>
        <p class="tracking-wide leading-normal">
          {{ get(props.doc, "data.message") }}
        </p>
        <p class="text-end text-disabled mt-1">
          <small>{{ props.dateFormated(String(props.doc.created_at)) }}</small>
        </p>
      </VSheet>
    </template>
  </VHover>
</template>
<style lang="scss" scoped>
</style>
