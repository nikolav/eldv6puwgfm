import menuCategories from "@/assets/menu-with-product-categories.json";
import { find, get, assign } from "@/utils";

export const useAppMenu = () => {
  const {
    storage: { MENU_CATEGORY },
    stores: {
      main: { PAGE_CACHED },
    },
  } = useAppConfig();
  const route_ = useRoute();

  // track current page/title/category
  const current$ = useLocalStorage(
    MENU_CATEGORY,
    () => menuCategories[0]["title"],
    {
      initOnMounted: true,
    }
  );

  // cached page for navigation
  //  ex. return from auth.cancel
  const main$ = useStoreMain();
  const cache = assign(
    (title: string) => {
      main$.put({ [PAGE_CACHED]: title });
    },
    {
      get: () => main$.get(PAGE_CACHED),
      clear: () => main$.put({ [PAGE_CACHED]: null }),
    }
  );

  const titleByRouteName = (routeName: string) =>
    get(find(menuCategories, { to: routeName }), "title") ||
    menuCategories[0]["title"];

  const routeNameByTitle = (title: string) => {
    const r =
      get(find(menuCategories, { title }), "to") || menuCategories[0]["to"];
    return "/" !== r ? r : "index";
  };

  const destroy = () => {
    cache.clear();
    current$.value = null;
  };

  onMounted(() => {
    watch(
      () => route_.name,
      (routeName) => {
        if (null != routeName)
          current$.value = titleByRouteName(String(routeName));
      }
    );
  });

  return {
    current$,
    menuCategories,
    titleByRouteName,
    routeNameByTitle,
    cache,
    destroy,
  };
};
