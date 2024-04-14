import type { IOrdersProducts } from "@/types";
import { Q_ordersReceivedProducts } from "@/graphql";

export const useQueryOrdersProducts = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    key: { APP_PROCESSING },
  } = useAppConfig();
  const order_id$ = ref();
  const enabled$ = computed(() => 0 < order_id$.value);
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
  const { runSetup: queryStart } = useRunSetupOnce(async () => await load());
  onMounted(queryStart);

  const flags$$ = useStoreFlags();
  watch(productsLoading, async (loading) => {
    if (loading) {
      flags$$.on(APP_PROCESSING);
      return;
    }
    await nextTick(() => flags$$.off(APP_PROCESSING));
  });

  // #
  return {
    // # set `order_id$.value` to list its products
    order_id$,
    //
    products: products_,
    reload,
  };
};
