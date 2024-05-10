import type { OrNoValue, IProduct } from "@/types";
import { Q_productsSearch } from "@/graphql";

type TProductsSearchQueryOrNone = OrNoValue<Record<string, any>>;

export const useQueryProductsSearch = (Q?: TProductsSearchQueryOrNone) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const query$ = ref<TProductsSearchQueryOrNone>();
  watchEffect(() => {
    query$.value = toValue(Q);
  });
  const enabled = computed(() => !!(query$.value && !isEmpty(query$.value)));
  const { result, load, refetch, loading } = useLazyQuery<{
    productsSearch: IProduct[];
  }>(
    Q_productsSearch,
    {
      query: query$,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      // fetchPolicy: "no-cache",
    }
  );
  const products = computed(() => get(result.value, "productsSearch") || []);
  const reload = async () => await refetch();
  onceMountedOn(enabled, load);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    // set manualy to fetch
    query$,

    // # crud
    products,
    reload,
    loading,
    enabled,
  };
};
