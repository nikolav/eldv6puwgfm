export const dataSortedByDateDesc = <TData = any>(
  data: any[],
  field: "created_at" | "updated_at" = "created_at"
) =>
  [...data].sort(
    (a, b) =>
      new Date(String(b[field])).getTime() -
      new Date(String(a[field])).getTime()
  );
