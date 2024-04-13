import md5 from "md5";

// # useStoreGravatar
export const useStoreGravatar = defineStore("gravatar", () => {
  const {
    stores: {
      gravatar: { BASE_URL, KEY, MODE, SIZE },
    },
  } = useAppConfig();
  const gmode = () =>
    sample(
      reduce(
        MODE,
        (res, val, key) => {
          if (true === val) res.push(key);
          return res;
        },
        <string[]>[]
      )
    );
  const email_ = () => `g.${idGen()}@gravatar.com`.toLocaleLowerCase();
  const url_ = () =>
    `${stripSlashesEnd(BASE_URL)}/${md5(email_())}?d=${gmode()}&size=${SIZE}`;

  // # gravatar.src
  const src$ = useLocalStorage(KEY, url_, {
    initOnMounted: true,
  });
  const toggleGravatarEnabled = useToggleFlag(true);
  const enabled_ = computed(() => toggleGravatarEnabled.isActive.value);
  const src_ = computed(() => (enabled_.value ? src$.value : ""));

  // # gravatar.refresh
  const refresh = () => {
    if (!enabled_.value) return;
    src$.value = url_();
  };
  // #
  return {
    // #crud
    src: src_,
    enabled: enabled_,
    refresh,

    // #toggle
    enable: toggleGravatarEnabled.on,
    disable: toggleGravatarEnabled.off,
  };
});
