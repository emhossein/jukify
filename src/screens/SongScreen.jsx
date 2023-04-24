import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import axios from "axios";
import AudioPlayer from "../components/AudioPlayer";

import { RAPIDAPI_KEY, RAPIDAPI_HOST, XIMILAR_API_KEY } from "@env";

const SongScreen = ({ route }) => {
  const { track } = route.params;
  const [songUrl, setSongUrl] = useState(null);
  const [details, setDetails] = useState(null);
  const [dominantColor, setDominantColor] = useState(null);

  const getSong = async (track) => {
    const options = {
      method: "GET",
      url: "https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud",
      params: { track },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    };

    console.log("sending request...");
    try {
      const { data } = await axios.request(options);
      console.log("response received!");
      const { soundcloudTrack, spotifyTrack } = data;
      setSongUrl(soundcloudTrack.audio[0].url);
      setDetails(spotifyTrack);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSong(track);
  }, []);

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-main">
      {songUrl && details ? (
        <AudioPlayer url={songUrl} details={details} />
      ) : (
        <Text className="text-white">{songUrl ? "" : "Loading..."}</Text>
      )}
    </SafeAreaView>
  );
};

export default SongScreen;
