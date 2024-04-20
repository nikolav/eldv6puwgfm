export const useRunSetupOnceOnMounted = (callback: any) => {
  const mounted$ = useMounted();
  const toggleConfigured = useToggleFlag();
  watch(mounted$, async (mounted) => {
    if (true !== mounted) return;
    if (toggleConfigured.isActive.value) return;
    try {
      await callback();
    } catch (error) {
      // pass
    } finally {
      toggleConfigured.on();
    }
  });
  return readonly(toggleConfigured.isActive);
};
