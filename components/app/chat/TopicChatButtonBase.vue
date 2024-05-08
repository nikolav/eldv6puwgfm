<script setup lang="ts">
import { ChatControllsBasic } from "@/components/app";

const props = defineProps<{
  topic: any;
  isActive: boolean | undefined;
}>();
const isActive = computed(() => props.isActive);
const toggleChatControlls = useToggleFlag();

// @@eos
</script>
<template>
  <Teleport to="body">
    <VSlideYReverseTransition>
      <VBtn
        color="on-primary"
        size="x-large"
        variant="elevated"
        elevation="4"
        v-if="isActive"
        class="z-[9999] bottom-10 end-8"
        position="fixed"
        icon
      >
        <VIcon color="primary" size="x-large" icon="$iconPaperPlane" />
        <VMenu
          v-model="toggleChatControlls.isActive.value"
          :close-on-content-click="false"
          transition="slide-y-reverse-transition"
          width="333"
          activator="parent"
          location="top"
          :offset="[24, 12]"
        >
          <ChatControllsBasic
            @message-saved="toggleChatControlls.off"
            :topic="props.topic"
          >
            <template #submit-btn>
              <VBtn size="large" variant="text" color="primary" type="submit"
                >ok</VBtn
              >
            </template>
          </ChatControllsBasic>
        </VMenu>
      </VBtn>
    </VSlideYReverseTransition>
  </Teleport>
</template>
<style lang="scss" scoped>
</style>
