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
  const nodeHead = (c: string | undefined) => {
    if (!c) return;
    let node = nodes.find((node) => c === node.value()?.value);
    for (; node && nodeMain !== node; node = node.parent()) {
      if ("category" in node.value()) {
        return node;
      }
    }
  };
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

    // top category node
    nodeHead,

    // root; hold top categories
    nodeMain,

    // node @value
    nodeByValue,
  };
});
