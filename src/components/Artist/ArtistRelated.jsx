import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import useScreenDimensions from "../../hooks/useDimension";
import { useNavigation } from "@react-navigation/native";
import Typography from "../Typography";

const ArtistRelated = ({ item }) => {
  const { width, height } = useScreenDimensions();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="mb-4"
      onPress={() => navigation.navigate("Artist", { id: item?.id })}
    >
      <Image
        source={{ uri: item?.visuals.avatarImage.sources[0].url }}
        style={{
          width: width * 0.36,
          height: height * 0.2025,
        }}
        className="mr-[14px] rounded-full"
      />
      <Typography bold styles="text-white text-[13px] mt-[10px] ml-1">
        {item?.profile.name}
      </Typography>
    </TouchableOpacity>
  );
};

export default ArtistRelated;
