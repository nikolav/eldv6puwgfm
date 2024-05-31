const CONFIGKEY_ORDERS_SHOW_COMPLETED = "ordersShowCompleted";
export const useDocConfig = (UID: any) => {
  const uid = ref();
  watchEffect(() => {
    uid.value = toValue(UID);
  });
  const { userConfig } = useTopics();
  const docapi = useDoc<Record<string, any>>(() => userConfig(uid.value));
  const { data, commit } = docapi;
  const ordersShowCompleted = computed(() =>
    get(data.value, `data.${CONFIGKEY_ORDERS_SHOW_COMPLETED}`)
  );
  const toggleOrdersShowCompleted = async () =>
    await commit({
      [CONFIGKEY_ORDERS_SHOW_COMPLETED]: !ordersShowCompleted.value,
    });
  return { ordersShowCompleted, toggleOrdersShowCompleted, ...docapi };
};
