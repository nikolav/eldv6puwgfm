export const useLikesDislikes = (topic: any = "") => {
  const target$ = ref("");
  watchEffect(() => {
    target$.value = toValue(topic);
  });
  const { isLiked, isDisliked } = useStoreLocalStorageLikesDislikes();
  const likes = useStoreLikes();
  const dislikes = useStoreDislikes();
  const isLiked_ = computed(() => isLiked(target$.value));
  const isDisliked_ = computed(() => isDisliked(target$.value));
  const countLikes = computed(() => get(likes.store, target$.value) || 0);
  const countDislikes = computed(() => get(dislikes.store, target$.value) || 0);
  const like = async (flag = true) => {
    if (isDisliked_.value && flag) {
      await dislikes.dislike(target$.value, false);
    }
    await likes.like(target$.value, flag);
  };
  const dislike = async (flag = true) => {
    if (isLiked_.value && flag) {
      await likes.like(target$.value, false);
    }
    await dislikes.dislike(target$.value, flag);
  };

  return {
    // @Ref
    target$,
    //
    like,
    dislike,
    count: {
      likes: countLikes,
      dislikes: countDislikes,
    },
    isLiked: isLiked_,
    isDisliked: isDisliked_,
    likes,
    dislikes,
  };
};
