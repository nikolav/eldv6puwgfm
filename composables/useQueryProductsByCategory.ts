import type { IProduct } from "@/types";
import { Q_productsListByTags } from "@/graphql";
export const useQueryProductsByCategory = (c$?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_PRODUCTS_CHANGE_prefix },
  } = useAppConfig();
  const category$ = ref();
  const tags_ = computed(() => [category$.value]);
  const enabled_ = computed(() => every(tags_.value, (r$) => !!toValue(r$)));
  watchEffect(() => {
    category$.value = toValue(c$);
  });
  const { result, load, refetch, loading } = useLazyQuery<{
    productsListByTags: IProduct[];
  }>(
    Q_productsListByTags,
    {
      tags: tags_,
    },
    {
      enabled: enabled_,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const products = computed(
    () => get(result.value, "productsListByTags") || []
  );
  const reload = async () => await refetch();
  onceMountedOn(true, load);

  const ioevent_ = computed(() =>
    enabled_.value ? `${IOEVENT_PRODUCTS_CHANGE_prefix}${category$.value}` : ""
  );
  watchEffect(() => useIOEvent(ioevent_.value, reload));

  return {
    category$,
    products,
    reload,
    loading,
  };
};
