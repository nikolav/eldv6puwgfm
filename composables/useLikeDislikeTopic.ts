export const useLikeDislikeTopic = (topic?: any) => {
  const topic$ = ref();
  watchEffect(() => {
    topic$.value = toValue(topic);
  });
  const ld = useStoreLikeDislike();
  const isLiked = computed(() => ld.isLiked(topic$.value));
  const isDisliked = computed(() => ld.isDisliked(topic$.value));
  const likesCount = computed(() => ld.likesCount(topic$.value));
  const dislikesCount = computed(() => ld.dislikesCount(topic$.value));
  const like = async (flag = true) => await ld.like(topic$.value, flag);
  const dislike = async (flag = true) => await ld.dislike(topic$.value, flag);
  return {
    store: ld.store,
    isLiked,
    isDisliked,
    likesCount,
    dislikesCount,
    like,
    dislike,
  };
};
