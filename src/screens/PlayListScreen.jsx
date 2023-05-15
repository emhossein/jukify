import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { ONE_TOKEN } from "@env";

import Typography from "../components/Typography";
import MoreIcon from "../components/icons/MoreIcon";
import BackIcon from "../components/icons/BackIcon";
import useScreenDimensions from "../hooks/useDimension";
import PlayListTrack from "../components/Index/PlayLists/PlayListTrack";
import { fetchPlaylistDetails } from "../store/playlistDetailSlice";
import BigList from "react-native-big-list";
import { fetchDominantColors } from "../store/dominantColorSlice";
import { LinearGradient } from "expo-linear-gradient";

const PlayListScreen = ({ route, navigation }) => {
  const { uri } = route.params;
  const { width, height } = useScreenDimensions();

  const [headerHeight, setHeaderHeight] = useState(0);

  const dispatch = useDispatch();
  const { playlistDetails, status } = useSelector((state) => state.playlist);
  const { data: colors } = useSelector((state) => state.dominantColors);
  const { shown } = useSelector((state) => state.show);

  const item = playlistDetails?.result;

  const getItemLayout = (data, index) => {
    return { length: 60, offset: 50 * index, index };
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      if (!playlistDetails) {
        dispatch(
          fetchPlaylistDetails({
            oneKey: ONE_TOKEN,
            playlistId: uri.split(":")[2],
          })
        );
      }
    } else {
      dispatch(
        fetchPlaylistDetails({
          oneKey: ONE_TOKEN,
          playlistId: uri.split(":")[2],
        })
      );
    }
  }, []);

  useEffect(() => {
    dispatch(fetchDominantColors({ url: item?.images[0].url }));
  }, [item?.images[0].url]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleHeaderLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  return (
    <LinearGradient
      colors={[colors?.vibrant, "#1C1B1B"]}
      end={{ x: 0.5, y: 0.8 }}
      className="flex-1"
    >
      {status === "succeeded" && (
        <View
          style={{ marginBottom: !shown ? 65 : 0 }}
          className="relative flex-1 items-center"
        >
          <Image
            source={item?.images[0].url}
            style={{ width: "100%", height: height * 0.3516 }}
            className="rounded-b-[69px]"
            priority="high"
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
          {/* to get content height for headerHeight */}
          <View
            onLayout={handleHeaderLayout}
            className="absolute opacity-0 -z-10 w-full items-center"
          >
            <View className="items-center" style={{ width: width * 0.8 }}>
              <Typography bold styles="text-white text-xl mt-3">
                {item?.name}
              </Typography>
              <Typography styles="text-white-light text-[13px] mt-[6px]">
                {item?.tracks.items.length} Track
              </Typography>
              <Typography
                numberOfLines={3}
                styles="text-center text-white-light text-xs mt-[10px]"
              >
                {item?.description.replace(/<\/?[^>]+(>|$)/g, "")}
              </Typography>
            </View>
            <View style={{ width: width * 0.8 }}>
              <Typography bold styles="text-white text-base mt-3 mb-4">
                Songs
              </Typography>
            </View>
          </View>
          {/* /////////////////////////////////////// */}
          <BigList
            getItemLayout={getItemLayout}
            showsVerticalScrollIndicator={false}
            headerHeight={headerHeight}
            renderHeader={() => (
              <View className="w-full items-center">
                <View className="items-center" style={{ width: width * 0.8 }}>
                  <Typography bold styles="text-white text-xl mt-3">
                    {item?.name}
                  </Typography>
                  <Typography styles="text-white-light text-[13px] mt-[6px]">
                    {item?.tracks.items.length} Track
                  </Typography>
                  <Typography
                    numberOfLines={3}
                    styles="text-center text-white-light text-xs mt-[10px]"
                  >
                    {item?.description.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Typography>
                </View>
                <View style={{ width: width * 0.8 }}>
                  <Typography bold styles="text-white text-base mt-3 mb-4">
                    Songs
                  </Typography>
                </View>
              </View>
            )}
            data={item.tracks.items}
            keyExtractor={(item) => item.track.id}
            renderItem={({ item }) => <PlayListTrack item={item} />}
          />
        </View>
      )}
    </LinearGradient>
  );
};

export default PlayListScreen;

// width : 35.16%
