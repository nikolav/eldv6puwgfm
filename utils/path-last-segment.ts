import { get } from "@/utils";

const re = /^.*\/([^\/]*)$/;

export const pathLastSegment = (path: string) =>
  get(path.match(re), "[1]") || path;
