export const useLocalStorageLikeDislikeTargets = () => {
  const {
    key: { LIKES_STORE, DISLIKES_STORE },
  } = useAppConfig();
  const likeTargets$ = useLocalStorage(
    `likes@${LIKES_STORE}`,
    () => <Record<string, boolean>>{},
    {
      initOnMounted: true,
    }
  );
  const dislikeTargets$ = useLocalStorage(
    `dislikes@${DISLIKES_STORE}`,
    () => <Record<string, boolean>>{},
    {
      initOnMounted: true,
    }
  );

  const setLiked = (target: string, flag = true) => {
    set(likeTargets$.value, target, flag);
  };
  const setDisliked = (target: string, flag = true) => {
    set(dislikeTargets$.value, target, flag);
  };

  const isLiked = (target: string) => true === get(likeTargets$.value, target);
  const isDisliked = (target: string) =>
    true === get(dislikeTargets$.value, target);

  return {
    likeTargets$,
    dislikeTargets$,
    setLiked,
    setDisliked,
    isLiked,
    isDisliked,
  };
};
