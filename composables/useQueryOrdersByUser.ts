import type { IOrder } from "@/types";
import { Q_ordersListByUser } from "@/graphql";

export const useQueryOrdersByUser = (UID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(UID);
  });
  const enabled_ = computed(() => 0 < uid$.value);
  const { result, loading, load, refetch } = useLazyQuery<{
    ordersListByUser: IOrder[];
  }>(
    Q_ordersListByUser,
    {
      uid: uid$,
    },
    {
      enabled: enabled_,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const orders = computed(() => get(result.value, "ordersListByUser") || []);
  const reload = async () => await refetch();
  onceMountedOn(enabled_, load);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    uid$,
    orders,
    reload,
    loading,
  };
};
