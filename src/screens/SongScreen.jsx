import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";
import AudioPlayer from "../components/AudioPlayer";

const SongScreen = ({ route }) => {
  const { track } = route.params;
  const [sound, setSound] = useState();
  const [songUrl, setSongUrl] = useState(null);

  const getSong = async (track) => {
    const options = {
      method: "GET",
      url: "https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud",
      params: { track },
      headers: {
        "X-RapidAPI-Key": "8a640c1454msh8e45354629438f6p171b03jsn4683a7a58818",
        "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
      },
    };

    try {
      const { data } = await axios.request(options);
      const { soundcloudTrack } = data;
      setSongUrl(soundcloudTrack.audio[0].url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSong(track);
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-gray-700">
      {songUrl ? (
        <>
          <Text>Now playing: {track}</Text>
          <AudioPlayer url={songUrl} />
        </>
      ) : (
        <Text>Loading {track}...</Text>
      )}
    </View>
  );
};

export default SongScreen;
