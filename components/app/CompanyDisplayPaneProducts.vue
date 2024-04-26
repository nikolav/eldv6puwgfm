<script setup lang="ts">
import type { OrNoValue, IStorageFileInfo, IDoc, IProduct } from "@/types";
import {
  ProductImages,
  VChipProductPrice,
  ProductPublicUrl,
  ProductCategory,
  TopicChat,
} from "@/components/app";
const emit = defineEmits<{
  (e: "productsLength", length: OrNoValue<number>): void;
}>();
const props = defineProps<{ user: any; profile: any }>();
const PRODUCT_ITEM_MAX_HEIGHT = 92;
const {
  app: { DEFAULT_NO_PRODUCT_IMAGE_FOUND },
  key: { APP_PROCESSING, TOPIC_CHAT_PRODUCTS_prefix },
} = useAppConfig();
const { publicUrl, loading } = useApiStorage(true, true);
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
watchEffect(() => {
  appProcessing$.value = loading.value;
});
const products = computed(() => get(props.user, "products"));
watchEffect(() => emit("productsLength", products.value?.length));
const { $lightbox } = useNuxtApp();
const gallery = (p: IProduct, images: IDoc<IStorageFileInfo>[]) =>
  map(images, (node) => ({
    src: publicUrl(node.data.file_id),
    caption: p.name,
  }));

// @@eos
</script>
<template>
  <section class="component--CompanyDisplayPaneProducts space-y-4 ps-4 mt-2">
    <template v-for="p in products" :key="p.id">
      <VHover open-delay="345">
        <template #default="{ isHovering, props: props_ }">
          <VSheet
            v-bind="props_"
            elevation="1"
            class="!grid grid-cols-[92px,1fr,auto] *!bg-red-200 *overflow-hidden"
            :max-height="PRODUCT_ITEM_MAX_HEIGHT"
            rounded
          >
            <ProductImages :product="p" v-slot="{ images }">
              <div class="*bg-green-200">
                <VImg
                  rounded="s"
                  @click="
                    0 < images.length
                      ? $lightbox.open(gallery(p, images))
                      : noop
                  "
                  class="h-full transition-transform hover:scale-105 opacity-90 hover:opacity-100 cursor-pointer *border-2 *border-white *shadow"
                  :max-height="PRODUCT_ITEM_MAX_HEIGHT"
                  cover
                  :src="
                    images.length
                      ? publicUrl(get(sample(images), 'data.file_id') || '')
                      : DEFAULT_NO_PRODUCT_IMAGE_FOUND
                  "
                />
              </div>
            </ProductImages>
            <div
              class="*text-sm text-truncate d-flex flex-col justify-between pb-3 ps-4"
            >
              <ProductPublicUrl :product="p" v-slot="{ url }">
                <NuxtLink :to="url" external target="_blank"
                  ><a
                    class="hover:scale-[102%] d-inline-block transition-transform font-sans font-weight-medium text-primary-darken-2 underline underline-offset-2"
                    >{{ p.name }}</a
                  ></NuxtLink
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
            <div
              class="*bg-green-200 d-flex flex-col items-end justify-between pa-1"
            >
              <VChipProductPrice :product="p" />
              <span
                class="invisible me-2"
                :class="isHovering ? '!visible' : undefined"
              >
                <TopicChat
                  class="scale-[92%]"
                  :title="p.name"
                  :topic="`${TOPIC_CHAT_PRODUCTS_prefix}${p.id}`"
                />
              </span>
            </div>
          </VSheet>
        </template>
      </VHover>
    </template>
  </section>
</template>
<style lang="scss" scoped>
</style>
