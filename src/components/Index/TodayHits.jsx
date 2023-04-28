import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity } from "react-native";

import Typography from "../Typography";
import PlayIcon from "../icons/PlayIcon";
import downloadSong from "../../store/songDownload";
import useScreenDimensions from "../../hooks/useDimension";
import {
  setArtist,
  setMusicImage,
  setTitle,
} from "../../store/audioPlayerSlice";
import { show, toggle } from "../../store/showSlice";

import { RAPIDAPI_KEY, ONE_TOKEN } from "@env";

const TodayHits = ({ item }) => {
  const navigation = useNavigation();
  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setTitle(item.track.name));
    dispatch(setArtist(item.track.artists[0].name));
    dispatch(setMusicImage(item.track.album.images[0].url));
    dispatch(toggle());
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mr-[14px]"
      style={{
        width: width * 0.3,
      }}
      key={item.track.id}
    >
      <View className="relative mb-[13px]">
        <Image
          source={{ uri: item.track.album.images[0].url }}
          style={{
            width: width * 0.3,
            height: height * 0.22,
            borderRadius: 30,
          }}
        />
        <TouchableOpacity className="absolute -bottom-2 right-3 rounded-full w-[29px] h-[29px] bg-accent items-center justify-center">
          <PlayIcon width="14" height="14" />
        </TouchableOpacity>
      </View>
      <View className="ml-3">
        <Typography
          bold
          numberOfLines={1}
          styles="text-base font-bold text-white"
        >
          {item.track.name}
        </Typography>
        <Typography numberOfLines={1} styles="text-sm text-white">
          {item.track.album.artists[0].name}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default TodayHits;
