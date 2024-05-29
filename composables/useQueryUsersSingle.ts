import type { IUser } from "@/types";
import { Q_usersSingle } from "@/graphql";
export const useQueryUsersSingle = <TData = IUser>(mayberefUID?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(mayberefUID);
  });
  const enabled = computed(() => 0 < Number(uid$.value));
  const user = computed(() => get(result.value, "usersById"));
  const { result, load, refetch, loading } = useLazyQuery<{
    usersById: TData;
  }>(
    Q_usersSingle,
    {
      uid: uid$,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const reload = async () => await refetch();
  onceMountedOn(true, load);
  return {
    user,
    reload,
    loading,
    enabled,
  };
};
