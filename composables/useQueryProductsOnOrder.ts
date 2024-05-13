import type { IOrdersProducts } from "@/types";
import { Q_ordersProducts } from "@/graphql";

export const useQueryProductsOnOrder = (OID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const oid$ = ref();
  const enabled$ = computed(() => 0 < Number(oid$.value));
  watchEffect(() => {
    oid$.value = toValue(OID);
  });
  const { result, load, refetch, loading } = useLazyQuery<{
    ordersProducts: IOrdersProducts[];
  }>(
    Q_ordersProducts,
    {
      oid: oid$,
    },
    {
      enabled: enabled$,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      fetchPolicy: "no-cache",
    }
  );
  const products_ = computed(() => get(result.value, "ordersProducts") || []);
  const reload = async () => await refetch();
  onceMountedOn(enabled$, load);
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    oid$,
    products: products_,
    reload,
    loading,
  };
};
