// import natural from "natural";
// import random from "lodash/random";
// import words from "lodash/words";
// import sampleSize from "lodash/sampleSize";

// const tokenizer = new natural.WordTokenizer();
// const extractKeywordsTop = (longSentence: string) => {
//   const tokens = tokenizer.tokenize(longSentence);
//   const frequency = <Record<string, number>>{};
//   tokens.forEach((token) => {
//     if (frequency[token]) {
//       frequency[token]++;
//     } else {
//       frequency[token] = 1;
//     }
//   });
//   const sorted = Object.entries(frequency)
//     .sort((a, b) => b[1] - a[1])
//     .map((entry) => entry[0]);
//   const filtered = sorted.filter((w) => 4 < w.length);
//   return filtered.slice(0, Math.ceil(filtered.length * (1 / 12)));
// };

// export const extractKeywords = (longSentence: string) => {
//   const w = words(longSentence).map((w) => w.toLocaleLowerCase());
//   const kw_ = extractKeywordsTop(w.join(" "));
//   return sampleSize(kw_, random(3, 6));
// };

export {};
