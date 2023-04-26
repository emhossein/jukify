import { FlatList, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodayHits from "../components/Index/TodayHits";
import useScreenDimensions from "../hooks/useDimension";

import { ONE_TOKEN } from "@env";
import StickyPlayer from "../components/Player/StickyPlayer";
import { fetchTTH } from "../store/tthSlice";

const IndexScreen = ({ navigation }) => {
  const { width } = useScreenDimensions();

  const dispatch = useDispatch();

  const tth = useSelector((state) => state.tth.data);

  useEffect(() => {
    dispatch(fetchTTH(ONE_TOKEN));
  }, []);

  return (
    <SafeAreaView className="bg-main flex-1">
      {tth && (
        <View style={{ marginLeft: width * 0.1 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tth?.result.tracks.items.slice(0, 20)}
            keyExtractor={(item) => item.track.id}
            renderItem={({ item }) => <TodayHits item={item} />}
          />
        </View>
      )}
      <StickyPlayer />
    </SafeAreaView>
  );
};

export default IndexScreen;
