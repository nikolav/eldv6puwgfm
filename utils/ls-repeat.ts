export const lsRepeat = (node: any, length: number) =>
  0 < length ? Array.from({ length }, () => node) : [];
