import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import PlayIcon from "../icons/PlayIcon";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const NewSongs = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Song", { track: item.name })}
      className="mr-[14px]"
      style={{
        width: SCREEN_WIDTH * 0.3,
      }}
      key={item.id}
    >
      <View className="relative mb-[13px]">
        <Image
          source={{ uri: item.images[0].url }}
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
        <Text numberOfLines={1} className="text-base font-bold text-white">
          {item.name}
        </Text>
        <Text numberOfLines={1} className="text-sm text-white">
          {item.artists[0].name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewSongs;
