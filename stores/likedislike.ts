type TKey = string | undefined;
const LIKEDISLIKE_cooike = "dXAmpsTirUMd";
const LIKEDISLIKE_CACHE_ID = "tzUEK8";
export const useStoreLikeDislike = defineStore("storeRRoTfaJQGScwzlu", () => {
  const key = useCookie(LIKEDISLIKE_cooike, { default: idGen });
  const { data, put: commit } = useDoc<{
    [topic: string]: {
      likes: Record<string, boolean>;
      dislikes: Record<string, boolean>;
    };
  }>(LIKEDISLIKE_CACHE_ID);
  const store = computed(() => get(data.value, "data"));
  const likesCount = (topic: TKey) => {
    return !topic
      ? 0
      : reduce(
          get(store.value, `${topic}.likes`) || {},
          (count, value) => (count += true === !!value ? 1 : 0),
          0
        );
  };
  const dislikesCount = (topic: TKey) => {
    return !topic
      ? 0
      : reduce(
          get(store.value, `${topic}.dislikes`) || {},
          (count, value) => (count += true === !!value ? 1 : 0),
          0
        );
  };
  const isLiked = (topic: TKey) =>
    topic && true === !!get(store.value, `${topic}.likes.${key.value}`);
  const isDisliked = (topic: TKey) =>
    topic && true === !!get(store.value, `${topic}.dislikes.${key.value}`);
  const like = async (topic: TKey, flag = true) => {
    if (!topic) return;
    let toggle = false;
    if (isLiked(topic) == flag) return;
    if (isDisliked(topic) && flag) {
      toggle = true;
    }
    await commit({
      ...(toggle ? { [`${topic}.dislikes.${key.value}`]: false } : undefined),
      [`${topic}.likes.${key.value}`]: flag,
    });
  };
  const dislike = async (topic: TKey, flag = true) => {
    if (!topic) return;
    let toggle = false;
    if (isDisliked(topic) == flag) return;
    if (isLiked(topic) && flag) {
      toggle = true;
    }
    await commit({
      ...(toggle ? { [`${topic}.likes.${key.value}`]: false } : undefined),
      [`${topic}.dislikes.${key.value}`]: flag,
    });
  };
  return {
    key,
    store,
    likesCount,
    dislikesCount,
    isLiked,
    isDisliked,
    like,
    dislike,
  };
});
