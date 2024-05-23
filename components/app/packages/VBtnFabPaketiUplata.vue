<script setup lang="ts">
const auth = useStoreApiAuth();
const uid = computed(() => get(auth.user$, "id"));
const { domainPackagesPayment } = useTopics();
const { upload } = useFirebaseStorage(() => domainPackagesPayment(uid.value));
const { sendMail } = useSendMail();
const toggleFeedbackReceitCommited = useToggleFlag();
const {
  onChange,
  open: fileDialogOpen,
  reset: fileDialogReset,
} = useFileDialog({ accept: "image/*" });
const { watchProcessing } = useStoreAppProcessing();
const upl = useProcessMonitor();
watchProcessing(() => upl.processing.value);
// @photo: store receit, notify
onChange(async (lsFIles) => {
  let photo;
  const file = first(lsFIles);
  if (!file) return;
  try {
    upl.begin();
    photo = get(
      first(
        await upload({
          photo: {
            // prepend timestamp for quick date sort in firebase ui
            name: `${Date.now()}.${get(file, "name")}`,
            file,
          },
        })
      ),
      "photo"
    );

    if (!photo) throw "--error: receit upload failed";

    // @success, receit saved, trigger feedback
    toggleFeedbackReceitCommited.on();
  } catch (error) {
    upl.setError(error);
  } finally {
    upl.done();
  }
  if (!upl.error.value) {
    upl.successful();
    // send email notification
    await sendMail({
      template: "paketi-uplata",
      subject: "paketi:uplata",
      data: { photo },
    });
  }
  // reset state
  fileDialogReset();
});

// @@eos
</script>
<template>
  <section class="component--VBtnFabPaketiUplata">
    <!-- @signal: recetie saved -->
    <VSnackbar
      v-model="toggleFeedbackReceitCommited.isActive.value"
      color="transparent"
      variant="text"
      width="555"
    >
      <VAlert type="success" prominent elevation="4">
        <div class="d-flex justify-between items-center gap-4 sm:gap-8">
          <div class="d-flex items-center">
            <strong style="font-size: 1.88rem" class="pe-3">👌🏻</strong>
            <div class="text-center">
              <p>Vaš račun je uspešno prosleđen na uvid.</p>
              <p>Hvala što koristite kantar.rs</p>
            </div>
          </div>
          <VBtn
            @click="toggleFeedbackReceitCommited.off"
            color="on-success"
            variant="tonal"
            >ok</VBtn
          >
        </div>
      </VAlert>
    </VSnackbar>
    <VBtn
      :disabled="upl.processing.value"
      @click="fileDialogOpen"
      size="x-large"
      color="on-primary"
      icon
      variant="elevated"
      elevation="4"
    >
      <VIcon color="primary" size="large" icon="$iconReceitSend" />
      <VTooltip
        text="Pošalji priznanicu uplate paketa..."
        activator="parent"
        open-delay="345"
        location="start"
      />
    </VBtn>
  </section>
</template>
<style lang="scss" scoped></style>
