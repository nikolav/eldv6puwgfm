export const useAppMounted = () => {
  const {
    key: { APP_MOUNTED },
  } = useAppConfig();
  return useState(APP_MOUNTED, False);
};
