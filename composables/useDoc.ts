import type { IDoc } from "@/types";
import { Q_docByDocId, M_docUpsert } from "@/graphql";
import { get, batchSet } from "@/utils";

export const useDoc = <TDoc = Record<string, any>>(
  doc_id: any = "",
  initialEnabled = true,
  graphqlOptions?: Record<string, any>
) => {
  const auth = useStoreApiAuth();
  const toggleEnabled = useToggleFlag(initialEnabled);
  const mounted$ = useMounted();
  const doc_id$ = ref();
  const enabled$ = computed(
    () =>
      !!(
        doc_id$.value &&
        mounted$.value &&
        toggleEnabled.isActive.value &&
        auth.token$
      )
  );
  watchEffect(() => {
    doc_id$.value = toValue(doc_id);
  });
  const { result, refetch, load, loading, error } = useLazyQuery<{
    docByDocId: IDoc<TDoc>;
  }>(
    Q_docByDocId,
    { doc_id: doc_id$ },
    {
      enabled: enabled$,
      pollInterval: useAppConfig().graphql.STORAGE_QUERY_POLL_INTERVAL,
      ...(graphqlOptions || {}),
      // fetchPolicy: "no-cache",
    }
  );
  const data$ = computed(
    () =>
      (enabled$.value ? get(result.value, "docByDocId") : undefined) ||
      <IDoc<TDoc>>{}
  );
  const reload = async () => await refetch();
  onceMountedOn(enabled$, load);

  const { mutate: mutateDocUpsert } = useMutation<IDoc<TDoc>>(M_docUpsert);

  const put = async (putData: Record<string, any>) => {
    if (!enabled$.value) return;
    // update clone
    const newData_ = batchSet(get(data$.value, "data"), putData);
    // console.log({ newData_ })
    await mutateDocUpsert({ data: newData_, doc_id });
  };

  const ioEvent$ = computed(() =>
    enabled$.value
      ? `${useAppConfig().io.IOEVENT_DOC_CHANGE_prefix}${doc_id}`
      : ""
  );

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  watchEffect(() => {
    useIOEvent(ioEvent$.value, reload);
  });

  return {
    doc_id$,

    // #crud
    data: data$,
    put,
    reload,

    // aliases
    commit: put,

    // #crud/read
    error,
    loading,
    IOEVENT: ioEvent$,
    enabled: enabled$,
    doc_id,

    // #on/off
    toggleEnabled,
  };
};
