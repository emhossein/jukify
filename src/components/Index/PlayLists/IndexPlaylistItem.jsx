import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Typography from "../../Typography";
import useScreenDimensions from "../../../hooks/useDimension";

const IndexPlaylistItem = ({ item }) => {
  const { width, height } = useScreenDimensions();
  const navigation = useNavigation();

  const imageUrl = item?.data?.images?.items[0].sources[0].url;

  // Image.prefetch(imageUrl);

  if (item.data) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PlayList", { uri: item.data.uri })}
        className="overflow-hidden truncate"
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: width * 0.36,
            height: height * 0.2025,
            borderRadius: 30,
            marginRight: 14,
          }}
          onError={(err) => null}
        />
        <Typography bold styles="text-white text-[13px] mt-[13px] ml-3">
          {item.data.name.length > 15
            ? item.data.name.substring(0, 15) + "..."
            : item.data.name}
        </Typography>
      </TouchableOpacity>
    );
  }
};

export default IndexPlaylistItem;