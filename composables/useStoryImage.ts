import type { IDoc, IStorageFileInfo } from "@/types";
import { Q_postsImages } from "@/graphql";

export const useStoryImage = (SID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const sid$ = ref();
  watchEffect(() => {
    sid$.value = toValue(SID);
  });
  const { result, refetch, load, loading, error } = useLazyQuery<{
    postsImages: IDoc<IStorageFileInfo>[];
  }>(
    Q_postsImages,
    {
      id: sid$,
    },
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const image = computed(() => first(get(result.value, "postsImages")));
  onceMountedOn(true, load);
  const reload = async () => await refetch();

  // const ioEvent = computed(() =>
  //   enabled_.value ? `${IOEVENT_USER_POSTS_CHANGE_prefix}${uid$.value}` : ""
  // );

  // @io
  // watchEffect(() => useIOEvent(ioEvent.value, reload));

  return {
    sid$,
    image,
    reload,
    error,
    loading,
  };
};
