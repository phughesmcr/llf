# LLF Synod Transcript Analysis

## Files

- `./audio_data/raw_audio.mp3` is the audio from the Synod LLF sessions on Monday evening and Tuesday morning.
- `./synod_feb_24.ipynb` is a Jupyter notebook that contains the analysis of the transcript data.
- `./tokens.csv` is the result of tokenizing the transcript.
- `./transcript.txt` is the transcript of the Synod LLF sessions on Monday evening and Tuesday morning.
- `./whisper_result.json` is the result of transcribing the audio using the Whisper API with `timestamp_granularities` set to `segment`.

## Requirements
1. If you're on Windows you'll need Git Bash to run the shell scripts.

## To Transcribe the Audio
1. See the `README.md` in the `audio_data` directory.

## Using Jupyter Notebooks with the Deno Kernel (Windows VSCode Example)
1. Run `py -m venv .venv` to create a virtual environment
2. Run `.venv\Scripts\activate` to activate the virtual environment
3. Run `py -m pip install --upgrade pip` to upgrade pip
4. Run `pip install -r requirements.txt` to install the required Python packages
5. Run `deno jupyter --unstable --install` to install the Deno kernel for Jupyter
6. In VSCode, install the Deno extension and the Jupyter extension
7. You can then open the `synod_feb_24.ipynb` and select the Deno kernel
8. To deactivate the virtual environment, run `deactivate`

## Sources

- [Church of England Synod Livestream on Youtube](https://www.youtube.com/watch?v=sLujozTlAEI)

## Limitations

This code uses OpenAi's embeddings API which has risks and limitations, including social bias and "blindness to recent events". More information can be found [here](https://platform.openai.com/docs/guides/embeddings/limitations-risks).

## License
MIT
