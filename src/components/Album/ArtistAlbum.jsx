import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import useScreenDimensions from "../../hooks/useDimension";
import Typography from "../Typography";
import { useNavigation } from "@react-navigation/native";

const ArtistAlbum = ({ item }) => {
  const { width, height } = useScreenDimensions();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HomeTab", {
          screen: "Album",
          params: { id: item.releases.items[0].id },
        })
      }
    >
      <Image
        source={{ uri: item.releases.items[0].coverArt.sources[0].url }}
        style={{
          width: width * 0.36,
          height: width * 0.36,
          borderRadius: 8,
          marginRight: 14,
        }}
      />
      <Typography bold styles="text-white text-[13px] mt-[10px] ml-1">
        {item.releases.items[0].name.length > 15
          ? item.releases.items[0].name.substring(0, 15) + "..."
          : item.releases.items[0].name}
      </Typography>
    </TouchableOpacity>
  );
};

export default ArtistAlbum;
