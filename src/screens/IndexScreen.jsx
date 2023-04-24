import {
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import NewAlbum from "../components/Index/NewAlbum";
import TodayHits from "../components/Index/TodayHits";

import { ONE_TOKEN } from "@env";
import { getTTH } from "../utils/getData";
import useScreenDimensions from "../hooks/useDimension";

const IndexScreen = () => {
  const { width } = useScreenDimensions();

  const [data, setData] = useState(null);
  const [singleTracks, setSingleTracks] = useState(null);
  const [newAlbum, setNewAlbum] = useState(null);
  const [TTH, setTTH] = useState(null);

  const getNew = async () => {
    const response = await axios.get(
      `https://one-api.ir/spotify/?token=${ONE_TOKEN}&action=new`
    );
    setData(response.data);

    console.log("fetched new album");
    const singles = response.data.result.albums.items.filter(
      (item) => item.album_type === "single"
    );
    const album = response.data.result.albums.items.filter(
      (item) => item.album_type === "album"
    );
    setSingleTracks(singles);
    setNewAlbum(album[Math.floor(Math.random() * album.length)]);
  };

  const handleFetch = async () => {
    try {
      const todaysHit = await getTTH(ONE_TOKEN);
      setTTH(todaysHit.result.tracks.items.slice(0, 20));
    } catch (error) {
      console.log("tth error: ", error);
    }
  };

  useEffect(() => {
    getNew();
    handleFetch();
  }, []);

  return (
    <SafeAreaView className="bg-main flex-1">
      <NewAlbum item={newAlbum} />
      {TTH && (
        <View style={{ marginLeft: width * 0.1 }}>
          <FlatList
            horizontal
            data={TTH}
            keyExtractor={(item) => item.track.id}
            renderItem={({ item }) => <TodayHits item={item} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default IndexScreen;
