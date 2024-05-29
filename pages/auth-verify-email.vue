<script setup lang="ts">
import { schemaJwt } from "@/schemas";
import { Dump } from "@/components/dev";

const route = useRoute();
const key$ = ref();

onceMountedOn(
  () => true === schemaJwt.safeParse(String(route.query.key)).success,
  () => {
    key$.value = route.query.key;
  }
);

const toggleEmailVerifiedStatusSuccess = useToggleFlag();
const { accountVerifyEmail } = useQueryManageAccount();
const { watchProcessing } = useStoreAppProcessing();
const pc1 = useProcessMonitor();
watchProcessing(() => pc1.processing.value);
watch(key$, async (key) => {
  let result;
  if (key) {
    // jwt key provided, .be verify
    try {
      pc1.begin();
      result = get(await accountVerifyEmail(key), "data.accountsVeifyEmail");
    } catch (error) {
      pc1.setError(error);
    } finally {
      pc1.done();
    }
    if (!pc1.processing.value) {
      pc1.successful();
      if (result) {
        // user flagged email-verified, show success, redirect /
        toggleEmailVerifiedStatusSuccess.on();
        setTimeout(() => {
          navigateTo({ name: "index" });
        }, 4567);
      }
    }
  }
});
// @@eos
</script>
<template>
  <section class="page--auth-verify-emai">
    <VCardTitle
      v-if="toggleEmailVerifiedStatusSuccess.isActive.value"
      class="text-center"
    >
      <VIcon
        size="x-large"
        start
        color="success-darken-2"
        icon="$iconCheckboxOn"
      />
      <span>👏🏻 Vaša email adresa je uspešno potvrđena. 🏠</span>
    </VCardTitle>
  </section>
</template>
<style lang="scss" scoped></style>
