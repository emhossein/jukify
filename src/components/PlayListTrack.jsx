import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import { RAPIDAPI_KEY, ONE_TOKEN } from "@env";

import Hicon from "./icons/Hicon";
import Typography from "./Typography";
import PlayIcon from "./icons/PlayIcon";
import formatDuration from "../utils/formatDuration";
import { downloadSong } from "../store/songDownload";
import {
  loadSound,
  selectAudioPlayer,
  setArtist,
  setMusicImage,
  setTitle,
} from "../store/audioPlayerSlice";
import PauseIcon from "./icons/PauseIcon";

const PlayListTrack = ({ item }) => {
  const dispatch = useDispatch();

  const { data, status } = useSelector((state) => state.download);
  const { title, isPlaying } = useSelector(selectAudioPlayer);

  const handlePlayTrack = async ({ artist, track }) => {
    const headers = {
      "X-RapidAPI-Host": "soundcloud-downloader4.p.rapidapi.com",
      "X-RapidAPI-Key": RAPIDAPI_KEY,
    };

    const searchParams = {
      query: `${artist} - ${track}`,
    };

    const searchResponse = await axios.get(
      "https://soundcloud-downloader4.p.rapidapi.com/soundcloud/search",
      { headers, params: searchParams }
    );

    const downloadResponse = await axios.get(
      `https://one-api.ir/soundcloud/?token=${ONE_TOKEN}&action=download&link=${searchResponse.data.result[0].url}`
    );

    dispatch(setArtist(artist));
    dispatch(setTitle(track));
    dispatch(setMusicImage(item.track.album.images[2].url));
    dispatch(loadSound(downloadResponse.data.result.formats[2].url));
  };

  return (
    <View key={item.uri} className="flex-row items-center justify-between mb-5">
      <TouchableOpacity
        onPress={() =>
          handlePlayTrack({
            artist: item?.track?.artists[0]?.name,
            track: item?.track?.name,
          })
        }
      >
        <ImageBackground
          source={{ uri: item.track.album.images[2].url }}
          className="items-center justify-center w-10 h-10 rounded-full bg-accent mr-4 "
          imageStyle={{ borderRadius: 1000, opacity: 0.4 }}
        >
          {isPlaying && title === item?.track?.name ? (
            <PauseIcon width="10" height="24" />
          ) : (
            <PlayIcon width="20" height="20" />
          )}
        </ImageBackground>
      </TouchableOpacity>
      <View className="flex-1">
        <Typography bold styles="text-white text-base mt-1">
          {item.track.name.length > 15
            ? item.track.name.substring(0, 15) + "..."
            : item.track.name}
        </Typography>
        <Typography bold styles="text-white text-xs mt-1">
          {item.track.artists[0].name}
        </Typography>
      </View>
      <Text className="text-white mr-12 ">
        {formatDuration(item.track.duration_ms)}
      </Text>
      <Hicon />
    </View>
  );
};

export default PlayListTrack;

// finish playlist track
