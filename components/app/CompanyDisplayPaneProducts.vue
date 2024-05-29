<script setup lang="ts">
import type { OrNoValue, IStorageFileInfo, IDoc, IProduct } from "@/types";
import {
  AddToCartButtonPrimary,
  ProductCategory,
  ProductImages,
  ProductPublicUrl,
  TopicChat,
  VChipProductPrice,
} from "@/components/app";
const props = defineProps<{ user: any; profile: any }>();
const emit = defineEmits<{
  (e: "productsLength", length: OrNoValue<number>): void;
}>();
const PRODUCT_ITEM_MAX_HEIGHT = 122;
const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  key: { TOPIC_CHAT_PRODUCTS_prefix },
} = useAppConfig();
const products = computed(() => get(props.user, "products"));
watchEffect(() => emit("productsLength", products.value?.length));
const { $lightbox } = useNuxtApp();
const gallery = (p: IProduct, images: IDoc<IStorageFileInfo>[]) =>
  map(images, (node) => ({
    src: resourceUrl(node.data.file_id),
    caption: p.name,
  }));

// @@eos
</script>
<template>
  <section class="component--CompanyDisplayPaneProducts space-y-2 ps-3 mt-2">
    <template v-for="p in products" :key="p.id">
      <VHover open-delay="345">
        <template #default="{ isHovering, props: props_ }">
          <VSheet
            v-bind="props_"
            elevation="1"
            class="!grid grid-cols-[155px,1fr,auto] !bg-stone-50"
            :height="PRODUCT_ITEM_MAX_HEIGHT"
            :max-height="PRODUCT_ITEM_MAX_HEIGHT"
            rounded
          >
            <!-- image -->
            <ProductImages :product="p" v-slot="{ images }">
              <VImg
                rounded="s-lg"
                @click="
                  0 < images.length ? $lightbox.open(gallery(p, images)) : noop
                "
                class="h-full transition-transform hover:scale-105 opacity-90 hover:opacity-100 cursor-pointer *border-2 *border-white *shadow"
                :max-height="PRODUCT_ITEM_MAX_HEIGHT"
                cover
                :src="
                  images.length
                    ? resourceUrl(get(sample(images), 'data.file_id') || '')
                    : DEFAULT_NO_PRODUCT_IMAGE_FOUND
                "
              />
            </ProductImages>

            <!-- body -->
            <div
              class="*text-sm text-truncate d-flex flex-col justify-between pb-3 ps-3"
            >
              <ProductPublicUrl :product="p" v-slot="{ url }">
                <NuxtLink :to="url" external target="_blank"
                  ><VCardTitle
                    class="ps-3 font-sans font-weight-medium text-primary-darken-2 underline underline-offset-2"
                  >
                    {{ p.name }}
                  </VCardTitle></NuxtLink
                >
              </ProductPublicUrl>

              <div>
                <ProductCategory :product="p" v-slot="{ category }">
                  <VChip size="small" v-if="category" class="!w-fit">
                    <template #prepend>
                      <VIcon
                        start
                        icon="$iconFolderFilled"
                        class="!opacity-40 *ps-[2px] translate-x-1"
                      />
                    </template>
                    <small class="*text-medium-emphasis ps-1">{{
                      category
                    }}</small>
                    <VTooltip
                      activator="parent"
                      location="bottom"
                      open-delay="122"
                      text="Robna grupa"
                    />
                  </VChip>
                </ProductCategory>
                <VChip size="small" class="!w-fit ms-2">
                  <template #prepend>
                    <VIcon
                      start
                      icon="$iconBattery"
                      class="!opacity-30 *ps-[2px] translate-x-1"
                    />
                  </template>
                  <pre
                    class="ps-1">{{ p.stock }}<small class="ps-[3px]">{{ p.stockType }}</small></pre>
                  <VTooltip
                    activator="parent"
                    location="bottom"
                    open-delay="122"
                    text="Zaliha"
                  />
                </VChip>
              </div>
            </div>

            <!-- cell:end -->
            <div
              class="*bg-green-200 d-flex flex-col items-end justify-between pa-2"
            >
              <div class="d-flex items-center">
                <!-- @@ -->
                <span
                  class="invisible"
                  :class="isHovering ? '!visible' : undefined"
                >
                  <TopicChat
                    :title="p.name"
                    :topic="`${TOPIC_CHAT_PRODUCTS_prefix}${p.id}`"
                  />
                </span>
                <AddToCartButtonPrimary class="ms-5" :size="48" :product="p" />
              </div>
              <VChipProductPrice :product="p" />
            </div>
          </VSheet>
        </template>
      </VHover>
    </template>
  </section>
</template>
<style lang="scss" scoped></style>
