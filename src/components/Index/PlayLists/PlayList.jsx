import { FlatList, View } from "react-native";

import Typography from "../../Typography";
import IndexPlaylistItem from "./IndexPlaylistItem";
import useScreenDimensions from "../../../hooks/useDimension";

const PlayList = ({ title, data }) => {
  const { width } = useScreenDimensions();

  return (
    <View style={{ marginTop: 20 }}>
      <Typography styles="text-white text-base mb-3">{title}</Typography>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data.filter((item) => Object.keys(item.data).length)}
        keyExtractor={(item) => item.data.uri}
        renderItem={({ item }) => <IndexPlaylistItem item={item} />}
      />
    </View>
  );
};

export default PlayList;
