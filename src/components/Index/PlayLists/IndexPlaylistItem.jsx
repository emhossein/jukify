import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import Typography from "../../Typography";
import useScreenDimensions from "../../../hooks/useDimension";

const IndexPlaylistItem = ({ item }) => {
  const { width } = useScreenDimensions();
  const navigation = useNavigation();

  const imageUrl = item?.data?.images?.items[0].sources[0].url;

  if (item.data) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HomeTab", {
            screen: "PlayList",
            params: { uri: item.data.uri },
          })
        }
        className="overflow-hidden truncate"
      >
        <Image
          source={imageUrl}
          style={{
            width: width * 0.36,
            height: width * 0.36,
            borderRadius: 8,
            marginRight: 14,
          }}
          // eslint-disable-next-line no-unused-vars
          onError={(err) => null}
        />
        <Typography
          size={13}
          bold
          styles="text-white text-[13px] mt-[10px] ml-1"
        >
          {item.data.name.length > 15
            ? item.data.name.substring(0, 15) + "..."
            : item.data.name}
        </Typography>
      </TouchableOpacity>
    );
  }
};

export default IndexPlaylistItem;
