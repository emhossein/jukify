import { RAPIDAPI_KEY } from "@env";

import React, { useEffect } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "expo-image";

import useScreenDimensions from "../hooks/useDimension";
import { fetchArtistDetail } from "../store/artistDetailSlice";

import Typography from "../components/Typography";
import BackIcon from "../components/icons/BackIcon";
import MoreIcon from "../components/icons/MoreIcon";
import ArtistAlbum from "../components/Album/ArtistAlbum";
import ArtistTrack from "../components/Artist/ArtistTrack";
import ArtistRelated from "../components/Artist/ArtistRelated";

const ArtistDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { width, height } = useScreenDimensions();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.artistDetail);
  const { shown } = useSelector((state) => state.show);

  const artist = data?.data?.artist;

  useEffect(() => {
    dispatch(fetchArtistDetail({ id: id, apiKey: RAPIDAPI_KEY }));
  }, [id]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <>
      {status === "loading" && (
        <View className="items-center justify-center flex-1 bg-main">
          <Typography bold styles="text-white text-base">
            Loading...
          </Typography>
        </View>
      )}
      {status === "succeeded" && (
        <View className="relative flex-1 items-center bg-main">
          <Image
            source={artist?.visuals?.headerImage?.sources[0].url}
            style={{ width: "100%", height: height * 0.3516 }}
            className="rounded-b-[30px]"
            priority="high"
          />
          <View
            style={{ width: width * 0.9 }}
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
            <Typography
              size={20}
              bold
              styles="text-center text-white text-xl mt-3"
            >
              {artist?.profile?.name}
            </Typography>
            <Typography
              size={13}
              styles="text-center text-white text-[13px] mt-[6px]"
            >
              {artist?.discography?.albums?.totalCount} Album ,{" "}
              {artist?.discography?.singles?.totalCount} Track
            </Typography>
            <View style={{ width: width * 0.9, marginBottom: !shown ? 65 : 0 }}>
              <Typography bold styles="text-white text-base mt-[10px] mb-4">
                Albums
              </Typography>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={artist?.discography?.albums?.items}
                keyExtractor={(item) => item?.releases?.items[0]?.id}
                renderItem={({ item }) => <ArtistAlbum item={item} />}
              />
              <Typography bold styles="text-white text-base mt-[10px] my-4">
                Popular Tracks
              </Typography>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={artist?.discography?.topTracks?.items}
                keyExtractor={(item) => item?.uid}
                renderItem={({ item }) => (
                  <ArtistTrack item={item} name={artist?.profile?.name} />
                )}
              />
              <Typography bold styles="text-white text-base mt-[10px] my-4">
                Appears On
              </Typography>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={artist?.relatedContent?.appearsOn?.items}
                keyExtractor={(item) => item?.releases.items[0].id}
                renderItem={({ item }) => <ArtistAlbum item={item} />}
              />
              <Typography bold styles="text-white text-base mt-[10px] my-4">
                Related Artists
              </Typography>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={artist?.relatedContent?.relatedArtists?.items}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => <ArtistRelated item={item} />}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ArtistDetailScreen;
