import { M_ordersPlace } from "@/graphql";

export const useStoreCart = defineStore("cart", () => {
  const {
    stores: {
      cart: { initial },
    },
    key: { FLAG_CART_OPEN },
  } = useAppConfig();
  const store$ = ref(initial);

  const $$flags = useStoreFlags();
  const cartIsOpen_ = computed(() => $$flags.isSet(FLAG_CART_OPEN));
  const cartOpen = () => {
    $$flags.on(FLAG_CART_OPEN);
  };
  const cartClose = () => {
    $$flags.off(FLAG_CART_OPEN);
  };

  const products_ = computed(() =>
    reduce(
      store$.value.items,
      (ls, amount, id) => {
        if (0 < amount) ls.push(Number(id));
        return ls;
      },
      <number[]>[]
    )
  );
  const cartLength_ = computed(() => products_.value.length);
  const cartIsEmpty_ = computed(() => 0 === products_.value.length);

  const cartDrop = (id: number) => {
    delete store$.value.items[id];
  };
  const cartPut = (id: number, amount = 1) => {
    const amount_ = clampPositive(amount);
    if (!amount_) {
      cartDrop(id);
      return;
    }
    store$.value.items[id] = amount_;
  };
  const cartIncrease = (id: number, amount = 1) => {
    if (!has(store$.value.items, id)) {
      cartPut(id, amount);
      return;
    }
    const amount_ = clampPositive(store$.value.items[id] + amount);
    if (!amount_) {
      cartDrop(id);
      return;
    }
    store$.value.items[id] = amount_;
  };
  const cartDestroy = () => {
    store$.value = { ...initial, items: {} };
  };
  const cartHas = (...ids: any[]) =>
    every(ids, (id) => products_.value.includes(Number(id)));

  const { mutate: mutateOrdersPlace } = useMutation(M_ordersPlace);
  const sendOrder = async () => {
    if (cartIsEmpty_.value) return;
    return await mutateOrdersPlace(store$.value);
  };

  const { products$ } = useQueryProductsAll();
  const total$ = computed(() =>
    reduce(
      products_.value,
      (res, pid) => {
        const price = Number(
          get(find(products$.value, { id: String(pid) }), "price")
        );
        if (0 < price) {
          res += store$.value.items[pid] * price;
        }
        return res;
      },
      0
    )
  );

  return {
    // # cart:cache
    store$,

    // # computed
    length: cartLength_,
    isEmpty: cartIsEmpty_,
    products: products_,

    // # crud
    put: cartPut,
    drop: cartDrop,
    increase: cartIncrease,
    destroy: cartDestroy,
    has: cartHas,
    sendOrder,

    // # ui
    isOpen: cartIsOpen_,
    open: cartOpen,
    close: cartClose,

    // # price total
    total$,
  };
});
