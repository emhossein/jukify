import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import axios from "axios";
import AudioPlayer from "../components/Player/AudioPlayer";

import { RAPIDAPI_KEY, RAPIDAPI_HOST } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setMusicDetails, setUri } from "../store/audioPlayerSlice";
import { fetchSong } from "../store/songDataSlice";

const SongScreen = ({ route }) => {
  const { track } = route.params;

  const dispatch = useDispatch();
  const { songUrl, details, status, error } = useSelector(
    (state) => state.song
  );

  useEffect(() => {
    dispatch(fetchSong(track, RAPIDAPI_KEY, RAPIDAPI_HOST));
  }, []);

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-main">
      {status === "fulfilled" ? (
        <AudioPlayer url={songUrl} details={details} />
      ) : (
        <Text className="text-white">{songUrl ? "" : "Loading..."}</Text>
      )}
    </SafeAreaView>
  );
};

export default SongScreen;
