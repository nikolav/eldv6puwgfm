export const useCompanyPublicUrl = (
  mayberefComId: any,
  mayberefComName: any
) => {
  const url$ = ref();
  const {
    urls: { appPublic, comPages, QUERY },
  } = useAppConfig();
  watchEffect(() => {
    const name = toValue(mayberefComName);
    const cid = toValue(mayberefComId);
    if (!name || !cid) return;
    url$.value = `${trimEnd(appPublic, "/")}/${trim(
      comPages,
      "/"
    )}?${QUERY}=${encodeURIComponent(
      words(name).concat(String(cid)).join("-").toLocaleLowerCase()
    )}`;
  });

  return url$;
};
