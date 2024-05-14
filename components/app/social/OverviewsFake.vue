<script setup lang="ts">
import fakeOverviews from "@/assets/fake-overviews-db.json";

const c0$ = useLocalStorage("FJffMgUzA37", () => random(90123, 901234));
const { count: c$, inc: counterIncrement } = useCounter(c0$.value);

const messageNew = () => ({
  user: sample(fakeOverviews["names"]),
  overview: sample(fakeOverviews["overviews"]),
});
const messages$ = ref(Array.from({ length: 4 }, messageNew));
const messagesUpdate = () => {
  messages$.value = [messageNew(), ...messages$.value];
};
const delayed = () => random(12345, 45678);
const overviewNew = () =>
  setTimeout(() => {
    counterIncrement();
    overviewNew();
  }, delayed());
onceMountedOn(true, overviewNew);
watch(c$, (count) => {
  if (!count) return;
  messagesUpdate();
});

const refVSheet = ref();
const { height: hOverviews } = useElementSize(refVSheet);

// @@eos
</script>
<template>
  <VCol
    offset-sm="2"
    class="grid grid-cols-[355px,1fr] !max-w-[920px] bg-stone-100 pa-3 rounded rounded-s-lg"
  >
    <!-- :cell-l -->
    <div>
      <VSheet ref="refVSheet" class="pa-2" rounded="lg" elevation="2">
        <VResponsive :aspect-ratio="16 / 9" class="*bgred text-center">
          <VCardTitle class="text-medium-emphasis">Prosečna ocena:</VCardTitle>
          <div class="mb-auto">
            <div class="d-flex items-center justify-center mt-2">
              <VIcon
                color="primary3-darken-1"
                style="font-size: 2.22rem"
                v-for="n in 5"
                :key="n"
                icon="$iconStar"
              />
            </div>
            <strong
              style="font-size: 2.22rem !important"
              class="border text-body-1 !font-mono bg-stone-200 d-inline-block pa-4 rounded-pill mt-3"
              >5/5</strong
            >
          </div>
          <VSpacer class="mb-4" />
          <VCardSubtitle style="font-size: 0.88rem">
            <span class="text-medium-emphasis">Na osnovu</span>
            <pre class="d-inline-block mx-1 font-bold">{{
              numberFormatLocale(c$)
            }}</pre>
            <span class="text-medium-emphasis">vaših recenzija.</span>
          </VCardSubtitle>
        </VResponsive>
      </VSheet>
    </div>
    <!-- :cell-r -->
    <div>
      <div
        :style="`height: ${hOverviews + 16}px !important`"
        class="pt-1 pb-3 overflow-auto scrollbar-thin-light space-y-3 overflow-x-hidden"
      >
        <TransitionGroup name="PANEL3">
          <div v-for="node in messages$" :key="node.overview">
            <VSheet rounded elevation="1" class="mx-5 pa-2">
              <h4>{{ node.user }}</h4>
              <VCardText>{{ node.overview }}</VCardText>
            </VSheet>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </VCol>
</template>
<style lang="scss" scoped></style>
