import { ONE_TOKEN } from "@env";

import { Image } from "expo-image";
import React, { useEffect } from "react";
import BigList from "react-native-big-list";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Typography from "../components/Typography";
import BackIcon from "../components/icons/BackIcon";
import MoreIcon from "../components/icons/MoreIcon";
import AlbumTrack from "../components/Album/AlbumTrack";
import useScreenDimensions from "../hooks/useDimension";
import { fetchAlbumDetails } from "../store/albumDetailsSlice";
import { fetchDominantColors } from "../store/dominantColorSlice";

const AlbumScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { width, height } = useScreenDimensions();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.albumDetails);
  const { data: colors } = useSelector((state) => state.dominantColors);
  const { shown } = useSelector((state) => state.show);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      if (!data) {
        dispatch(fetchAlbumDetails({ id, oneKey: ONE_TOKEN }));
      }
    } else {
      dispatch(fetchAlbumDetails({ id, oneKey: ONE_TOKEN }));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchDominantColors({ url: data?.result.images[0].url }));
  }, [data?.result.images[0].url]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const getItemLayout = (data, index) => {
    return { length: 60, offset: 50 * index, index };
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
            source={data?.result.images[0].url}
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
            headerHeight={140}
            renderHeader={() => (
              <View className="w-full items-center">
                <View className="items-center" style={{ width: width * 0.8 }}>
                  <Typography bold styles="text-white text-xl mt-3">
                    {data?.result.name}
                  </Typography>

                  <Typography
                    numberOfLines={2}
                    styles="text-center text-white-light text-xs mt-[10px]"
                  >
                    {data?.result.artists[0].name}
                  </Typography>
                  <Typography styles="text-white-light text-[10px] mt-[6px]">
                    {data?.result.tracks.items.length} Track
                  </Typography>
                </View>
                <View style={{ width: width * 0.8 }}>
                  <Typography bold styles="text-white text-base mt-3 mb-4">
                    Songs
                  </Typography>
                </View>
              </View>
            )}
            data={data?.result.tracks.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AlbumTrack image={data?.result.images[0].url} item={item} />
            )}
          />
        </View>
      )}
    </LinearGradient>
  );
};

export default AlbumScreen;
