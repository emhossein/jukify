import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Platform,
} from "react-native";

import Hicon from "../icons/Hicon";
import Typography from "../Typography";
import {
  loadSound,
  playPause,
  seek,
  selectAudioPlayer,
} from "../../store/audioPlayerSlice";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import { hide, toggle } from "../../store/showSlice";
import useScreenDimensions from "../../hooks/useDimension";
import BackIcon from "../icons/BackIcon";
import MoreIcon from "../icons/MoreIcon";
import UpIcon from "../icons/UpIcon";
import { toggleLyrics } from "../../store/lyricsSlice";

const AudioPlayer = ({ details }) => {
  const navigation = useNavigation();
  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();

  const { sound, duration, position, isPlaying, title, artist, musicImage } =
    useSelector(selectAudioPlayer);
  const { data } = useSelector((state) => state.download);
  const { showLyrics } = useSelector((state) => state.lyrics);

  const handleBackButton = () => {
    if (showLyrics) {
      handleShowLyrics();
    } else {
      dispatch(toggle());
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  useEffect(() => {
    if (data === null) {
      dispatch(loadSound(details?.formats[1].url));
    } else {
      dispatch(loadSound(data?.result.formats[1].url));
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && position < duration) {
        dispatch(seek(position + 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, duration, isPlaying, position]);

  const handleSeek = useCallback(
    (value) => {
      dispatch(seek(value));
    },
    [dispatch]
  );

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    dispatch(playPause());
  };

  const handleShowLyrics = () => {
    navigation.navigate("Lyrics", { artist, title });
  };

  return (
    <View style={{ width: width * 0.8 }}>
      <View className="flex-row justify-between w-full mb-7">
        <TouchableOpacity
          onPress={handleBackButton}
          className="w-6 h-6 rounded-full bg-accent items-center justify-center"
        >
          <BackIcon />
        </TouchableOpacity>
        <Typography
          bold
          styles="justify-self-center text-white font-bold mb-4 text-[18px]"
        >
          Now playing
        </Typography>
        <TouchableOpacity onPress={handleShowLyrics}>
          <MoreIcon />
          <MoreIcon />
          <MoreIcon />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{ uri: musicImage }}
          style={{ width: width * 0.8, height: height * 0.44 }}
          className="rounded-[30px] self-center"
        />
        <View className="mt-[17px] mb-4 flex-row items-center justify-between">
          <View>
            <Typography bold styles="text-white text-xl ">
              {title}
            </Typography>
            <Typography styles="text-white text-base">{artist}</Typography>
          </View>
          <Hicon />
        </View>

        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={handleSeek}
          thumbTintColor="#B7B7B7"
          minimumTrackTintColor="#B7B7B7"
          maximumTrackTintColor="rgba(136, 136, 136, 0.3)"
          style={{ width: width * 0.8 }}
        />
        <View className="flex-row items-center justify-between">
          <Typography styles="text-[#878787] text-xs">
            {formatDuration(position)}
          </Typography>
          <Typography styles="text-[#878787] text-xs">
            {formatDuration(duration)}
          </Typography>
        </View>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={handlePlayPause}>
            <View
              style={{ width: width * 0.18, height: height * 0.1 }}
              className="rounded-full bg-spotify items-center justify-center"
            >
              {isPlaying ? (
                <PauseIcon width="10" height="24" />
              ) : (
                <PlayIcon width="23" height="24" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {Platform.OS === "ios" && (
        <TouchableOpacity
          onPress={handleShowLyrics}
          className="items-center justify-center mt-8"
        >
          <UpIcon />
          <Typography styles="text-white text-sm mt-1">Lyrics</Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AudioPlayer;
