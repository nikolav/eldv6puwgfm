import { distance } from "fastest-levenshtein";

const DEFAULT_TEXT_SIMILARITY_DISTANCE = 10;

export const similarText =
  (source: string, dist: number = DEFAULT_TEXT_SIMILARITY_DISTANCE) =>
  (text: string) =>
    distance(source, text) < dist;
