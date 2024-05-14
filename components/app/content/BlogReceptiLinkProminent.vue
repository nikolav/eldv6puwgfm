<script setup lang="ts">
// @@eos
</script>
<template>
  <VContainer>
    <VRow>
      <VCol md="6">
        <VSheet rounded="xl" class="overflow-hidden" elevation="2">
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
                <h2 class="tracking-widest mb-3" style="font-size: 3.12rem">
                  KANTAR.RS blog
                </h2>
                <VBtn
                  :to="{ name: 'blog' }"
                  variant="elevated"
                  elevation="3"
                  size="x-large"
                  rounded="pill"
                  color="primary-lighten-1"
                  class="px-8 mb-3"
                  height="64"
                >
                  <VIcon class="opacity-40" icon="$iconBook" start :size="34" />
                  <h2 style="font-size: 1.43rem" class="ms-2 d-inline-block">
                    Priče naših proizvođača...
                  </h2>
                </VBtn>
              </VCardTitle>
            </div>
          </VImg>
        </VSheet>
      </VCol>
      <VCol md="6">
        <VSheet class="fill-height overflow-hidden" elevation="2" rounded="xl">
          <div
            class="grid grid-cols-4 fill-height gap-3 pa-5 bg-primary-darken-2"
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
            <div class="position-relative col-span-3">
              <NuxtLink :to="{ name: 'recepti' }">
                <VCardTitle
                  class="z-10 position-absolute start-2 bottom-4 !tracking-wide"
                >
                  <span
                    class="link--prominent-base !underline !underline-offset-2"
                  >
                    Omiljeni recepti naših korisnika...
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
<style lang="scss" scoped>
</style>
