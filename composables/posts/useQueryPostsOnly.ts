import type { IPost } from "@/types";
import { Q_postsListOnly } from "@/graphql";
export const useQueryPostsOnly = (SIDS?: any) => {
  const sids = ref();
  watchEffect(() => {
    sids.value = toValue(SIDS);
  });
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_POST_CHANGE_SINGLE_prefix },
  } = useAppConfig();
  const enabled = computed(() => !isEmpty(sids.value));
  const { result, load, refetch, loading } = useLazyQuery<{
    postsListOnly: IPost[];
  }>(
    Q_postsListOnly,
    {
      sids,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      // fetchPolicy: "no-cache",
    }
  );
  const reload = async () => await refetch();
  const posts = computed(() => result.value?.postsListOnly || []);
  onceMountedOn(enabled, load);

  const loading_ = computed(() => loading.value);
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading_);

  // ls io events for each post
  const ioevents = computed(() =>
    enabled.value
      ? map(sids.value, (sid) => `${IOEVENT_POST_CHANGE_SINGLE_prefix}${sid}`)
      : []
  );
  watchEffect(() =>
    forEach(ioevents.value, (event) => useIOEvent(event, reload))
  );

  return {
    // read
    posts,
    reload,
    // flags
    enabled,
    loading: loading_,
    // io
    IO: ioevents,
  };
};
