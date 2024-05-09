import type { IUser } from "@/types";
export const useQueryProductsOnOrderWithDetails = (o: any) => {
  // <IOrder> o
  const oid$ = ref();
  watchEffect(() => {
    oid$.value = get(toValue(o), "id");
  });

  const { $calcOrderTotalOriginal } = useNuxtApp();
  const { products } = useQueryProductsOnOrder(oid$);
  const totalOriginal = computed(() =>
    $calcOrderTotalOriginal(o, products.value)
  );
  const companies = computed(() =>
    transform(
      products.value,
      (acc, p) => {
        if (!some(acc, (u) => u.id === p.user?.id)) acc.push(p.user!);
      },
      <IUser[]>[]
    )
  );

  return {
    products,
    totalOriginal,
    companies,
  };
};
