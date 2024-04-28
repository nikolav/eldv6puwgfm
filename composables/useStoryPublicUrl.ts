export const useStoryPublicUrl = (
  mayberefStoryId: any,
  mayberefStoryTitle: any
) => {
  const url$ = ref();
  const {
    urls: { appPublic, QUERY, storyPages },
  } = useAppConfig();
  watchEffect(() => {
    const name = toValue(mayberefStoryTitle);
    const sid = toValue(mayberefStoryId);
    if (!name || !sid) return;
    url$.value = `${trimEnd(appPublic, "/")}/${trim(
      storyPages,
      "/"
    )}?${QUERY}=${encodeURIComponent(
      words(name).concat(String(sid)).join("-").toLocaleLowerCase()
    )}`;
  });

  return url$;
};
