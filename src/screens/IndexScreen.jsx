import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View, SafeAreaView, ScrollView } from "react-native";

import { fetchTTH } from "../store/tthSlice";
import Typography from "../components/Typography";
import TodayHits from "../components/Index/TodayHits";
import useScreenDimensions from "../hooks/useDimension";
import StickyPlayer from "../components/Player/StickyPlayer";
import PlayList from "../components/Index/PlayLists/PlayList";
import { fetchIndexPlayList } from "../store/indexPlaylistSlice";

import { ONE_TOKEN, RAPIDAPI_KEY } from "@env";
import TodayHitsButton from "../components/Index/TodayHitsButton";
import { fetchNewAlbums } from "../store/newAlbumsSlice";
import IndexPlaylistItem from "../components/Index/PlayLists/IndexPlaylistItem";
import NewAlbum from "../components/Album/NewAlbum";

const IndexScreen = () => {
  const { width } = useScreenDimensions();

  const dispatch = useDispatch();
  const { data: tth, status: tthStatus } = useSelector((state) => state.tth);
  const {
    data: newAlbums,
    status: newAlbumsStatus,
    error,
  } = useSelector((state) => state.newAlbums);
  const { data, status } = useSelector((state) => state.indexPlaylist);

  const tthButtonCover = tth?.result?.tracks?.items
    ?.slice(0, 3)
    .map((item) => item.track.album.images[0].url);

  useEffect(() => {
    if (!tth || !data || !newAlbums) {
      dispatch(fetchTTH(ONE_TOKEN));
      dispatch(fetchNewAlbums({ apiKey: RAPIDAPI_KEY }));
      dispatch(fetchIndexPlayList({ apiKey: RAPIDAPI_KEY }));
    }
    console.log(error);
  }, []);

  return (
    <SafeAreaView className="bg-main flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {tthStatus === "succeeded" && (
          <View className="ml-[10%] mb-6">
            <Typography bold styles="text-white text-xl mb-3 ">
              Today's Top Hits
            </Typography>
            <TodayHitsButton images={tthButtonCover} />
          </View>
        )}
        {status === "succeeded" && (
          <View className="ml-[10%]">
            <Typography bold styles="text-white text-base -mb-4">
              Recommended for you
            </Typography>
            <Typography styles="text-white text-base mb-3 mt-5">
              New Albums
            </Typography>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={newAlbums?.content?.items}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => <NewAlbum item={item} />}
            />
            <PlayList title="Fresh New Musics" data={data.freshNewMusic} />
            {/* <PlayList title="Sing Along" data={data.singAlong} />
            <PlayList title="Happy" data={data.happy} /> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexScreen;
