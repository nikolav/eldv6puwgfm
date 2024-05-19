import { Q_packagesIsPromoted, M_packagesSetPromoted } from "@/graphql";
export const useQueryProductPromo = (PID?: any) => {
  const pid$ = ref();
  watchEffect(() => {
    pid$.value = toValue(PID);
  });
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_PACKAGES_PROMOTED_prefix },
  } = useAppConfig();
  const enabled = computed(() => !!pid$.value);
  const { result, load, refetch, loading } = useLazyQuery<{
    packagesIsPromoted: boolean;
  }>(
    Q_packagesIsPromoted,
    {
      pid: pid$,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      // fetchPolicy: "no-cache",
    }
  );
  const isPromoted = computed(() => result.value?.packagesIsPromoted || false);
  const reload = async () => await refetch();
  onceMountedOn(enabled, load);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  const ioevent = computed(() =>
    enabled.value ? `${IOEVENT_PACKAGES_PROMOTED_prefix}${pid$.value}` : ""
  );
  watchEffect(() => useIOEvent(ioevent.value, reload));

  const { mutate: mutateSetPromoted } = useMutation(M_packagesSetPromoted);
  const setPromoted = async (status = true) =>
    enabled.value
      ? await mutateSetPromoted({ pid: pid$.value, status })
      : undefined;

  return {
    isPromoted,
    setPromoted,
    reload,
    loading,
    enabled,
  };
};
