<script setup lang="ts">
const props = defineProps<{
  close: () => void;
  menuItem: Record<string, any>;
}>();

// menu tree
const { nodeMain } = useStoreMenuCategoriesFull();

// current node
const main = computed(() =>
  nodeMain
    .ls()
    .find((node) => props.menuItem?.category === node.value()?.category)
);
const dataNodeMain = computed(() => main.value?.value());

// subcategory node list item @hover
const nodeSub = ref();

const refVCardMenuPopup = ref();
onClickOutside(refVCardMenuPopup, props.close);
// @@eos
</script>
<template>
  <VCard
    elevation="3"
    rounded="be-xl"
    ref="refVCardMenuPopup"
    class="component--VCardMenuPopup w-full !bg-stone-50 pa-0 ma-0 border-primary border-opacity-100 bg--popup"
    border="t-lg"
  >
    <!-- 

      <VCardTitle
        style="font-size: 1.72rem"
        class="opacity-75 !tracking-wider d-flex"
      >
        <VSpacer />
        <VSpacer />
        <span>
          {{ dataNodeMain?.title }}
        </span>
        <VSpacer />
      </VCardTitle> 

    -->
    <VContainer class="pa-0 ma-0" fluid>
      <VRow class="pa-0 ma-0">
        <VCol md="5">
          <VList
            bg-color="transparent"
            lines="one"
            density="comfortable"
            class="py-0"
            rounded
            color="primary"
          >
            <template
              v-for="node in main?.ls() || []"
              :key="node.value().value"
            >
              <VListItem
                :active="false"
                :to="{
                  name: dataNodeMain.category,
                  query: { q: node.value().value },
                }"
                link
                @mouseenter="nodeSub = node"
              >
                <VCardSubtitle
                  style="font-size: 92%"
                  class="text-primary-darken-2 text-medium-emphasis"
                  >{{ node.value().title }}</VCardSubtitle
                >
              </VListItem>
            </template>
          </VList>
        </VCol>
        <VCol md="7">
          <VChipGroup v-if="!isEmpty(nodeSub?.ls())" column>
            <VChip
              v-for="node in nodeSub.ls()"
              :key="node.value().value"
              link
              :to="{
                name: dataNodeMain.category,
                query: { q: node.value().value },
              }"
              variant="elevated"
              color="primary"
              class="bg-primary2"
              size="large"
            >
              {{ node.value().title }}
            </VChip>
          </VChipGroup>
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
</template>
<style lang="scss" scoped>
.bg--popup {
  background-image: url("~/assets/images/carpet-menu.png") !important;
  background-position-y: bottom !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
</style>
