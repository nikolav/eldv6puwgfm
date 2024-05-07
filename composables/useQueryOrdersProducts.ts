import type { IOrdersProducts } from "@/types";
import { Q_ordersReceivedProducts } from "@/graphql";

export const useQueryOrdersProducts = (OID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const order_id$ = ref();
  const enabled$ = computed(() => 0 < order_id$.value);
  watchEffect(() => {
    order_id$.value = toValue(OID);
  });
  const {
    result,
    load,
    refetch,
    loading: productsLoading,
  } = useLazyQuery<{
    ordersReceivedProducts: IOrdersProducts[];
  }>(
    Q_ordersReceivedProducts,
    {
      order_id: order_id$,
    },
    {
      enabled: enabled$,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      fetchPolicy: "no-cache",
    }
  );
  const products_ = computed(
    () => get(result.value, "ordersReceivedProducts") || []
  );
  const reload = async () => await refetch();
  onceMountedOn(enabled$, load);
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(productsLoading);

  return {
    order_id$,
    products: products_,
    reload,
  };
};
