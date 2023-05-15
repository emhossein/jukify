import React, { useEffect } from "react";
import AudioPlayer from "../components/Player/AudioPlayer";

import { RAPIDAPI_KEY, ONE_TOKEN } from "@env";
import { useDispatch, useSelector } from "react-redux";

import { downloadSong } from "../store/songDownload";
import { selectAudioPlayer } from "../store/audioPlayerSlice";
import Typography from "../components/Typography";
import { fetchDominantColors } from "../store/dominantColorSlice";
import { LinearGradient } from "expo-linear-gradient";

const SongScreen = () => {
  const dispatch = useDispatch();

  const { artist, title, musicImage } = useSelector(selectAudioPlayer);
  const { data, status } = useSelector((state) => state.download);
  const { data: colors } = useSelector((state) => state.dominantColors);

  useEffect(() => {
    dispatch(fetchDominantColors({ url: musicImage }));
  }, [musicImage]);

  useEffect(() => {
    dispatch(
      downloadSong({
        artist,
        track: title,
        apiKey: RAPIDAPI_KEY,
        oneKey: ONE_TOKEN,
      })
    );
  }, [title]);

  return (
    <LinearGradient
      colors={[colors?.vibrant, "#1C1B1B"]}
      end={{ x: 0.5, y: 0.8 }}
      className="flex-1 items-center justify-center"
    >
      {status === "succeeded" ? (
        <AudioPlayer details={data?.result} />
      ) : (
        <Typography styles="text-white">Loading...</Typography>
      )}
    </LinearGradient>
  );
};

export default SongScreen;
