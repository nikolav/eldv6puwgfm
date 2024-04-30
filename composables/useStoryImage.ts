import type { IDoc, IStorageFileInfo, OrNoValue } from "@/types";
import { Q_postsImages, M_postsImagesDrop } from "@/graphql";

export const useStoryImage = (SID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORY_PHOTOS_CHANGE_prefix },
    key: { POST_IMAGES_prefix },
  } = useAppConfig();
  const sid$ = ref();
  watchEffect(() => {
    sid$.value = toValue(SID);
  });
  const enabled_ = computed(() => !!sid$.value);
  const { upload, publicUrl } = useApiStorage();
  const { tags } = useDocs();
  const { result, refetch, load, loading, error } = useLazyQuery<{
    postsImages: IDoc<IStorageFileInfo>[];
  }>(
    Q_postsImages,
    {
      id: sid$,
    },
    {
      fetchPolicy: "no-cache",
      enabled: enabled_,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const image = computed(() => first(get(result.value, "postsImages")));
  const src = computed(() => publicUrl(get(image.value, "data.file_id")));
  onceMountedOn(true, load);
  const reload = async () => await refetch();

  const { mutate: mutatePostsImagesDrop } = useMutation(M_postsImagesDrop);
  const dropImages = async () =>
    enabled_.value
      ? await mutatePostsImagesDrop({ id: sid$.value })
      : undefined;

  // set new story image
  const update = async (file: OrNoValue<File> = null) => {
    if (!enabled_.value) return;
    if (!file) return;
    if (image.value) {
      await dropImages();
    }
    const newImageId = Number(
      get(
        await upload({
          image: { file },
        }),
        "image.id"
      )
    );
    if (newImageId) {
      await tags(newImageId, {
        [`${POST_IMAGES_prefix}${sid$.value}:${newImageId}`]: true,
      });
    }
  };

  const ioEvent = computed(() =>
    enabled_.value ? `${IOEVENT_STORY_PHOTOS_CHANGE_prefix}${sid$.value}` : ""
  );
  watchEffect(() => useIOEvent(ioEvent.value, reload));

  return {
    sid$,
    image,
    src,
    update,
    dropImages,
    reload,
    error,
    loading,
    IO: ioEvent,
  };
};
