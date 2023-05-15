import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Typography from "../Typography";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import { playPause, selectAudioPlayer } from "../../store/audioPlayerSlice";
import { toggle } from "../../store/showSlice";

const StickyPlayer = () => {
  const { artist, title, musicImage, isPlaying } =
    useSelector(selectAudioPlayer);
  const { shown } = useSelector((state) => state.show);
  const dispatch = useDispatch();

  const handlePlayPause = () => {
    dispatch(playPause());
  };

  return (
    <>
      {!shown && title && (
        <TouchableOpacity
          onPress={() => dispatch(toggle())}
          className="absolute bottom-[57px] self-center flex-row items-center justify-between w-[97%] bg-accent p-2 py-3 rounded-lg"
        >
          <View className="flex-row">
            <Image
              source={{ uri: musicImage }}
              className="w-12 h-12 mr-3 rounded-lg"
              style={{ borderRadius: 8 }}
            />
            <View>
              <Typography
                numberOfLines={2}
                styles="text-white text-[12px]"
                bold
              >
                {title}
              </Typography>
              <Typography styles="text-white text-[10px]">{artist}</Typography>
            </View>
          </View>
          <TouchableOpacity
            onPress={handlePlayPause}
            className="items-center justify-center bg-spotify p-1 rounded-full w-10 h-10 mr-4"
          >
            {isPlaying ? (
              <PauseIcon width="10" height="24" />
            ) : (
              <PlayIcon width="16" height="16" />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  );
};

export default StickyPlayer;
