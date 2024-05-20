import type { IProduct } from "@/types";
import { Q_productsPromo } from "@/graphql";
export const useQueryProductsPromo = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const enabled = ref(true);
  const { result, load, refetch, loading } = useLazyQuery<{
    productsListPromo: IProduct[];
  }>(Q_productsPromo, undefined, {
    enabled,
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    // fetchPolicy: "no-cache",
  });
  const products = computed(() => result.value?.productsListPromo || []);
  const reload = async () => await refetch();
  onceMountedOn(enabled, load);
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);
  return {
    products,
    reload,
    loading,
    enabled,
  };
};
