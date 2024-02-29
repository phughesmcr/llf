#!/usr/bin/env -S deno run --allow-read --allow-write

import Transcripts from "../whisper_result.json" with { type: "json" };

const res = Transcripts.map((transcript) => transcript.text).join("");

Deno.writeTextFileSync("./transcript.txt", res);
