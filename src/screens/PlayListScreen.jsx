import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { ONE_TOKEN } from "@env";

import Typography from "../components/Typography";
import MoreIcon from "../components/icons/MoreIcon";
import BackIcon from "../components/icons/BackIcon";
import useScreenDimensions from "../hooks/useDimension";
import PlayListTrack from "../components/PlayListTrack";
import { fetchPlaylistDetails } from "../store/playlistDetailSlice";

const PlayListScreen = ({ route, navigation }) => {
  const { uri } = route.params;
  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();
  const [prevData, setPrevData] = useState(null);
  const { playlistDetails, status } = useSelector((state) => state.playlist);

  const item = playlistDetails?.result;

  useEffect(() => {
    if (!playlistDetails) {
      dispatch(
        fetchPlaylistDetails({
          oneKey: ONE_TOKEN,
          playlistId: uri.split(":")[2],
        })
      );
      setPrevData(playlistDetails);
    }
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: width * 0.8 }} className="items-center">
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
              {item?.tracks.items.map((item) => (
                <PlayListTrack item={item} key={item.uri} />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default PlayListScreen;

// width : 35.16%
