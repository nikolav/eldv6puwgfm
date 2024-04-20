import type { TDataLikesDislikesStore } from "@/types";

export const useStoreLikes = defineStore("likes", () => {
  const {
    key: { LIKES_STORE },
  } = useAppConfig();
  const auth = useStoreApiAuth();
  const mounted_ = useMounted();
  const enabled_ = computed(() => !!(auth.isAuth$ && mounted_.value));
  const { data, put, reload } = useDoc<TDataLikesDislikesStore>(LIKES_STORE);
  const store = computed(() => get(data.value, "data"));
  const { setLiked, isLiked } = useLocalStorageLikeDislikeTargets();
  const like = async (target: string, flag = true) => {
    if (!enabled_.value) return;
    if (isLiked(target) == flag) return;
    try {
      // increment/decrement likes@store
      await put({
        [target]: Math.max(
          0,
          (Number(get(store.value, target)) || 0) + (flag ? 1 : -1)
        ),
      });
      setLiked(target, flag);
    } catch (error) {
      // pass
    }
  };

  return {
    store,
    like,
    reload,
  };
});
