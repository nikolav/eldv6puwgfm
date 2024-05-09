<script setup lang="ts">
import type { IAuthProfile } from "@/types";
// defs
const {
  app: { DEFAULT_NO_IMAGE },
} = useAppConfig();
const auth = useStoreApiAuth();

// flags
const togglePickAvatarMenu = useToggleFlag();

// refs
const file = ref();

// utils
const { watchProcessing } = useStoreAppProcessing();
const {
  files,
  open: fileDialogOpen,
  reset: fileDialogReset,
} = useFileDialog({ accept: "image/*" });
const { authProfile } = useTopics();

// stores
const {
  loading: profileUpdating,
  commit: profileCommit,
  data: profileData,
  reload: profileReolad,
} = useDoc<IAuthProfile>(authProfile(get(auth.user$, "id")));
const {
  loading: fsLoading,
  upload,
  uploadStatus: upl,
  remove: fsRemove,
} = useApiStorage();

// computed
const avatarFileIdCurrent = computed(() =>
  get(profileData.value, "data.avatar.data.file_id")
);
// calc url
const avatarCurrent = ref();
watchEffect(() => {
  avatarCurrent.value = resourceUrl(avatarFileIdCurrent.value);
});

// helpers
const avatarRemove_ = async () => {
  await fsRemove(avatarFileIdCurrent.value);
  await profileCommit({
    
    avatar: {},
  });
};
const avatarRemove = async () => {
  if (!avatarCurrent.value) return;
  await avatarRemove_();
};
const avatarSave = async () => {
  if (!file.value) return;
  try {
    if (avatarCurrent.value) {
      await avatarRemove_();
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
watchProcessing(
  () => upl.processing.value || profileUpdating.value || fsLoading.value
);
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
