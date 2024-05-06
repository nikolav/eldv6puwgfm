export const useStoreAppProcessing = defineStore("appProcessing", () => {
  const {
    key: { APP_PROCESSING },
  } = useAppConfig();
  const appProcessing$ = useGlobalFlag(APP_PROCESSING);
  const watchAll$ = ref<Ref[]>([]);
  const processing = computed(() =>
    some(watchAll$.value, (w$) => !!toValue(w$))
  );
  const addWatch = (...args: Ref[]) => {
    watchAll$.value.push(...args);
  };
  watchEffect(() => {
    appProcessing$.value = processing.value;
  });
  return {
    processing,
    addWatch,
  };
});
