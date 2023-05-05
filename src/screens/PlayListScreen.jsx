import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, TouchableOpacity } from "react-native";

import { ONE_TOKEN } from "@env";

import Typography from "../components/Typography";
import MoreIcon from "../components/icons/MoreIcon";
import BackIcon from "../components/icons/BackIcon";
import useScreenDimensions from "../hooks/useDimension";
import PlayListTrack from "../components/Index/PlayLists/PlayListTrack";
import { fetchPlaylistDetails } from "../store/playlistDetailSlice";
import BigList from "react-native-big-list";

const PlayListScreen = ({ route, navigation }) => {
  const { uri } = route.params;
  const { width, height } = useScreenDimensions();

  const [headerHeight, setHeaderHeight] = useState(0);

  const dispatch = useDispatch();
  const { playlistDetails, status } = useSelector((state) => state.playlist);

  const item = playlistDetails?.result;

  const getItemLayout = (data, index) => {
    return { length: 60, offset: 50 * index, index };
  };

  useEffect(() => {
    // if (!playlistDetails) {
    dispatch(
      fetchPlaylistDetails({
        oneKey: ONE_TOKEN,
        playlistId: uri.split(":")[2],
      })
    );
    // }
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
    // navigation.push("Search");
  };

  console.log(headerHeight);

  const handleHeaderLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  return (
    <View className="bg-main flex-1">
      {status === "succeeded" && (
        <View className="relative flex-1 items-center bg-main">
          <Image
            source={{ uri: item?.images[0].url }}
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
    </View>
  );
};

export default PlayListScreen;

// width : 35.16%
