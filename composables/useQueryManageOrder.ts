import type { IOrder } from "@/types";
import {
  Q_ordersOne,
  M_manageOrder,
  M_orderProductsStatusByCompany,
  Q_getOrderProductsStatusByCompany,
} from "@/graphql";
export const useQueryManageOrder = (OID?: any) => {
  const oid = ref();
  watchEffect(() => {
    oid.value = toValue(OID);
  });
  const auth = useStoreApiAuth();
  const uid = computed(() => get(auth.user$, "id"));
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_ORDER_UPDATED, IOEVENT_ORDER_PRODUCTS_STATUS },
  } = useAppConfig();
  const { watchProcessing } = useStoreAppProcessing();
  const enabled = computed(() => 0 < Number(oid.value));
  // query order
  const { result, load, refetch, loading } = useLazyQuery<{
    ordersOne: IOrder;
  }>(
    Q_ordersOne,
    {
      oid,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      // fetchPolicy: "no-cache",
    }
  );
  const order = computed(() => result.value?.ordersOne || undefined);
  onceMountedOn(enabled, load);
  // query order products status
  const {
    result: pResult,
    load: pLoad,
    refetch: pRefetch,
    loading: pLoading,
  } = useLazyQuery<{
    getOrderProductsStatusByCompany: Record<string, number>;
  }>(
    Q_getOrderProductsStatusByCompany,
    {
      oid,
      uid,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      // fetchPolicy: "no-cache",
    }
  );
  onceMountedOn(enabled, pLoad);
  const productsStatus = computed(
    () =>
      get(pResult.value, "getOrderProductsStatusByCompany") ||
      <Record<string, number>>{}
  );

  const { mutate: mutateOrderData, loading: mutateLoading } =
    useMutation(M_manageOrder);
  const {
    mutate: mutateOrderProductsStatusByCompany,
    loading: prodStatusLoading,
  } = useMutation(M_orderProductsStatusByCompany);

  const orderData = async (data: Record<string, any>) =>
    enabled.value ? await mutateOrderData({ oid: oid.value, data }) : undefined;
  const updateProductsStatus = async (status: number) =>
    enabled.value
      ? await mutateOrderProductsStatusByCompany({
          oid: oid.value,
          uid: uid.value,
          status,
        })
      : undefined;

  const orderLoading = computed(
    () =>
      loading.value ||
      mutateLoading.value ||
      prodStatusLoading.value ||
      pLoading.value
  );
  watchProcessing(orderLoading);

  const ioevent = computed(() =>
    enabled.value ? `${IOEVENT_ORDER_UPDATED}${oid.value}` : ""
  );
  const pioevent = computed(() =>
    enabled.value ? `${IOEVENT_ORDER_PRODUCTS_STATUS}${oid.value}` : ""
  );
  watchEffect(() => useIOEvent(ioevent.value, refetch));
  watchEffect(() => useIOEvent(pioevent.value, pRefetch));
  return {
    // order
    order,
    orderData,
    loading: orderLoading,
    enabled,
    // order products status
    productsStatus,
    updateProductsStatus,
  };
};
