import React, { useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text, Image, BackHandler } from "react-native";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";

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

const AudioPlayer = ({ details }) => {
  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();
  const { sound, duration, position, isPlaying, artist, title, musicImage } =
    useSelector(selectAudioPlayer);
  const { data } = useSelector((state) => state.download);

  const handleBackButton = () => {
    dispatch(toggle());
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  useEffect(() => {
    if (data === null) {
      dispatch(
        loadSound(
          details?.formats[1].url,
          details?.title,
          details?.uploader,
          details?.thumbnail
        )
      );
    } else {
      dispatch(
        loadSound(
          data?.result.formats[1].url,
          data?.result.title,
          data?.result.uploader,
          data?.result.thumbnail
        )
      );
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
        <View>
          <MoreIcon />
          <MoreIcon />
          <MoreIcon />
        </View>
      </View>

      <View>
        <Image
          source={{ uri: details?.thumbnail }}
          style={{ width: width * 0.8, height: height * 0.44 }}
          className="rounded-[30px] self-center"
        />
        <View className="mt-[17px] mb-4 flex-row items-center justify-between">
          <View>
            <Typography bold styles="text-white text-xl ">
              {title}
            </Typography>
            <Typography styles="text-white text-base">
              {details?.uploader}
            </Typography>
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
          <Text className="text-[#878787] text-xs">
            {formatDuration(position)}
          </Text>
          <Text className="text-[#878787] text-xs">
            {formatDuration(duration)}
          </Text>
        </View>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={handlePlayPause}>
            <View
              style={{ width: width * 0.18, height: height * 0.1 }}
              className="rounded-full bg-[#42C83C] items-center justify-center"
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
    </View>
  );
};

export default AudioPlayer;
