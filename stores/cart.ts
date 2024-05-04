import { M_ordersPlace } from "@/graphql";

export const useStoreCart = defineStore("cart", () => {
  const {
    key: { FLAG_CART_OPEN },
    stores: {
      cart: { initial },
    },
  } = useAppConfig();
  const store$ = useCookie("olUoAianvOtPeqeX", {
    default: () => initial,
  });

  const flags$$ = useStoreFlags();
  // @isOpen
  const cartIsOpen_ = computed(() => flags$$.isSet(FLAG_CART_OPEN));
  // @open
  const cartOpen = () => {
    flags$$.on(FLAG_CART_OPEN);
  };
  // @close
  const cartClose = () => {
    flags$$.off(FLAG_CART_OPEN);
  };

  // @products
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
  // @length
  const cartLength_ = computed(() => products_.value.length);
  // @isEmpty
  const cartIsEmpty_ = computed(() => 0 === products_.value.length);

  // @drop
  const cartDrop = (id: number) => {
    delete store$.value.items[id];
  };
  // @put
  const cartPut = (id: number, amount: any = 1) => {
    const amount_ = clampPositive(Number(amount));
    if (!amount_) {
      cartDrop(id);
      return;
    }
    store$.value.items[id] = amount_;
  };
  // @increase
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
  // @destroy
  const cartDestroy = () => {
    store$.value = { ...initial, items: {} };
  };
  // @has
  const cartHas = (...ids: any[]) =>
    every(ids, (id) => products_.value.includes(Number(id)));

  const { mutate: mutateOrdersPlace, loading } = useMutation(M_ordersPlace);
  // @sendOrder
  const sendOrder = async () => {
    if (cartIsEmpty_.value) return;
    return await mutateOrdersPlace(store$.value);
  };

  // @count
  const count = (pid: number | undefined) =>
    (null != pid ? store$.value.items[pid] : 0) || 0;

  const { products$ } = useQueryProductsPrices();
  // @total$
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
    total$,
    length: cartLength_,
    isEmpty: cartIsEmpty_,
    products: products_,

    // # crud
    put: cartPut,
    drop: cartDrop,
    increase: cartIncrease,
    destroy: cartDestroy,
    has: cartHas,
    count,
    sendOrder,

    // # ui
    isOpen: cartIsOpen_,
    open: cartOpen,
    close: cartClose,
    loading,
  };
});
