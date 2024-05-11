import { Q_productsTotalAmountOrdered } from "@/graphql";
export const useQueryProductsTotalAmountOrdered = (PID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const pid$ = ref();
  watchEffect(() => {
    pid$.value = toValue(PID);
  });
  const enabled = computed(() => !!pid$.value);
  const { result, load, refetch, loading } = useLazyQuery<{
    productsTotalAmountOrdered: { amount: number };
  }>(
    Q_productsTotalAmountOrdered,
    {
      pid: pid$,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      // fetchPolicy: "no-cache",
    }
  );
  const amount = computed(
    () => get(result.value, "productsTotalAmountOrdered.amount") || 0
  );
  const reload = async () => await refetch();
  onceMountedOn(enabled, load);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    // set manualy to fetch
    pid$,

    // # crud
    amount,
    reload,
    loading,
    enabled,
  };
};
