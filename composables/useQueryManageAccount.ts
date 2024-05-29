import { URL_VERIFY_EMAIL } from "@/config";
import {
  Q_accountsIncompleteProfileFields,
  M_accountsArchive,
  M_accountsDrop,
  M_accountsSendVerifyEmailLink,
  M_accountsVeifyEmail,
  M_accountsUpgradeUserCompany,
} from "@/graphql";
export const useQueryManageAccount = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_DOC_CHANGE_prefix },
  } = useAppConfig();

  const auth = useStoreApiAuth();
  const uid = computed(() => get(auth.user$, "id"));
  const { watchProcessing } = useStoreAppProcessing();
  const { mutate: mutateAccountArchive, loading: archLoading } =
    useMutation(M_accountsArchive);
  const { mutate: mutateAccountsDrop, loading: rmLoading } =
    useMutation(M_accountsDrop);
  const { mutate: mutateSendVerifyEmailLink, loading: lnemailLoading } =
    useMutation(M_accountsSendVerifyEmailLink);
  const { mutate: mutateVerifyEmail, loading: emailLoading } =
    useMutation(M_accountsVeifyEmail);
  const { mutate: mutateAccountUpgrade, loading: upgLoading } = useMutation(
    M_accountsUpgradeUserCompany
  );

  const accountArchive = async () =>
    await mutateAccountArchive({ uid: uid.value });
  const accountDrop = async () => await mutateAccountsDrop({ uid: uid.value });
  const accountSendVerifyEmailLink = async () =>
    await mutateSendVerifyEmailLink({ uid: uid.value, url: URL_VERIFY_EMAIL });
  const accountVerifyEmail = async (key: string) =>
    await mutateVerifyEmail({ data: { key } });
  const accountUpgrade = async () =>
    !auth.isCompany$
      ? await mutateAccountUpgrade({ uid: uid.value })
      : undefined;

  // query incomplete profile fields
  const {
    result: qpResult,
    load: qpLoad,
    refetch: qpRefetch,
    loading: qpLoading,
  } = useLazyQuery<{
    accountsIncompleteProfileFields: string[];
  }>(Q_accountsIncompleteProfileFields, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  onceMountedOn(true, qpLoad);
  const profileFieldsIncomplete = computed(
    () => qpResult.value?.accountsIncompleteProfileFields || []
  );

  const loading_ = computed(
    () =>
      archLoading.value ||
      rmLoading.value ||
      lnemailLoading.value ||
      emailLoading.value ||
      qpLoading.value ||
      upgLoading.value
  );
  watchProcessing(loading_);

  // @updates:profile reload
  const { authProfile } = useTopics();
  const ioevent = computed(
    () => `${IOEVENT_DOC_CHANGE_prefix}${authProfile(uid.value)}`
  );
  watchEffect(() => useIOEvent(ioevent.value, qpRefetch));

  return {
    accountArchive,
    accountDrop,
    accountSendVerifyEmailLink,
    accountVerifyEmail,
    accountUpgrade,
    // profile
    profileFieldsIncomplete,
    // flags
    loading: loading_,
  };
};
