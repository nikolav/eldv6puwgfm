import type { IAuthProfile, OrNoValue } from "@/types";
export const useProfileData = (UID?: any) => {
  const niceName = (
    firstName: OrNoValue<string>,
    lastName: OrNoValue<string>
  ) => startCase([firstName, lastName].filter(Boolean).join(" "));
  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(UID);
  });
  const { authProfile } = useTopics();
  const { data } = useDoc<IAuthProfile>(() => authProfile(uid$.value));
  const profile = computed(() => get(data.value, "data"));
  const avatar = computed(() =>
    resourceUrl(get(data.value, "data.avatar.data.file_id"))
  );
  const fullName = computed(() =>
    niceName(profile.value.firstName, profile.value.lastName)
  );
  return { profile, avatar, fullName };
};
