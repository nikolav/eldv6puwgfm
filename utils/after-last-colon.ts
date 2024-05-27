import { reAfterLastColon } from "./re";
import get from "lodash/get";
export const afterLastColon = (s: string) =>
  get(s.match(reAfterLastColon), "[1]") || s;
