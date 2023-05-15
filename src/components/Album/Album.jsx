import React from "react";
import { Image, TouchableOpacity } from "react-native";
import useScreenDimensions from "../../hooks/useDimension";
import Typography from "../Typography";
import { useNavigation } from "@react-navigation/native";

const NewAlbum = ({ item }) => {
  const { width } = useScreenDimensions();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HomeTab", {
          screen: "Album",
          params: { id: item.id },
        })
      }
    >
      <Image
        source={{ uri: item.images[0].url }}
        style={{
          width: width * 0.36,
          height: width * 0.36,
          borderRadius: 8,
          marginRight: 14,
        }}
      />
      <Typography bold styles="text-white text-[13px] mt-[10px] ml-1">
        {item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name}
      </Typography>
    </TouchableOpacity>
  );
};

export default NewAlbum;
