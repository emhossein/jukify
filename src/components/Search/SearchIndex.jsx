import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

import Typography from "../Typography";
import useScreenDimensions from "./../../hooks/useDimension";
import SearchedArtists from "./SearchedArtists";
import SearchedAlbums from "./SearchedAlbums";
import SearchedPlaylists from "./SearchedPlaylists";
import SearchedTracks from "./SearchedTracks";

const SearchIndex = ({ item }) => {
  const { albums, artists, playlists, tracks } = item;

  const { width, height } = useScreenDimensions();
  const navigation = useNavigation();

  return (
    <>
      <View className="ml-[10%] h-[118px]">
        <Typography bold styles="text-white mb-1">
          Artists
        </Typography>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={artists.items}
          keyExtractor={(item) => item?.data.uri}
          renderItem={({ item }) => <SearchedArtists item={item} />}
        />
      </View>
      <View className="ml-[10%] mt-4 h-[122px]">
        <Typography bold styles="text-white mb-1">
          Albums
        </Typography>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={albums.items}
          keyExtractor={(item) => item.data.uri}
          renderItem={({ item }) => <SearchedAlbums item={item} />}
        />
      </View>
      <View className="ml-[10%] h-[126px] mt-4">
        <Typography bold styles="text-white mb-1">
          Playlists
        </Typography>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={playlists.items}
          keyExtractor={(item) => item.data.uri}
          renderItem={({ item }) => <SearchedPlaylists item={item} />}
        />
      </View>
      <View className="ml-[10%] h-52 mt-4">
        <Typography bold styles="text-white mb-1">
          Tracks
        </Typography>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tracks}
          keyExtractor={(item) => item.data.uri}
          renderItem={({ item }) => <SearchedTracks item={item} />}
        />
      </View>
    </>
  );
};

export default SearchIndex;
