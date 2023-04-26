import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Typography from "../Typography";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import { playPause, selectAudioPlayer } from "../../store/audioPlayerSlice";

const StickyPlayer = () => {
  const { artist, title, musicImage, isPlaying } =
    useSelector(selectAudioPlayer);
  const dispatch = useDispatch();

  const handlePlayPause = () => {
    dispatch(playPause());
  };

  return (
    <>
      {title && (
        <View
          onPress={() => navigation.pop()}
          className="absolute bottom-0 flex-row items-center justify-between w-full bg-accent p-2 py-3"
        >
          <View className="flex-row">
            <Image source={{ uri: musicImage }} className="w-12 h-12 mr-3" />
            <View>
              <Typography styles="text-white text-[12px]" bold>
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
        </View>
      )}
    </>
  );
};

export default StickyPlayer;
