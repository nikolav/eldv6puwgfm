import isEmpty from "lodash/isEmpty";
import { tree } from "nikolav-treets";
import menuItems from "~/assets/menu-subcategories/subcategories.json";

export const useStoreMenuCategoriesFull = defineStore("menu-full", () => {
  const {
    products: { PRODUCT_CATEGORY_prefix },
  } = useAppConfig();
  const t = new tree("#");
  t.json({ title: "@main", children: menuItems });
  const nodeMain = t.root().first();
  const nodes = t.root().lsa();
  const nodeByValue = (value: string) =>
    nodes.find((node) => value === node.value()?.value);
  const categoryByValue = (value: string | undefined) =>
    isEmpty(nodes)
      ? undefined
      : value && get(nodeByValue(value)?.value(), "title");
  // all prefixed categories up to parent @model
  // const categories = (value: string | undefined) => {
  //   const cls = <string[]>[];
  //   if (value) {
  //     for (
  //       let node = nodeByValue(value);
  //       node && nodeMain != node;
  //       node = node.parent()
  //     ) {
  //       const val = node.value();
  //       cls.push(`${PRODUCT_CATEGORY_prefix}${val.category || val.value}`);
  //     }
  //   }
  //   return cls;
  // };
  return {
    nodes,
    categoryByValue,
    // categories,
    menuItems,
  };
});
