import type { IProduct } from "@/types";
import { Q_productsListExact } from "@/graphql";
export const useQueryProductsOnly = <TData = IProduct>(pids?: any) => {
  // pids: number[]

  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    key: { PRODUCTS_CHANGE },
  } = useAppConfig();
  const pids$ = ref<number[]>([]);
  watchEffect(() => {
    pids$.value = toValue(pids) || [];
  });
  const { result, load, refetch } = useLazyQuery<{
    productsListExact: TData[];
  }>(
    Q_productsListExact,
    {
      products: pids$,
    },
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const products$ = computed(
    () => get(result.value, "productsListExact") || []
  );
  const reload = async () => await refetch();
  onceMountedOn(true, async () => {
    await load();
    // await nextTick(reload);
  });
  const productsChanged$ = useGlobalVariable(PRODUCTS_CHANGE);
  watchEffect(async () => {
    if (productsChanged$.value) await reload();
  });

  return {
    // update `pids$` to reload
    products: pids$,
    // # crud
    products$,
    reload,
  };
};
