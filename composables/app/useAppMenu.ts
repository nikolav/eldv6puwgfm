import menuCategories from "@/assets/menu-with-product-categories.json";

export const useAppMenu = () => {
  const {
    storage: { MENU_CATEGORY },
    stores: {
      main: { PAGE_CACHED },
    },
    products: { PRODUCT_CATEGORY_prefix },
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
  const main$$ = useStoreMain();
  const cache = assign(
    (title: string) => {
      main$$.put({ [PAGE_CACHED]: title });
    },
    {
      get: () => main$$.get(PAGE_CACHED),
      clear: () => main$$.put({ [PAGE_CACHED]: null }),
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

  const productCategoryByPageTitle = (title: string | undefined) => {
    const c = find(menuCategories, { title })?.productCategory || "";
    return c ? `${PRODUCT_CATEGORY_prefix}${c}` : "";
  };

  const destroy = () => {
    cache.clear();
    current$.value = null;
  };

  onMounted(() => {
    watch(
      () => route_.name,
      (routeName) => {
        if (routeName) current$.value = titleByRouteName(String(routeName));
      }
    );
  });

  return {
    current$,
    menuCategories,
    titleByRouteName,
    routeNameByTitle,
    productCategoryByPageTitle,
    cache,
    destroy,
  };
};
