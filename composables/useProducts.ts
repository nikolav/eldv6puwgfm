//
import type { IProduct, IProductData, OrNoValue } from "@/types";
import {
  Q_productsByUser,
  M_productsUpsert,
  M_productsRemove,
} from "@/graphql";

export const useProducts = () => {
  const auth = useStoreApiAuth();
  const mounted$ = useMounted();
  const enabled$ = computed(() => !!(mounted$.value && auth.isAuth$));
  const userId$ = computed(() => get(auth.user$, "id"));

  const { result, refetch, load, loading, error } = useLazyQuery<{
    productsListByUser: IProduct[];
  }>(
    Q_productsByUser,
    {
      user_id: userId$,
    },
    {
      enabled: enabled$,
      pollInterval: useAppConfig().graphql.STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const products$ = computed(
    () => (enabled$.value ? result.value?.productsListByUser : undefined) || []
  );
  const reload = async () => await refetch();

  const { runSetup: queryStart } = useRunSetupOnce(load);
  watchEffect(() => {
    if (enabled$.value) queryStart();
  });

  const ioEvent$ = computed(() =>
    enabled$.value
      ? `${useAppConfig().io.IOEVENT_PRODUCTS_CHANGE_prefix}${toValue(userId$)}`
      : ""
  );

  const { mutate: mutateProductsUpsert } =
    useMutation<IProduct>(M_productsUpsert);
  const { mutate: mutateProductsRemove } =
    useMutation<IProduct>(M_productsRemove);

  const upsert = async (
    data: IProductData,
    id: OrNoValue<number> = undefined
  ) => {
    if (enabled$.value) return await mutateProductsUpsert({ data, id });
  };
  const remove = async (id: number) => {
    if (enabled$.value) return await mutateProductsRemove({ id });
  };

  // @io/listen
  watchEffect(() => useIOEvent(ioEvent$.value, reload));

  return {
    // # crud
    products: products$,
    upsert,
    remove,
    reload,

    // # flags
    error,
    loading,
    IOEVENT: ioEvent$,
    enabled: enabled$,
  };
};
