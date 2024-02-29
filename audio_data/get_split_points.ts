#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --unstable-temporal
import { duration } from "jsr:@dbushell/audio-duration@0.2";

const AUDIO_FILENAME = "./raw_audio.mp3";
const SILENCES_FILENAME = "./silences.txt";
const SPLITS_FILENAME = "./split_points.txt";
const MAX_LENGTH_MINS = 20;
const MAX_LENGTH_MS = MAX_LENGTH_MINS * 60 * 1000;

const fileLengthMs = await duration(AUDIO_FILENAME);
const numberOfChunks = Math.ceil(fileLengthMs / MAX_LENGTH_MS);
const chunkLengthMs = fileLengthMs / numberOfChunks;
const expectedChunkLengthMs = Array.from({ length: numberOfChunks }, (_, i) => {
  const ms = (i + 1) * chunkLengthMs;
  return Temporal.PlainTime.from({
    hour: Math.floor(ms / 3600000),
    minute: Math.floor((ms % 3600000) / 60000),
    second: Math.floor((ms % 60000) / 1000),
    millisecond: Math.floor(ms % 1000),
    nanosecond: 0,
  });
});

const timecodeFile = await Deno.readTextFile(SILENCES_FILENAME);
const timecodes = timecodeFile.split("\n")
  .map((line) => {
    const [hour, minute, second, millisecond] = line.split(":").map(Number);
    return Temporal.PlainTime.from({
      hour,
      minute,
      second,
      millisecond,
      nanosecond: 0,
    });
  })
  .sort(Temporal.PlainTime.compare);

let chunkCursor = 0;
const points = timecodes.map((time, i, arr) => {
  // if time is less than the expected time
  // and arr[i + 1] is equal or greater than the expected time,
  // then we have a split point
  const expectedTime = expectedChunkLengthMs[chunkCursor];
  if (i === arr.length - 1 || !expectedTime) return time;
  const before = Temporal.PlainTime.compare(time, expectedTime) < 0;
  const after = Temporal.PlainTime.compare(arr[i + 1], expectedTime) >= 0;
  if (before && after) {
    chunkCursor++;
    return time;
  }
}).filter(Boolean).slice(0, numberOfChunks + 1);

Deno.writeTextFileSync(SPLITS_FILENAME, points.join("\n"));
