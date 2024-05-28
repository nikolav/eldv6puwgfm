// import isEmpty from "lodash/isEmpty";
import { tree } from "nikolav-treets";
import menuItems from "~/assets/menu-subcategories/subcategories.json";

export const useStoreMenuCategoriesFull = defineStore("menu-full", () => {
  const {
    products: { PRODUCT_CATEGORY_prefix },
  } = useAppConfig();
  const t = new tree("#");
  t.json({ title: "@main", children: menuItems });

  const nodes = t.root().lsa();
  const nodesValues = nodes.map((node) => node.value());
  const nodeMain = t.root().first();

  const nodeByValue = (value: string) =>
    nodes.find((node) => value === node.value()?.value);

  const categoryByValue = (value: string | undefined) =>
    value && get(nodeByValue(value)?.value(), "title");

  const includedCategoriesPrefixed = (node: any) =>
    node.lsa([node]).map((node: any) => {
      const val = node.value();
      return `${PRODUCT_CATEGORY_prefix}${val.category || val.value}`;
    });

  const nodeHead = (c: string | undefined) => {
    if (!c) return;
    let node = nodes.find((node) => c === node.value()?.value);
    for (; node && nodeMain !== node; node = node.parent()) {
      if ("category" in node.value()) {
        return node;
      }
    }
  };

  const categoriesIncludedByValue = (value: string) => {
    const nodefrom = nodeByValue(value);
    return nodefrom ? includedCategoriesPrefixed(nodefrom) : [];
  };

  const categoriesTopInclusive = (ctg: string) => {
    const node = nodeMain.ls().find((node) => ctg === node.value()?.category);
    return node ? includedCategoriesPrefixed(node) : [];
  };

  return {
    nodes,
    nodesValues,
    categoryByValue,

    // categories,
    menuItems,

    // top category node
    nodeHead,

    // root; hold top categories
    nodeMain,

    // node @value
    nodeByValue,

    // list all categories inclded in subtree under node with provided .value
    //  for products search
    categoriesIncludedByValue,

    // list all included categories in subtree start from top node
    categoriesTopInclusive,
  };
});
