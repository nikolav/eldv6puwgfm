import type { IOrdersProducts } from "@/types";
import { Q_ordersReceivedProducts } from "@/graphql";

export const useQueryOrdersProducts = (OID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    key: { APP_PROCESSING },
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
  onceMountedOn(true, load);
  const appProcessing$ = useGlobalFlag(APP_PROCESSING);
  watchEffect(() => {
    appProcessing$.value = productsLoading.value;
  });
  return {
    order_id$,
    products: products_,
    reload,
  };
};
