export const onceOn = (onVvalue$: any, callback: (...args: any[]) => void) => {
  // const onceCallback = once(callback);
  // const initialized = computed(() => !!toValue(value$));
  // watchEffect(() => {
  //   if (initialized.value) onceCallback();
  // });
  const initialized = ref();
  const onceCallback = once((...args: any[]) => {
    try {
      callback(...args);
    } catch (error) {
      throw error;
    } finally {
      nextTick(() => {
        initialized.value = true;
      });
    }
  });
  watchEffect(() => {
    const val = toValue(onVvalue$);
    if (val) onceCallback(val);
  });
  return readonly(initialized);
};
