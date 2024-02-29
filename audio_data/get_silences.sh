#! /bin/bash
ffmpeg -i raw_audio.mp3 -af silencedetect=d=0.3 -f null - |& awk '/silence_end/ {print $4,$5}' | awk '{S=$2;printf "%d:%02d:%02d\n",S/(60*60),S%(60*60)/60,S%60}' > silences.txt
