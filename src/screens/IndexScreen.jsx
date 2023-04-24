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

import NewSongs from "../components/Index/NewSongs";
import NewAlbum from "../components/Index/NewAlbum";

import { ONE_TOKEN } from "@env";
import useScreenDimensions from "../hooks/useDimension";

const IndexScreen = () => {
  const { width } = useScreenDimensions();

  const [data, setData] = useState(null);
  const [singleTracks, setSingleTracks] = useState(null);
  const [newAlbum, setNewAlbum] = useState(null);
  const [color, setColor] = useState(null);

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

  useEffect(() => {
    getNew();
  }, []);

  return (
    <SafeAreaView className="bg-main flex-1">
      <NewAlbum item={newAlbum} />
      {data && (
        <View style={{ marginLeft: width * 0.1 }}>
          <FlatList
            horizontal
            data={singleTracks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <NewSongs item={item} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default IndexScreen;
