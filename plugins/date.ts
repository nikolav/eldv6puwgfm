import dayjs from "dayjs";

import pluginCustomParseFormat from "dayjs/plugin/customParseFormat";
import pluginUtc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

import type {
  IOrdersProducts,
  IOrderReceived,
  OrNoValue,
  IProduct,
} from "@/types";

dayjs.extend(pluginCustomParseFormat);
dayjs.extend(pluginUtc);
dayjs.extend(relativeTime);

// locale:sr
import "dayjs/locale/sr";
dayjs.locale("sr");

export default defineNuxtPlugin(() => {
  const formated_DMMMYYYY = (d: string) => dayjs(d).format("D. MMMM YYYY.");
  const productPriceForOrder = (
    order: IOrderReceived | undefined,
    p: IProduct
  ) => {
    if (!p) return;
    // assumes product belongs to provided order
    const dOrder = dayjs.utc(order?.created_at);
    const hlen = len(p.price_history);
    return !(1 < hlen)
      ? p.price
      : find(p.price_history, (_hist, i) =>
          i < hlen - 1
            ? dayjs.utc(p.price_history[i + 1].day).isAfter(dOrder)
              ? true
              : false
            : true
        )?.price;
  };
  const calcOrderTotalOriginal = (
    order: OrNoValue<IOrderReceived>,
    products: IOrdersProducts[]
  ) =>
    reduce(
      products,
      (res, p) => {
        // get order related price;
        // price where hist.day ~ order.date
        //  find hist.entry where (order.day < day).prev

        // order day{} @dajys
        const dOrder = dayjs.utc(order?.created_at);
        const hlen = len(p.price_history);
        // calc if there is price updates
        const price = !(1 < hlen)
          ? p.price
          : // if there are more hist entries compare dates
            //  if `next` is after order date get current node
            find(p.price_history, (_hist, i) =>
              i < hlen - 1
                ? dayjs.utc(p.price_history[i + 1].day).isAfter(dOrder)
                  ? true
                  : false
                : true
            )?.price;

        // if (price) {
        //   res += p.amount * price;
        // }
        res += p.amount * (price || 0);
        return res;
      },
      0
    );

  // calculate total with latest prices
  const calcOrderTotalLatest = (products: IOrdersProducts[]) =>
    reduce(
      products,
      (res, p) => {
        if (p?.price) {
          res += p.amount * p.price;
        }
        return res;
      },
      0
    );

  return {
    provide: {
      dayjs,
      date: dayjs,
      formated_DMMMYYYY,
      calcOrderTotalLatest,
      calcOrderTotalOriginal,
      productPriceForOrder,
    },
  };
});
