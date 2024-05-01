import type { TDataLikesDislikesStore } from "@/types";
export const useStoreDislikes = defineStore("dislikes", () => {
  const {
    key: { DISLIKES_STORE },
  } = useAppConfig();
  const mounted_ = useMounted();
  const enabled_ = computed(() => mounted_.value);
  const { data, put, reload } = useDoc<TDataLikesDislikesStore>(DISLIKES_STORE);
  const store = computed(() => get(data.value, "data"));
  const { setDisliked, isDisliked } = useStoreLocalStorageLikesDislikes();
  const dislike = async (target: string, flag = true) => {
    if (!enabled_.value) return;
    if (isDisliked(target) == flag) return;
    try {
      await put({
        [target]: Math.max(
          0,
          (get(store.value, target) || 0) + (flag ? 1 : -1)
        ),
      });
      setDisliked(target, flag);
    } catch (error) {
      // pass
    }
  };

  return {
    store,
    dislike,
    reload,
  };
});
