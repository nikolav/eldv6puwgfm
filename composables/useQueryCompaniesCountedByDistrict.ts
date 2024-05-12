import { Q_companiesCountedByDistrict } from "@/graphql";
export const useQueryCompaniesCountedByDistrict = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const enabled = ref(true);
  const { result, load, refetch, loading } = useLazyQuery<{
    companiesCountedByDistrict: Record<string, number>;
  }>(Q_companiesCountedByDistrict, undefined, {
    enabled,
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    // fetchPolicy: "no-cache",
  });
  const counted = computed(
    () =>
      get(result.value, "companiesCountedByDistrict") ||
      <Record<string, number>>{}
  );
  const reload = async () => await refetch();
  onceMountedOn(enabled, load);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    // # crud
    counted,
    reload,

    // # flags
    enabled,
    loading,
  };
};
