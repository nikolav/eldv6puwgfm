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
  const rating = computed(() => {
    let l = 0;
    const s = reduce(
      d.value,
      (res, val) => {
        if (0 < val) {
          res += val;
          l += 1;
        }
        return res;
      },
      0
    );
    return l ? Math.round(s / l) : 0;
  });

  const rate = async (r: any) => {
    if (!(0 <= r)) return;
    try {
      await put({ [`${topic}.${rid$.value.key}`]: r });
      set(rid$.value, `val.${topic}`, r);
    } catch (error) {
      // pass
    }
  };

  const clear = async () => {
    try {
      await put({ [`${topic}.${rid$.value.key}`]: 0 });
      set(rid$.value, `val.${topic}`, 0);
    } catch (error) {
      // pass
    }
  };

  return {
    // # crud
    rating,
    rate,
    clear,

    // all
    store,

    // cache rated value
    val: val_,
  };
};
