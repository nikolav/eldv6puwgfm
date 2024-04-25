export const useProductPublicUrl = (mayberefPID: any, mayberefName: any) => {
  const url$ = ref();
  const {
    urls: { appPublic, productPages, QUERY },
  } = useAppConfig();
  watchEffect(() => {
    const name = toValue(mayberefName);
    const cid = toValue(mayberefPID);
    if (!name || !cid) return;
    url$.value = `${trimEnd(appPublic, "/")}/${trim(
      productPages,
      "/"
    )}?${QUERY}=${encodeURIComponent(
      words(name).concat(String(cid)).join("-").toLocaleLowerCase()
    )}`;
  });

  return url$;
};
