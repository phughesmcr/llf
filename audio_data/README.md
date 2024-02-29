# Audio data

`raw_audio.mp3` is the audio from the Synod LLF sessions on Monday evening and Tuesday morning.

The Whisper API is designed to work with audio data chunks under 25mb.

To get the transcription of the audio:
1. Run `./get_silences.sh` to get a list of points of silence where the audio can be split. This will output a file called `silences.txt`.
2. Run `./get_split_points.ts` to reduce the number of split points to a manageable number. This will output a file called `split_points.txt`.
3. Run `./split_audio.sh split_points.txt raw_audio.mp3` to split the audio into chunks. This will create a series of files called `raw_audio$.mp3` where `$` is the chunk number beginning at 0.
4. **WARNING** if any chunk is over 26mb, it will not be transcribed. Decrease the `MAX_LENGTH_MINS` variable in `get_split_points.ts` and run again until all chunks are under 26mb.
5. Run `./transcribe_audio.ts` to transcribe the audio chunks. This will create a file called `whisper_result.json`.
6. Run `merge.ts` to merge the transcriptions into a single file called `transcription.txt`.
7. Run `./tokenize.ts` to tokenize the transcription. This will create a file called `tokens.csv`. Stopwords, digits,

