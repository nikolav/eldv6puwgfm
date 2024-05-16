<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url: string;
    buttons?: any;
    title?: string;
    image?: string;
    iconSize?: number | undefined;
    linksColor: any;
  }>(),
  {
    linksColor: "primary-darken-1",
    buttons: {
      facebook: {
        icon: "$iconFacebook",
      },
      twitter: {
        icon: "$iconTwitterX",
      },
      linkedin: {
        icon: "$iconLinkedin",
      },
    },
  }
);

// @@eos
</script>
<template>
  <VBtn icon size="small" variant="plain">
    <VIcon icon="$iconShare" :size="iconSize || 'x-large'" />
    <VMenu activator="parent" location="center" :scrim="false" class="z-[1]">
      <VSheet elevation="3" class="pa-1 px-2" rounded="pill">
        <strong class="d-inline-flex gap-1">
          <SocialShare
            v-for="(node, network) in buttons"
            :key="network"
            :style="false"
            :label="false"
            :url="url"
            :network="network"
          >
            <template #icon>
              <VBtn variant="plain" icon size="x-small">
                <VIcon
                  :color="linksColor || ''"
                  :icon="node?.icon"
                  :size="node?.size || 18"
                />
                <VTooltip
                  location="bottom"
                  :text="String(network)"
                  open-delay="345"
                  activator="parent"
                />
              </VBtn>
            </template>
          </SocialShare>
        </strong>
      </VSheet>
    </VMenu>
  </VBtn>
</template>
<style lang="scss" scoped></style>
