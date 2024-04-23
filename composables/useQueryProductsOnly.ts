import type { IProduct, OrNoValue } from "@/types";
import { Q_productsListExact } from "@/graphql";
export const useQueryProductsOnly = (pids?: OrNoValue<number[]>) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    key: { PRODUCTS_CHANGE },
  } = useAppConfig();
  const pids$ = ref<number[]>([]);
  watchEffect(() => {
    pids$.value = toValue(pids) || [];
  });
  const { result, load, refetch } = useLazyQuery<{
    productsListAll: IProduct[];
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
  const { runSetup: queryStart } = useRunSetupOnce(async () => await load());
  onMounted(async () => {
    queryStart();
    await nextTick(reload);
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
