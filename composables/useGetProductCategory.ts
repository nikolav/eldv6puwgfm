export const useGetProductCategory = (P?: any) => {
  const p$ = ref();
  watchEffect(() => {
    p$.value = toValue(P);
  });
  const {
    products: { PRODUCT_CATEGORY_prefix },
  } = useAppConfig();
  const { nodeHead, nodeByValue } = useStoreMenuCategoriesFull();

  const categoryFindTag = (product: any) =>
    find(product?.tags, (tag: string) =>
      tag.startsWith(PRODUCT_CATEGORY_prefix)
    );
  const categoryTitleTop = computed(() => {
    const c = categoryFindTag(p$.value);
    if (c) return get(nodeHead(afterLastColon(c))?.value(), "title");
  });
  const categoryTitle = computed(() => {
    const c = categoryFindTag(p$.value);
    if (c) return get(nodeByValue(afterLastColon(c))?.value(), "title");
  });
  return {
    categoryFindTag,
    categoryTitle,
    categoryTitleTop,
  };
};
