import type { IDoc, IStorageFileInfo, OrNoValue } from "@/types";
import { Q_postsImages, M_postsImagesDrop } from "@/graphql";

export const useStoryImage = (SID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORY_PHOTOS_CHANGE_prefix },
  } = useAppConfig();
  const sid$ = ref();
  watchEffect(() => {
    sid$.value = toValue(SID);
  });
  const enabled_ = computed(() => !!sid$.value);
  const { upload } = useApiStorage();
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
  const src = computed(() => resourceUrl(get(image.value, "data.file_id")));
  onceMountedOn(true, load);
  const reload = async () => await refetch();

  const { mutate: mutatePostsImagesDrop, loading: rmLoading } =
    useMutation(M_postsImagesDrop);
  const dropImages = async () =>
    enabled_.value
      ? await mutatePostsImagesDrop({ id: sid$.value })
      : undefined;

  // set new story image
  const { postImage } = useTopics();
  const update = async (file: OrNoValue<File> = null) => {
    if (!enabled_.value) return;
    if (!file) return;
    // drop old
    if (image.value) await dropImages();
    // set new
    const newImageId = Number(
      get(
        await upload({
          image: { file },
        }),
        "image.id"
      )
    );
    // bind new
    if (newImageId) {
      await tags(newImageId, {
        [postImage(sid$.value, newImageId)]: true,
      });
    }
  };

  const { watchProcessing } = useStoreAppProcessing();
  const loading_ = computed(() => loading.value || rmLoading.value);
  watchProcessing(loading_);

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
    loading: loading_,
    IO: ioEvent,
  };
};
