export const onceOn = (onVvalue$: any, callback: () => void) => {
  // const onceCallback = once(callback);
  // const initialized = computed(() => !!toValue(value$));
  // watchEffect(() => {
  //   if (initialized.value) onceCallback();
  // });
  const initialized = ref();
  const onceCallback = once(() => {
    try {
      callback();
    } catch (error) {
      throw error;
    } finally {
      nextTick(() => {
        initialized.value = true;
      });
    }
  });
  watchEffect(() => {
    if (toValue(onVvalue$)) onceCallback();
  });
  return readonly(initialized);
};
