import { URL_VERIFY_EMAIL } from "@/config";
import {
  M_accountsArchive,
  M_accountsDrop,
  M_accountsSendVerifyEmailLink,
  M_accountsVeifyEmail,
} from "@/graphql";
export const useQueryManageAccount = () => {
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

  const accountArchive = async () =>
    await mutateAccountArchive({ uid: uid.value });
  const accountDrop = async () => await mutateAccountsDrop({ uid: uid.value });
  const accountSendVerifyEmailLink = async () =>
    await mutateSendVerifyEmailLink({ uid: uid.value, url: URL_VERIFY_EMAIL });
  const accountVerifyEmail = async (key: string) =>
    await mutateVerifyEmail({ data: { key } });

  //
  watchProcessing(
    () =>
      archLoading.value ||
      rmLoading.value ||
      lnemailLoading.value ||
      emailLoading.value
  );
  return {
    accountArchive,
    accountDrop,
    accountSendVerifyEmailLink,
    accountVerifyEmail,
  };
};
