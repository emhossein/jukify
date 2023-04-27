import React, { useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import AudioPlayer from "../components/Player/AudioPlayer";

import { RAPIDAPI_KEY, ONE_TOKEN } from "@env";
import { useDispatch, useSelector } from "react-redux";

import { downloadSong } from "../store/songDownload";
import { selectAudioPlayer } from "../store/audioPlayerSlice";
import { hide, show, toggle } from "../store/showSlice";
import Typography from "../components/Typography";

const SongScreen = () => {
  const dispatch = useDispatch();

  const { artist, title } = useSelector(selectAudioPlayer);
  const { data, status } = useSelector((state) => state.download);

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
    <SafeAreaView className="items-center justify-center flex-1 bg-main">
      {status === "succeeded" ? (
        <AudioPlayer details={data?.result} />
      ) : (
        <Typography styles="text-white">Loading...</Typography>
      )}
    </SafeAreaView>
  );
};

export default SongScreen;
