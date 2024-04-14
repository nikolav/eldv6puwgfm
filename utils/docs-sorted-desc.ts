import type { IDoc } from "@/types";

export const docsSortedDesc = <TData = any>(
  docs: IDoc<TData>[],
  field: "created_at" | "updated_at" = "created_at"
) => {
  return [...docs].sort((docA, docB) => {
    return (
      new Date(String(docB[field])).getTime() -
      new Date(String(docA[field])).getTime()
    );
  });
};
