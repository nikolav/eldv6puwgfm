import type { IUser } from "@/types";
import { Q_companiesList } from "@/graphql";
export const useQueryCompaniesList = (
  district: any = undefined,
  approvedOnly = false,
  listAll = false
) => {
  const district$ = ref();
  watchEffect(() => {
    district$.value = toValue(district);
  });
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  // const enabled = computed(() => !!district$.value);
  const enabled = ref(true);
  const { result, load, refetch, loading } = useLazyQuery<{
    companiesList: IUser[];
  }>(
    Q_companiesList,
    {
      approved: approvedOnly,
      district: district$,
      all: listAll,
    },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      // fetchPolicy: "no-cache",
    }
  );
  const companies = computed(() => get(result.value, "companiesList") || []);
  const reload = async () => await refetch();
  onceMountedOn(enabled, load);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    // # crud
    companies,
    reload,

    // # flags
    enabled,
    loading,

    // # flags: sistem approved companies only
    approved: approvedOnly,
  };
};
