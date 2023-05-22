import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import useScreenDimensions from "../../hooks/useDimension";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAudioPlayer,
  setArtist,
  setMusicImage,
  setTitle,
} from "../../store/audioPlayerSlice";
import { downloadSong } from "../../store/songDownload";
import { RAPIDAPI_KEY } from "@env";
import { ONE_TOKEN } from "@env";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import Typography from "../Typography";
import formatDuration from "../../utils/formatDuration";
import Hicon from "../icons/Hicon";

const UserTrack = ({ item }) => {
  const { width } = useScreenDimensions();

  const dispatch = useDispatch();
  const { title, isPlaying } = useSelector(selectAudioPlayer);

  const handlePlayTrack = async ({ artist, track }) => {
    dispatch(
      downloadSong({ artist, track, apiKey: RAPIDAPI_KEY, oneKey: ONE_TOKEN })
    );

    dispatch(setArtist(artist));
    dispatch(setTitle(track));
    dispatch(setMusicImage(item.image));
  };

  return (
    <View className="w-full items-center mb-3">
      <View
        className="flex-row items-center justify-between "
        style={{ width: width * 0.9 }}
      >
        <TouchableOpacity
          onPress={() =>
            handlePlayTrack({
              artist: item?.artist,
              track: item?.song,
            })
          }
        >
          <ImageBackground
            source={{ uri: item.image }}
            className="items-center justify-center w-10 h-10 rounded-full bg-accent mr-4 "
            imageStyle={{ borderRadius: 1000, opacity: 0.4 }}
          >
            {isPlaying && title === item?.song ? (
              <PauseIcon width="10" height="24" />
            ) : (
              <PlayIcon width="20" height="20" />
            )}
          </ImageBackground>
        </TouchableOpacity>
        <View className="flex-1">
          <Typography bold styles="text-white text-base mt-1">
            {item.song.length > 15
              ? item.song.substring(0, 15) + "..."
              : item.song}
          </Typography>
          <Typography bold styles="text-white text-xs mt-1">
            {item.artist}
          </Typography>
        </View>
        <Hicon />
      </View>
    </View>
  );
};

export default UserTrack;

const styles = StyleSheet.create({});
