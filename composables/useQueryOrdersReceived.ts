import type { IOrderReceived } from "@/types";
import { Q_ordersReceived } from "@/graphql";

export const useQueryOrdersReceived = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_ORDERS_CHANGE },
  } = useAppConfig();
  const auth = useStoreApiAuth();
  const { result, load, refetch } = useLazyQuery<{
    ordersReceived: IOrderReceived[];
  }>(Q_ordersReceived, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  const reload = async () => await refetch();
  const orders_ = computed(() => get(result.value, "ordersReceived") || []);
  const { runSetup: queryStart } = useRunSetupOnce(async () => await load());
  onMounted(async () => {
    queryStart();
    // await nextTick(reload);
  });

  const ioEvent_ = computed(() =>
    auth.isAuth$ ? `${IOEVENT_ORDERS_CHANGE}${get(auth.user$, "id")}` : ""
  );
  // @io:listen
  watchEffect(() => useIOEvent(ioEvent_.value, reload));

  // #
  return {
    orders: orders_,
    reload,
  };
};
