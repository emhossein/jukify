import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import Typography from "../Typography";

const SearchedAlbums = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HomeTab", {
          screen: "Album",
          params: { id: item.data.uri.split(":")[2] },
        })
      }
      className="mr-3"
    >
      <Image
        source={{
          uri: item?.data?.coverArt?.sources[0]?.url,
        }}
        className="w-20 h-20 rounded-def"
      />
      <Typography bold styles="text-white text-center mt-1">
        {item.data.name.length > 10
          ? item.data.name.substring(0, 10) + "..."
          : item.data.name}
      </Typography>
    </TouchableOpacity>
  );
};

export default SearchedAlbums;
