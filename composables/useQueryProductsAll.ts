import type { IProduct } from "@/types";
import { Q_productsListAll } from "@/graphql";
export const useQueryProductsAll = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    key: { PRODUCTS_CHANGE },
  } = useAppConfig();
  const { result, load, refetch } = useLazyQuery<{
    productsListAll: IProduct[];
  }>(Q_productsListAll, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  const products$ = computed(() => get(result.value, "productsListAll") || []);
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
    products$,
    reload,
  };
};
