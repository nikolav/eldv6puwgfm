export const priceFormatLocale = (value: number) =>
  new Intl.NumberFormat("sr-RS", {
    // style: "currency",
    // currency: "RSD",
    // maximumSignificantDigits: 5,
    // currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  }).format(value);

export const numberFormatLocale = (value: number) =>
  new Intl.NumberFormat("sr-RS", {
    style: "decimal",
    // currency: "RSD",
    // maximumSignificantDigits: 3,
    // currencyDisplay: "symbol",
    // minimumFractionDigits: 2,
  }).format(value);
