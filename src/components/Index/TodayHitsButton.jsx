import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import useScreenDimensions from "../../hooks/useDimension";
import { useNavigation } from "@react-navigation/native";

const TodayHitsButton = ({ images }) => {
  const navigation = useNavigation();
  const { width, height } = useScreenDimensions();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("HomeTab", { screen: "TTHScreen" })}
      style={{ width: width * 0.8, height: height * 0.25 }}
      className="relative flex-row items-center bg-white self-center rounded-def overflow-hidden -ml-[10%]"
    >
      {images?.map((image) => (
        <Image
          key={image}
          source={image}
          priority="high"
          className="w-[33.5%] h-full"
        />
      ))}
      <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-20" />
      <Text className="absolute top-8 left-5 w-[70%] font-bold text-white text-[32px]">
        Your hits of the day
      </Text>
    </TouchableOpacity>
  );
};

export default TodayHitsButton;
