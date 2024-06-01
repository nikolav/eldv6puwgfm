<script setup lang="ts">
import { useDisplay } from "vuetify";
const { width, mdAndUp } = useDisplay();

// @@eos
</script>
<template>
  <VContainer
    fluid
    :class="1333 < width ? '!px-32' : 1022 < width ? '!px-24' : 512 < width ? '!px-12' : '!px-1'"
  >
    <VRow>
      <VCol md="6">
        <VSheet
          :max-height="mdAndUp ? undefined : 322"
          rounded="xl"
          class="overflow-hidden"
          elevation="2"
        >
          <VImg
            height="322"
            cover
            src="~/assets/images/blog-link.jpg"
            class="position-relative"
          >
            <div
              class="shadow-lg py-3 px-5 bg-black/50 text-white/95 position-absolute w-full min-h-[82px] bottom-0 inset-x-0"
            >
              <VCardTitle>
                <h2
                  class="tracking-widest mb-3"
                  :style="`font-size: ${
                    522 < width
                      ? '2.72rem'
                      : 472 < width
                      ? '2rem'
                      : 372 < width
                      ? '1.55rem'
                      : '1rem'
                  }`"
                >
                  kantar.rs blog
                </h2>
              </VCardTitle>
              <VBtn
                :to="{ name: 'blog' }"
                variant="elevated"
                elevation="2"
                :size="472 < width ? 'large' : undefined"
                rounded="pill"
                color="primary-lighten-1"
                class="px-8 mb-2"
                height="64"
                :class="
                  372 < width
                    ? undefined
                    : 333 < width
                    ? 'scale-90'
                    : 'scale-75'
                "
              >
                <VIcon
                  v-if="522 < width"
                  class="opacity-40"
                  icon="$iconBook"
                  start
                  :size="34"
                />
                <span> Priče proizvođača </span>
              </VBtn>
            </div>
          </VImg>
        </VSheet>
      </VCol>
      <VCol md="6">
        <VSheet
          :min-height="mdAndUp ? undefined : 356"
          class="fill-height overflow-hidden"
          elevation="2"
          rounded="xl"
        >
          <div
            class="fill-height gap-3 pa-5 bg-primary-darken-2 grid-rows-2"
            :class="[
              572 < width
                ? 'grid grid-cols-4'
                : 512 < width
                ? 'grid grid-cols-3'
                : 'grid grid-cols-2',
            ]"
          >
            <VSheet
              color="transparent"
              elevation="2"
              rounded="lg"
              class="overflow-hidden"
            >
              <VImg
                class="fill-height opacity-25 hover:opacity-80 active:opacity-100 transition-opacity cursor-pointer"
                cover
                src="~/assets/images/blog-link.jpg"
              />
            </VSheet>
            <VSheet
              color="transparent"
              elevation="2"
              rounded="lg"
              class="overflow-hidden"
            >
              <VImg
                class="fill-height opacity-25 hover:opacity-80 active:opacity-100 transition-opacity cursor-pointer"
                cover
                src="~/assets/images/blog-link.jpg"
              />
            </VSheet>
            <VSheet
              v-if="512 < width"
              color="transparent"
              elevation="2"
              rounded="lg"
              class="overflow-hidden"
            >
              <VImg
                class="fill-height opacity-25 hover:opacity-80 active:opacity-100 transition-opacity cursor-pointer"
                cover
                src="~/assets/images/blog-link.jpg"
              />
            </VSheet>
            <VSheet
              v-if="572 < width"
              color="transparent"
              elevation="2"
              rounded="lg"
              class="overflow-hidden"
            >
              <VImg
                class="fill-height opacity-25 hover:opacity-80 active:opacity-100 transition-opacity cursor-pointer"
                cover
                src="~/assets/images/blog-link.jpg"
              />
            </VSheet>
            <div class="position-relative col-span-3">
              <NuxtLink :to="{ name: 'recepti' }">
                <VCardTitle
                  class="z-10 position-absolute start-2 bottom-4 !tracking-wide"
                >
                  <span
                    class="mb-3 link--prominent-base !underline !underline-offset-2"
                    :style="420 < width ? undefined : 'font-size: 1rem;'"
                  >
                    {{ 372 < width ? "Recepti naših korisnika" : "Recepti" }}
                  </span>
                </VCardTitle>
              </NuxtLink>
              <VSheet
                rounded="lg"
                elevation="2"
                color="transparent"
                style="background-position-y: -3.33rem"
                class="inset-0 opacity-[.25] !bg-[url('~/assets/images/blog-02.jpg')] bg-cover"
                position="absolute"
              >
              </VSheet>
            </div>
            <VSheet
              v-if="572 < width"
              color="transparent"
              elevation="2"
              rounded="lg"
              class="overflow-hidden"
            >
              <VImg
                class="fill-height opacity-25 hover:opacity-80 active:opacity-100 transition-opacity cursor-pointer"
                cover
                src="~/assets/images/blog-link.jpg"
              />
            </VSheet>
          </div>
        </VSheet>
      </VCol>
    </VRow>
  </VContainer>
</template>
<style lang="scss" scoped></style>
