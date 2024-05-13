<script setup lang="ts">
import {
  AvatarThumb,
  ProvideProfileDataFull,
  ProvideCompanyData,
  VChipDistrict,
  TopicChat,
} from "@/components/app";
const props = defineProps<{ user: any }>();

// @@eos
</script>
<template>
  <ProvideProfileDataFull
    :user="user"
    v-slot="{ avatar, companyName, publicUrl, profile, topicCompanyChat }"
  >
    <VCard
      elevation="2"
      width="270"
      min-height="400"
      class="pa-2 space-y-2 !bg-stone-50"
    >
      <!-- title link -->
      <VCardItem>
        <VCardTitle>
          <NuxtLink :to="publicUrl.value" external target="_blank">
            <a class="text-primary-darken-1 link--prominent-base">
              {{ companyName.value }}
            </a>
          </NuxtLink>
        </VCardTitle>
      </VCardItem>
      <!-- avatar -->
      <div class="__placer__ text-center">
        <AvatarThumb :size="122" :force="avatar.value" />
      </div>
      <!-- district -->
      <div class="__placer__ text-center">
        <VChipDistrict
          class="mx-auto"
          :district="`Okrug: ${profile.value?.district}`"
        />
      </div>
      <!-- about -->
      <VCardText>
        <p class="line-clamp-3 indent-3">
          {{ profile.value?.about }}
        </p>
      </VCardText>
      <VCardActions>
        <TopicChat
          :title="companyName.value"
          :topic="topicCompanyChat.value"
          color="white"
        />
        <VSpacer />
        <ProvideCompanyData :com="user" v-slot="{ company }">
          <VBadge
            class="me-4"
            location="end"
            :offset-x="-3"
            :content="len(company?.products)"
            color="accent1-lighten-3"
            v-if="!isEmpty(company?.products)"
          >
            <VIcon :size="33" color="primary2-darken-2" icon="$iconBoxes" />
            <VTooltip
              text="Lager"
              location="bottom"
              open-delay="345"
              activator="parent"
            />
          </VBadge>
        </ProvideCompanyData>
      </VCardActions>
    </VCard>
  </ProvideProfileDataFull>
</template>
<style lang="scss" scoped>
</style>
