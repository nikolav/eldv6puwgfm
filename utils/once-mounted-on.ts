export const onceMountedOn = (maybeRefOrValueOn: any, callback: () => void) => {
  const onceCallback = once(callback);
  const mounted = useMounted();
  const initialized = computed(
    () => !!(mounted.value && toValue(maybeRefOrValueOn))
  );
  watchEffect(() => {
    if (initialized) onceCallback();
  });
  return initialized;
};
