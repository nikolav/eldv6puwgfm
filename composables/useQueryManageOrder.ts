import type { IOrder } from "@/types";
import {
  Q_ordersOne,
  M_manageOrder,
  M_orderProductsStatusByCompany,
  Q_getOrderProductsStatusByCompany,
  M_orderProductsDeliveryDateByCompany,
  Q_getOrderProductsDeliveryDate,
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
    io: {
      IOEVENT_ORDER_UPDATED,
      IOEVENT_ORDER_PRODUCTS_STATUS,
      IOEVENT_ORDER_PRODUCTS_DELIVERY_AT,
    },
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

  // query products deliver date
  const {
    result: dResult,
    load: dLoad,
    refetch: dRefetch,
    loading: dLoading,
  } = useLazyQuery<{
    getOrderProductsDeliveryDate: Record<string, any>;
  }>(
    Q_getOrderProductsDeliveryDate,
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
  const productsDelivery = computed(
    () =>
      get(dResult.value, "getOrderProductsDeliveryDate") ||
      <Record<string, any>>{}
  );
  onceMountedOn(enabled, dLoad);

  const { mutate: mutateOrderData, loading: mutateLoading } =
    useMutation(M_manageOrder);
  const {
    mutate: mutateOrderProductsStatusByCompany,
    loading: prodStatusLoading,
  } = useMutation(M_orderProductsStatusByCompany);
  const { mutate: mutateOrderProductsDeliveryDate } = useMutation(
    M_orderProductsDeliveryDateByCompany
  );
  const updateProductsDeliveryDate = async (date: Date) =>
    await mutateOrderProductsDeliveryDate({
      oid: oid.value,
      uid: uid.value,
      date,
    });

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
      pLoading.value ||
      dLoading.value
  );
  watchProcessing(orderLoading);

  const ioevent = computed(() =>
    enabled.value ? `${IOEVENT_ORDER_UPDATED}${oid.value}` : ""
  );
  const pioevent = computed(() =>
    enabled.value ? `${IOEVENT_ORDER_PRODUCTS_STATUS}${oid.value}` : ""
  );
  const dioevent = computed(() =>
    enabled.value ? `${IOEVENT_ORDER_PRODUCTS_DELIVERY_AT}${oid.value}` : ""
  );
  watchEffect(() => useIOEvent(ioevent.value, refetch));
  watchEffect(() => useIOEvent(pioevent.value, pRefetch));
  watchEffect(() => useIOEvent(dioevent.value, dRefetch));
  return {
    // order
    order,
    orderData,
    loading: orderLoading,
    enabled,

    // order products status
    productsStatus,
    updateProductsStatus,

    // order products delivery date
    productsDelivery,
    updateProductsDeliveryDate,
  };
};
