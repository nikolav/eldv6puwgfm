import type { ICompanyProfile, IStorageFileInfo } from "@/types";
export const useUserData = (UID: any = null) => {
  const {
    docs: { TAG_COMPANY_PROFILE_prefix, COM_PHOTOS_prefix },
  } = useAppConfig();

  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(UID);
  });
  const { doc_id$, data } = useDoc<ICompanyProfile>();
  watchEffect(() => {
    doc_id$.value = uid$.value
      ? `${TAG_COMPANY_PROFILE_prefix}${uid$.value}`
      : undefined;
  });

  const profile = computed(() => get(data.value, "data"));
  const name_ = computed(() => profile.value?.name);
  const companyPublicUrl = useCompanyPublicUrl(uid$, name_);

  const topicComImages_ = computed(() =>
    uid$.value ? `${COM_PHOTOS_prefix}${uid$.value}` : undefined
  );
  const { data: comImages } = useDocs<IStorageFileInfo>(topicComImages_);

  return {
    uid$,
    profile,
    companyName: name_,
    companyPublicUrl,
    photos: comImages,
  };
};
