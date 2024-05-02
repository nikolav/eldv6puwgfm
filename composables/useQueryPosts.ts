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
      // IOEVENT_POST_CHANGE_SINGLE_prefix,
      IOEVENT_USER_POSTS_CHANGE_prefix,
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
  const enabled_ = computed(() => auth.isAuth$);
  const { result, refetch, load, loading, error } = useLazyQuery<{
    postsList: IPost[];
  }>(
    Q_postsList,
    {
      uid: uid$,
    },
    {
      enabled: enabled_,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const posts_ = computed(
    () => (enabled_.value ? get(result.value, "postsList") : undefined) || []
  );
  onceMountedOn(enabled_, load);
  const reload = async () => await refetch();

  // const ioEventPostsSingle = computed(() =>
  //   enabled_.value ? `${IOEVENT_POST_CHANGE_SINGLE_prefix}${uid$.value}` : ""
  // );
  const ioEvent = computed(() =>
    enabled_.value ? `${IOEVENT_USER_POSTS_CHANGE_prefix}${uid$.value}` : ""
  );
  // const ioEventPostsAny = computed(() =>
  //   enabled_.value ? IOEVENT_POSTS_CHANGE : ""
  // );

  const { mutate: mutatePostsUpsert } = useMutation<IPost>(M_postsUpsert);
  const { mutate: mutatePostsRemove } = useMutation<IPost>(M_postsRemove);

  const upsert = async (data: IPostInputData, id?: OrNoValue<number>) => {
    if (enabled_.value) return await mutatePostsUpsert({ data, id });
  };
  const remove = async (id: number) => {
    if (enabled_.value) return await mutatePostsRemove({ id });
  };

  // @io/listen
  // watchEffect(() => useIOEvent(ioEventPostsSingle.value, reload));
  watchEffect(() => useIOEvent(ioEvent.value, reload));
  // watchEffect(() => useIOEvent(ioEventPostsAny.value, reload));

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
    loading,
    enabled: enabled_,

    // # io
    IO: ioEvent,
  };
};
