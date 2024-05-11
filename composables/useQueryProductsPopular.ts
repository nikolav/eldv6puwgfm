import type { IProduct } from "@/types";
import { Q_productsListPopular } from "@/graphql";
export const useQueryProductsPopular = (L: any = 10) => {
  const length$ = ref<number>();
  watchEffect(() => {
    length$.value = toValue(L);
  });
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const enabled = computed(() => 0 < Number(length$.value));
  const { result, load, refetch, loading } = useLazyQuery<{
    productsListPopular: IProduct[];
  }>(
    Q_productsListPopular,
    {
      length: length$,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const products = computed(
    () => get(result.value, "productsListPopular") || []
  );
  const reload = async () => await refetch();
  onceMountedOn(enabled, load);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    length$,
    products,
    reload,
    enabled,
    loading,
  };
};
