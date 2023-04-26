import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import PlayIcon from "../icons/PlayIcon";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import Typography from "../Typography";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const TodayHits = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Song", { track: item.track.name })}
      className="mr-[14px]"
      style={{
        width: SCREEN_WIDTH * 0.3,
      }}
      key={item.track.id}
    >
      <View className="relative mb-[13px]">
        <Image
          source={{ uri: item.track.album.images[0].url }}
          style={{
            width: SCREEN_WIDTH * 0.3,
            height: SCREEN_HEIGHT * 0.22,
            borderRadius: 30,
          }}
        />
        <TouchableOpacity className="absolute -bottom-2 right-3 rounded-full w-[29px] h-[29px] bg-[#2C2C2C] items-center justify-center">
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
