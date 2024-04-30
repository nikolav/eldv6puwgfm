import type { IDoc, IStorageFileInfo } from "@/types";
import { Q_postsImages, M_postsImagesDrop } from "@/graphql";

export const useStoryImage = (SID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORY_PHOTOS_CHANGE_prefix },
  } = useAppConfig();
  const sid$ = ref();
  const enabled_ = computed(() => !!sid$.value);
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
      enabled: enabled_,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const image = computed(() => first(get(result.value, "postsImages")));
  onceMountedOn(true, load);
  const reload = async () => await refetch();

  const { mutate: mutatePostsImagesDrop } = useMutation(M_postsImagesDrop);
  const dropImages = async () =>
    enabled_.value && (await mutatePostsImagesDrop({ id: sid$.value }));

  const ioEvent = computed(() =>
    enabled_.value ? `${IOEVENT_STORY_PHOTOS_CHANGE_prefix}${sid$.value}` : ""
  );
  watchEffect(() => useIOEvent(ioEvent.value, reload));
  return {
    sid$,
    image,
    dropImages,
    reload,
    error,
    loading,
  };
};
