export const useStoreSearchConfig = defineStore("search-config", () => {
  const BUTTON_ID = "btnSearchConfig";
  const isOpen = ref(false);
  const open = () => {
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  return {
    BUTTON_ID,
    isOpen,
    open,
    close,
    toggle,
  };
});
