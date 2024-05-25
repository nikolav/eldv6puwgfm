import type { IOrderReceived } from "@/types";
import { Q_ordersReceived } from "@/graphql";

export const useQueryOrdersReceived = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_ORDERS_CHANGE },
  } = useAppConfig();
  const { watchProcessing } = useStoreAppProcessing();
  const auth = useStoreApiAuth();
  const uid = computed(() => get(auth.user$, "id"));
  const { result, load, refetch, loading } = useLazyQuery<{
    ordersReceived: IOrderReceived[];
  }>(Q_ordersReceived, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  const reload = async () => await refetch();
  const orders_ = computed(() => get(result.value, "ordersReceived") || []);
  onceMountedOn(uid, load);

  const ioEvent_ = computed(() =>
    uid.value ? `${IOEVENT_ORDERS_CHANGE}${uid.value}` : ""
  );
  // @io:listen
  watchEffect(() => useIOEvent(ioEvent_.value, reload));

  watchProcessing(loading);
  // #
  return {
    orders: orders_,
    reload,
    loading,
  };
};
