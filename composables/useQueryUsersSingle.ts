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
  const { result, load, refetch } = useLazyQuery<{
    usersById: TData;
  }>(
    Q_usersSingle,
    {
      uid: uid$,
    },
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const u$ = computed(() => get(result.value, "usersById"));
  const reload = async () => await refetch();
  const { runSetup } = useRunSetupOnce(async () => await load());
  onMounted(runSetup);

  return {
    user: u$,
    reload,
  };
};
