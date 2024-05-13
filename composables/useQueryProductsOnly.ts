import type { IProduct } from "@/types";
import { Q_productsListExact } from "@/graphql";
export const useQueryProductsOnly = (pids?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const pids$ = ref<number[]>([]);
  watchEffect(() => {
    pids$.value = toValue(pids) || [];
  });
  const enabled = computed(() => !isEmpty(pids$.value));
  const { result, load, refetch } = useLazyQuery<{
    productsListExact: IProduct[];
  }>(
    Q_productsListExact,
    {
      products: pids$,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const products = computed(() => get(result.value, "productsListExact") || []);
  const reload = async () => await refetch();
  onceMountedOn(true, load);

  return {
    // update `pids$` to reload
    pids$,
    // # crud
    products,
    reload,
    enabled,
  };
};
