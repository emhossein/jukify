import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Image } from "react-native";

import Typography from "../Typography";

const SearchedArtists = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HomeTab", {
          screen: "Artist",
          params: { id: item.data.uri.split(":")[2] },
        })
      }
      className="items-center mr-2"
    >
      <Image
        source={{
          uri: item?.data?.visuals?.avatarImage?.sources[0]?.url,
        }}
        className="w-20 h-20 rounded-full"
      />
      <Typography bold styles="text-white">
        {item.data.profile.name.length > 10
          ? item.data.profile.name.substring(0, 10) + "..."
          : item.data.profile.name}
      </Typography>
    </TouchableOpacity>
  );
};

export default SearchedArtists;
