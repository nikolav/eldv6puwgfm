<script setup lang="ts">
import type { ICompanyProfile } from "@/types";
// defs
const {
  docs: { TAG_COMPANY_PROFILE_prefix },
  key: { APP_PROCESSING },
  app: { DEFAULT_NO_IMAGE },
} = useAppConfig();
const auth = useStoreApiAuth();

// flags
const appProcessing$ = useGlobalFlag(APP_PROCESSING);
const togglePickAvatarMenu = useToggleFlag();

// refs
const file = ref();

// utils
const {
  files,
  open: fileDialogOpen,
  reset: fileDialogReset,
} = useFileDialog({ accept: "image/*" });

// stores
const {
  loading: profileUpdating,
  commit: profileCommit,
  // debug
  data: profileData,
} = useDoc<ICompanyProfile>(
  `${TAG_COMPANY_PROFILE_prefix}${get(auth.user$, "id")}`
);
const {
  loading: fsLoading,
  upload,
  publicUrl,
  uploadStatus: upl,
  remove: fsRemove,
} = useApiStorage();

// computed
const avatarFileIdCurrent = computed(() =>
  get(profileData.value, "data.avatar.data.file_id")
);
const avatarCurrent = ref();
watchEffect(() => {
  avatarCurrent.value = publicUrl(avatarFileIdCurrent.value);
});

// helpers
const avatarRemove = async () => {
  if (!avatarCurrent.value) return;
  await fsRemove(avatarFileIdCurrent.value);
};
const avatarSave = async () => {
  if (!file.value) return;
  try {
    if (avatarCurrent.value) {
      await fsRemove(avatarCurrent.value);
      await profileCommit({
        avatar: {},
      });
    }
    const res = await upload({
      avatar: { file: file.value },
    });
    const fileId = get(res, "avatar.data.file_id");
    if (!fileId) return;
    // saved; commit profile
    await profileCommit({
      avatar: get(res, "avatar"),
    });
  } catch (error) {
    // pass
  }
};

// watch
watchEffect(() => {
  file.value = first(files.value);
});
watchEffect(() => {
  appProcessing$.value =
    upl.processing.value || profileUpdating.value || fsLoading.value;
});
watch(avatarCurrent, (url) => {
  if (url) {
    fileDialogReset();
    togglePickAvatarMenu.off();
  }
});
watch(file, (fd) => {
  if (fd) {
    avatarCurrent.value = undefined;
  }
});
// debug
// @@eos
</script>
<template>
  <VBtn
    class="end-3 hover:scale-[107%] opacity-80 hover:opacity-100"
    position="absolute"
    variant="elevated"
    color="white"
    elevation="2"
    :size="54"
    rounded="circle"
    icon
  >
    <VAvatar :size="52" :image="avatarCurrent || DEFAULT_NO_IMAGE" cover />
    <VTooltip
      activator="parent"
      open-delay="345"
      location="bottom"
      text="Slika za profil..."
    />
    <VMenu
      activator="parent"
      v-model="togglePickAvatarMenu.isActive.value"
      location="start top"
      :offset="[-68, 10]"
      location-strategy="connected"
      :close-on-content-click="false"
    >
      <VSheet
        rounded="lg"
        class="*pa-4 d-flex flex-col items-center pt-4"
        width="256"
        min-height="256"
      >
        <VBtn
          @click="togglePickAvatarMenu.off"
          position="absolute"
          class="top-1 end-1 z-[1]"
          icon
          variant="plain"
        >
          <VIcon icon="$close" />
        </VBtn>
        <FileDataUrl :file="file" v-slot="{ url }">
          <VBtn
            @click="fileDialogOpen"
            icon
            color="white"
            variant="elevated"
            size="168"
            rounded="circle"
            elevation="4"
            class="mt-2"
          >
            <VAvatar
              :image="avatarCurrent || url || DEFAULT_NO_IMAGE"
              color="primary"
              size="166"
              >1</VAvatar
            >
          </VBtn>
        </FileDataUrl>
        <VCardActions
          class="pt-5 gap-3 w-full *bg-red *px-4 flex-col items-center justify-center"
        >
          <VBtn
            :disabled="!file"
            @click="avatarSave"
            variant="tonal"
            class="px-4"
          >
            <VIcon start icon="$iconSave" /> postavi
          </VBtn>
          <VBtn
            :disabled="!avatarCurrent"
            @click="avatarRemove"
            variant="plain"
            density="comfortable"
            color="error"
          >
            <VIcon start icon="$iconTrash" /> obriši
          </VBtn>
          <VSpacer />
        </VCardActions>
      </VSheet>
    </VMenu>
  </VBtn>
</template>
<style lang="scss" scoped>
</style>
