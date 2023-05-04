import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTTH } from "../store/tthSlice";
import { ONE_TOKEN } from "@env";
import useScreenDimensions from "../hooks/useDimension";
import Typography from "../components/Typography";
import TodayHits from "../components/Index/TodayHits";
import PlayListTrack from "../components/Index/PlayLists/PlayListTrack";
import BigList from "react-native-big-list";
import BackIcon from "../components/icons/BackIcon";
import MoreIcon from "../components/icons/MoreIcon";

const TTHScreen = ({ navigation }) => {
  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();
  const { data: tth, status: tthStatus } = useSelector((state) => state.tth);

  useEffect(() => {
    if (!tth) {
      dispatch(fetchTTH(ONE_TOKEN));
    }
  }, []);

  const getItemLayout = (data, index) => {
    return { length: 60, offset: 50 * index, index };
  };

  const handleBackButton = () => {
    navigation.push("Search");
    // navigation.goBack();
  };

  return (
    <View className="relative flex-1 items-center bg-main">
      <Image
        source={{ uri: tth?.result.images[0].url }}
        style={{ width: "100%", height: height * 0.3516 }}
        className="rounded-b-[69px]"
      />
      <View
        style={{ width: width * 0.8 }}
        className="absolute top-10 flex-row justify-between w-full mb-7"
      >
        <TouchableOpacity
          onPress={handleBackButton}
          className="w-6 h-6 rounded-full bg-accent  items-center justify-center"
        >
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreIcon />
          <MoreIcon />
          <MoreIcon />
        </TouchableOpacity>
      </View>
      <BigList
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        headerHeight={120}
        renderHeader={() => (
          <View className="w-full items-center">
            <View className="items-center" style={{ width: width * 0.8 }}>
              <Typography bold styles="text-white text-xl mt-3">
                {tth?.result.name}
              </Typography>
              <Typography
                numberOfLines={3}
                styles="text-center text-white-light text-xs mt-[10px]"
              >
                {tth?.result.description.replace(/<\/?[^>]+(>|$)/g, "")}
              </Typography>
            </View>
            <View style={{ width: width * 0.8 }}>
              <Typography bold styles="text-white text-base mt-3">
                Songs
              </Typography>
            </View>
          </View>
        )}
        data={tth?.result.tracks.items}
        keyExtractor={(item) => item.track.id}
        renderItem={({ item }) => <PlayListTrack item={item} />}
      />
    </View>
  );
};

export default TTHScreen;
