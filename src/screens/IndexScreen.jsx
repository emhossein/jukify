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

const IndexScreen = () => {
  const { width } = useScreenDimensions();

  const dispatch = useDispatch();
  const { data: tth, status: tthStatus } = useSelector((state) => state.tth);
  const { data, status } = useSelector((state) => state.indexPlaylist);

  useEffect(() => {
    if (!tth || !data) {
      dispatch(fetchTTH(ONE_TOKEN));
      dispatch(fetchIndexPlayList({ apiKey: RAPIDAPI_KEY }));
    }
  }, []);

  return (
    <SafeAreaView className="bg-main flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {tthStatus === "succeeded" && (
          <View style={{ marginLeft: width * 0.1 }}>
            <Typography bold styles="text-white text-xl mb-3 ">
              Today's Top Hits
            </Typography>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={tth?.result.tracks.items.slice(0, 20)}
              keyExtractor={(item) => item.track.id}
              renderItem={({ item }) => <TodayHits item={item} />}
            />
          </View>
        )}
        {status === "succeeded" && (
          <>
            <PlayList title="Fresh New Musics" data={data.freshNewMusic} />
            {/* <PlayList title="Sing Along" data={data.singAlong} />
            <PlayList title="Happy" data={data.happy} /> */}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexScreen;
