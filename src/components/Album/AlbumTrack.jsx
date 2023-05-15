import { useDispatch, useSelector } from "react-redux";
import { View, ImageBackground, TouchableOpacity } from "react-native";

import { RAPIDAPI_KEY, ONE_TOKEN } from "@env";

import {
  selectAudioPlayer,
  setArtist,
  setMusicImage,
  setTitle,
} from "../../store/audioPlayerSlice";
import PauseIcon from "../icons/PauseIcon";
import useScreenDimensions from "../../hooks/useDimension";
import { downloadSong } from "../../store/songDownload";
import Hicon from "../icons/Hicon";
import Typography from "../Typography";
import PlayIcon from "../icons/PlayIcon";
import formatDuration from "./../../utils/formatDuration";

const AlbumTrack = ({ item, image }) => {
  const { width } = useScreenDimensions();

  const dispatch = useDispatch();
  const { title, isPlaying } = useSelector(selectAudioPlayer);

  const handlePlayTrack = async ({ artist, track }) => {
    dispatch(
      downloadSong({ artist, track, apiKey: RAPIDAPI_KEY, oneKey: ONE_TOKEN })
    );

    dispatch(setArtist(artist));
    dispatch(setTitle(track));
    dispatch(setMusicImage(image));
  };

  return (
    <View className="w-full items-center">
      <View
        className="flex-row items-center justify-between "
        style={{ width: width * 0.8 }}
      >
        <TouchableOpacity
          onPress={() =>
            handlePlayTrack({
              artist: item?.artists[0]?.name,
              track: item?.name,
            })
          }
        >
          <ImageBackground
            source={{ uri: image }}
            className="items-center justify-center w-10 h-10 rounded-full bg-accent mr-4 "
            imageStyle={{ borderRadius: 1000, opacity: 0.4 }}
          >
            {isPlaying && title === item?.name ? (
              <PauseIcon width="10" height="24" />
            ) : (
              <PlayIcon width="20" height="20" />
            )}
          </ImageBackground>
        </TouchableOpacity>
        <View className="flex-1">
          <Typography bold styles="text-white text-base mt-1">
            {item.name.length > 15
              ? item.name.substring(0, 15) + "..."
              : item.name}
          </Typography>
          <Typography bold styles="text-white text-xs mt-1">
            {item.artists[0].name}
          </Typography>
        </View>
        <Typography styles="text-white mr-12 ">
          {formatDuration(item.duration_ms)}
        </Typography>
        <Hicon />
      </View>
    </View>
  );
};

export default AlbumTrack;

/*
Next song
Don't fetch song or playlist again
Search songs and playlist
*/
