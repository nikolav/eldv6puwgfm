import type {
  IPost,
  IPostInputData,
  OrNoValue,
  // OrNoValue
} from "@/types";
import { Q_postsList, M_postsUpsert, M_postsRemove } from "@/graphql";

export const useQueryPosts = (UID?: any) => {
  const {
    io: {
      IOEVENT_USER_POSTS_CHANGE_prefix,
      // IOEVENT_POST_CHANGE_SINGLE_prefix,
      // IOEVENT_POSTS_CHANGE,
    },
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const auth = useStoreApiAuth();
  const uid_ = computed(() => get(auth.user$, "id"));
  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(UID) || uid_.value;
  });
  const { result, refetch, load, loading, error } = useLazyQuery<{
    postsList: IPost[];
  }>(
    Q_postsList,
    {
      uid: uid$,
    },
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const posts_ = computed(() => get(result.value, "postsList") || []);
  onceMountedOn(true, load);
  const reload = async () => await refetch();

  const { mutate: mutatePostsUpsert, loading: upsLoading } =
    useMutation<IPost>(M_postsUpsert);
  const { mutate: mutatePostsRemove, loading: rmLoading } =
    useMutation<IPost>(M_postsRemove);

  const upsert = async (data: IPostInputData, id?: OrNoValue<number>) =>
    await mutatePostsUpsert({ data, id });
  const remove = async (id: number) => await mutatePostsRemove({ id });

  // @io/listen
  const ioEvent = computed(() =>
    uid$.value ? `${IOEVENT_USER_POSTS_CHANGE_prefix}${uid$.value}` : ""
  );
  watchEffect(() => useIOEvent(ioEvent.value, reload));
  // watchEffect(() => useIOEvent(ioEventPostsSingle.value, reload));
  // watchEffect(() => useIOEvent(ioEventPostsAny.value, reload));

  const { watchProcessing } = useStoreAppProcessing();
  const loading_ = computed(
    () => loading.value || upsLoading.value || rmLoading.value
  );
  watchProcessing(loading_);

  return {
    // switch posts manually
    uid$,

    // # crud
    posts: posts_,
    upsert,
    remove,
    reload,
    // alias
    commit: upsert,

    // # flags
    error,
    loading: loading_,

    // # io
    IO: ioEvent,
  };
};
