export const onceOn = (value$: any, callback: () => void) => {
  const onceCallback = once(callback);
  const initialized = computed(() => !!toValue(value$));
  watchEffect(() => {
    if (initialized.value) onceCallback();
  });
  return initialized;
};
