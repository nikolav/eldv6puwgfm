import type { IDataRating } from "@/types";

export const useTopicRating = (topic: string, _default = 1) => {
  const {
    key: { TOPIC_RATINGS, RATING_LOCAL },
  } = useAppConfig();

  // local cache; user key, values of topics rated
  const rid$ = useLocalStorage(RATING_LOCAL, () => ({
    key: idGen(),
    val: { [topic]: _default },
  }));
  // cache rated value
  const val_ = computed(() => get(rid$.value, `val.${topic}`));
  // ratings cache by topic
  const { data, put } = useDoc<IDataRating>(TOPIC_RATINGS);
  const store = computed(() => get(data.value, "data"));
  // topic ratings cache
  const d = computed(() => get(data.value, `data.${topic}`));
  const rating = computed(() =>
    !isEmpty(d.value)
      ? Math.round(
          reduce(d.value, (res, val) => (res += val), 0) / len(d.value)
        )
      : _default
  );

  const rate = async (r: number) => {
    if (!(0 <= r)) return;
    try {
      await put({ [`${topic}.${rid$.value.key}`]: r });
      set(rid$.value, `val.${topic}`, r);
    } catch (error) {
      // pass
    }
  };

  return {
    // # crud
    // average
    rating,
    // put
    rate,

    // all
    store,

    // cache rated value
    val: val_,
  };
};
