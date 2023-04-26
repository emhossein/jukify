import React, { useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text, Dimensions, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSound,
  playPause,
  seek,
  selectAudioPlayer,
} from "../../store/audioPlayerSlice";

import Hicon from "../icons/Hicon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import Typography from "../Typography";
import useScreenDimensions from "../../hooks/useDimension";

const AudioPlayer = ({ url, details }) => {
  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();
  const { sound, duration, position, isPlaying, artist, title, musicImage } =
    useSelector(selectAudioPlayer);

  useEffect(() => {
    dispatch(
      loadSound(
        url,
        details?.name,
        details?.artists[0].name,
        details?.album.cover[2].url
      )
    );

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
    <>
      {details && (
        <View>
          <Image
            source={{ uri: details?.album.cover[2].url }}
            style={{ width: width * 0.8, height: height * 0.44 }}
            className="rounded-[30px]"
          />
          <View className="mt-[17px] mb-[50px] flex-row items-center justify-between">
            <View>
              <Typography bold styles="text-[#DFDFDF] text-xl mb-[6px]">
                {details?.name}
              </Typography>
              <Typography styles="text-[#BABABA] text-xl">
                {details?.artists[0].name}
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
      )}
    </>
  );
};

export default AudioPlayer;
