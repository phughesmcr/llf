#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-env="OPENAI_API_KEY,OPENAI_ORG_ID,DEBUG"
import { OpenAI } from "npm:openai";

const FILENAME = "raw_audio_";

const openai = new OpenAI({
  apiKey: ""
});

async function transcribe(path: string) {
  const raw = await Deno.open(path, { read: true });
  const file = await OpenAI.toFile(raw.readable, path.slice(2), { type: "audio/mp3" });
  return openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    response_format: "verbose_json",
    language: "en",
    timestamp_granularities: ["segment"],
  });
}

async function main() {
  const files = [...Deno.readDirSync(".")]
    .filter((file) => file.isFile && file.name.startsWith(FILENAME))
    .map((d) => "./" + d.name)
    .sort();

  if (!files.length) {
    console.log("Done. No files found.");
    Deno.exit(0);
  }

  const scripts = await Promise.all(files.map(transcribe));
  Deno.writeTextFileSync("./whisper_result.json", JSON.stringify(scripts, null, 2));
}

main();
