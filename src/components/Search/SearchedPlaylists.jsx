import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Typography from "../Typography";
import { useNavigation } from "@react-navigation/native";

const SearchedPlaylists = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HomeTab", {
          screen: "PlayList",
          params: { uri: item.data.uri },
        })
      }
      className="mr-3"
    >
      <Image
        source={{ uri: item.data.images.items[0].sources[0].url }}
        className="h-20 w-20 rounded-def"
      />
      <Typography bold styles="text-white text-center mt-1">
        {item.data.name.length > 8
          ? item.data.name.substring(0, 8) + "..."
          : item.data.name}
      </Typography>
    </TouchableOpacity>
  );
};

export default SearchedPlaylists;
