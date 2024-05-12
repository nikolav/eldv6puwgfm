import type { IStorageFileInfo } from "@/types";
export const useUserData = (UID?: any) => {
  const { userPhotos, ratingCompany, comChat } = useTopics();

  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(UID);
  });
  const { profile, avatar, fullName } = useProfileData(uid$);
  const { data: comImages } = useDocs<IStorageFileInfo>(() =>
    userPhotos(uid$.value)
  );

  // const profile = computed(() => get(data.value, "data"));
  const name_ = computed(() => profile.value?.name);
  const companyPublicUrl = useCompanyPublicUrl(uid$, name_);
  const topicCompanyRating = computed(() => ratingCompany(uid$.value));
  const topicCompanyChat = computed(() => comChat(uid$.value));

  return {
    uid$,
    profile,
    companyName: name_,
    companyPublicUrl,
    photos: comImages,

    // social data topics
    topicCompanyRating,
    topicCompanyChat,

    // profile:user
    fullName,
    avatar,
    // alias
    ownerFullName: fullName,
    publicUrl: companyPublicUrl,
    images: comImages,
  };
};
