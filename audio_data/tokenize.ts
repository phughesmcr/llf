#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-env="DEBUG_TAGS,DEBUG_CHUNKS"

import stopwords from "https://raw.githubusercontent.com/6/stopwords-json/fca10ee6724fdfae58b9e72e43ac7d4a6ae9cd45/dist/en.json" with { type: "json" };
import nlp from "npm:compromise";
import { tokenizer } from "npm:happynodetokenizer";

const hasNamedEntity = (token: string): boolean => {
  const n = nlp(token);
  return n.people().length > 0 || n.places().length > 0 || n.organizations().length > 0;
};

const startsWithDigit = (token: string): boolean => /^\d/.test(token);
const isNonWord = (token: string): boolean => /^\W$/g.test(token);

const tokenize = tokenizer({ preserveCase: false });

const rawText = Deno.readTextFileSync("./transcript.txt");

const tokens = tokenize(rawText);

const res: Record<string, number> = {};

for (const { value } of tokens()) {
  if (startsWithDigit(value) || isNonWord(value) || stopwords.includes(value) || hasNamedEntity(value)) continue;
  res[value] = (res[value] || 0) + 1;
}

const csv = Object.entries(res).map(([k, v]) => `${k},${v}`).join("\n");

Deno.writeTextFileSync("./tokens.csv", csv);
