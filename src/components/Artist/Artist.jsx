import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import useScreenDimensions from "../../hooks/useDimension";
import { useNavigation } from "@react-navigation/native";
import Typography from "../Typography";

const Artist = ({ item }) => {
  const { width } = useScreenDimensions();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="mb-4"
      onPress={() =>
        navigation.navigate("HomeTab", {
          screen: "Artist",
          params: { id: item.id },
        })
      }
    >
      <Image
        source={item.images[0].url}
        style={{
          width: width * 0.36,
          height: width * 0.36,
        }}
        className="mr-[14px] rounded-full"
      />
      <Typography bold styles="text-white text-[13px] mt-[10px] ml-1">
        {item.name}
      </Typography>
    </TouchableOpacity>
  );
};

export default Artist;
