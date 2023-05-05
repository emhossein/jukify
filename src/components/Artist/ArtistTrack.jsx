import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import { RAPIDAPI_KEY, ONE_TOKEN } from "@env";

import Hicon from "./../icons/Hicon";
import Typography from "./../Typography";
import PlayIcon from "./../icons/PlayIcon";
import formatDuration from "./../../utils/formatDuration";
import {
  loadSound,
  selectAudioPlayer,
  setArtist,
  setMusicImage,
  setTitle,
} from "./../../store/audioPlayerSlice";
import PauseIcon from "./../icons/PauseIcon";
import useScreenDimensions from "./../../hooks/useDimension";
import { downloadSong } from "./../../store/songDownload";

const ArtistTrack = ({ item, name }) => {
  const { width } = useScreenDimensions();

  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.download);
  const { title, isPlaying } = useSelector(selectAudioPlayer);

  const handlePlayTrack = async ({ artist, track }) => {
    dispatch(
      downloadSong({ artist, track, apiKey: RAPIDAPI_KEY, oneKey: ONE_TOKEN })
    );

    dispatch(setArtist(artist));
    dispatch(setTitle(track));
    dispatch(setMusicImage(item.track.album.coverArt.sources[0].url));
  };

  return (
    <View className="w-full items-center mb-1">
      <View
        className="flex-row items-center justify-between "
        style={{ width: width * 0.8 }}
      >
        <TouchableOpacity
          onPress={() =>
            handlePlayTrack({
              artist: name,
              track: item.track.name,
            })
          }
        >
          <ImageBackground
            source={{ uri: item.track.album.coverArt.sources[0].url }}
            className="items-center justify-center w-10 h-10 rounded-full bg-accent mr-4 "
            imageStyle={{ borderRadius: 1000, opacity: 0.4 }}
          >
            {isPlaying && title === item.track.name ? (
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
            {name}
          </Typography>
        </View>
        <Typography styles="text-white mr-12 ">
          {formatDuration(item.track.duration.totalMilliseconds)}
        </Typography>
        <Hicon />
      </View>
    </View>
  );
};

export default ArtistTrack;

/*
Next song
Don't fetch song or playlist again
Search songs and playlist
*/
