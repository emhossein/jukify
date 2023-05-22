import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import useScreenDimensions from "../../hooks/useDimension";
import Typography from "../Typography";

const ArtistAlbum = ({ item }) => {
  const { width } = useScreenDimensions();
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
        source={item.releases.items[0].coverArt.sources[0].url}
        style={{
          width: width * 0.36,
          height: width * 0.36,
          borderRadius: 8,
          marginRight: 14,
        }}
      />
      <Typography size={13} bold styles="text-white text-[13px] mt-[10px] ml-1">
        {item.releases.items[0].name.length > 15
          ? item.releases.items[0].name.substring(0, 15) + "..."
          : item.releases.items[0].name}
      </Typography>
    </TouchableOpacity>
  );
};

export default ArtistAlbum;
