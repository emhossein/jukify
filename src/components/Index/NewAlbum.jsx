import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import useScreenDimensions from "../../hooks/useDimension";
import CurveIcon from "../icons/CurveIcon";

const NewAlbum = ({ item }) => {
  const { width, height } = useScreenDimensions();

  return (
    <TouchableOpacity
      style={{ width: width * 0.8, height: height * 0.14 }}
      className="relative flex-row justify-between  items-center bg-spotify mx-auto rounded-large overflow-hidden mb-[41px] px-[19px] py-[10px]"
    >
      <View className="justify-between h-full w-[60%]">
        {item && <Text className="text-[10px] text-white">New Album</Text>}

        <Text
          numberOfLines={3}
          className="text-[16px] text-white line-height-[25.65px] "
        >
          {item?.name}
        </Text>
        <Text className="text-[13px] text-white">{item?.artists[0].name}</Text>
      </View>
      {item && (
        <Image
          source={{ uri: item?.images[0].url }}
          style={{
            width: width * 0.2138,
            height: height * 0.12,
            borderRadius: 30,
          }}
        />
      )}
      <CurveIcon
        style={{
          zIndex: -1,
          position: "absolute",
          right: "50%",
          bottom: 0,
        }}
      />
    </TouchableOpacity>
  );
};

export default NewAlbum;