//
import type {
  IPost,
  // OrNoValue
} from "@/types";
import { Q_postsList } from "@/graphql";

export const useQueryPosts = (UID?: any) => {
  const {
    // io: { IOEVENT_PRODUCTS_CHANGE_prefix },
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const auth = useStoreApiAuth();
  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(UID) || get(auth.user$, "id");
  });
  // const enabled$ = computed(() => !!auth.isAuth$);
  const enabled$ = computed(() => !!uid$);
  const { result, refetch, load, loading, error } = useLazyQuery<{
    postsList: IPost[];
  }>(
    Q_postsList,
    {
      uid: uid$,
    },
    {
      enabled: enabled$,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const posts_ = computed(
    () => (enabled$.value ? result.value?.postsList : undefined) || []
  );
  const reload = async () => await refetch();

  const { runSetup: queryStart } = useRunSetupOnce(load);
  watchEffect(() => {
    if (enabled$.value) queryStart();
  });

  // const ioEvent$ = computed(() =>
  //   enabled$.value ? `${IOEVENT_PRODUCTS_CHANGE_prefix}${uid$.value}` : ""
  // );

  // const { mutate: mutateProductsUpsert } =
  //   useMutation<IProduct>(M_productsUpsert);
  // const { mutate: mutateProductsRemove } =
  //   useMutation<IProduct>(M_productsRemove);

  // const upsert = async (
  //   data: IProductData,
  //   id: OrNoValue<number> = undefined
  // ) => {
  //   if (enabled$.value) return await mutateProductsUpsert({ data, id });
  // };
  // const remove = async (id: number) => {
  //   if (enabled$.value) return await mutateProductsRemove({ id });
  // };

  // @io/listen
  // watchEffect(() => useIOEvent(ioEvent$.value, reload));

  return {
    uid$,
    // # crud
    posts: posts_,
    // upsert,
    // remove,
    reload,

    // # flags
    error,
    loading,
    // IOEVENT: ioEvent$,
    enabled: enabled$,
  };
};
