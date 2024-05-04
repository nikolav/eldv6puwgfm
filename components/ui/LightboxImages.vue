<script setup lang="ts">
import type { IDoc, IStorageFileInfo } from "@/types";
const props = defineProps<{
  images: IDoc<IStorageFileInfo>[];
  captions?: string[];
}>();
// import { ProductImages } from "@/components/app";
const { $lightbox } = useNuxtApp();
const gallery = computed(() =>
  map(props.images, (node, i) => ({
    src: resourceUrl(get(node, "data.file_id")),
    caption: get(props, `captions[${i}]`) || get(node, "data.description"),
  }))
);
const disabled = computed(() => isEmpty(props.images));
const onClick = () =>
  !disabled.value &&
  $lightbox.open(gallery.value, {
    mainClass: "!z-[1235]",
    hideScrollbar: false,
  });
const btnProps = {
  onClick,
  images: props.images,
  captions: props.captions,
};
// @@eos
</script>
 <template>
  <slot
    name="activator"
    :onClick="onClick"
    :images="props.images"
    :captions="props.captions"
    :disabled="disabled"
  >
    <VBtn color="primary" size="small" v-bind="btnProps">slike</VBtn>
  </slot>
</template>
<style lang="scss" scoped>
</style>
