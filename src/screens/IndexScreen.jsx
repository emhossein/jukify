import React, { useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { StackActions } from "@react-navigation/native";

import { fetchTTH } from "../store/tthSlice";
import Typography from "../components/Typography";
import PlayList from "../components/Index/PlayLists/PlayList";
import { fetchIndexPlayList } from "../store/indexPlaylistSlice";

import { ONE_TOKEN, RAPIDAPI_KEY } from "@env";
import TodayHitsButton from "../components/Index/TodayHitsButton";
import { fetchNewAlbums } from "../store/newAlbumsSlice";
import NewAlbum from "../components/Album/Album";
import { fetchTopArtists } from "../store/topArtistsSlice";
import Artist from "../components/Artist/Artist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteUser, setToken, setUser } from "../store/userSlice";
import { Colors, Sizing, Utils } from "../styles";
import stateOfDay from "../utils/stateOfDay";

const IndexScreen = ({ navigation }) => {
  const android = Platform.OS === "android";

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      dispatch(deleteUser());
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        dispatch(setUser(jwt_decode(value)));
        dispatch(setToken(value));
      } else {
        navigation.dispatch(StackActions.replace("Auth"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useDispatch();
  const { data: tth, status: tthStatus } = useSelector((state) => state.tth);
  const { data: newAlbums, status: newAlbumsStatus } = useSelector(
    (state) => state.newAlbums
  );
  const { data: artists, status: artistsStatus } = useSelector(
    (state) => state.topArtists
  );
  const { data, status } = useSelector((state) => state.indexPlaylist);
  const { shown } = useSelector((state) => state.show);
  const { name } = useSelector((state) => state.user);

  const statuses = [newAlbumsStatus, artistsStatus, status];
  const allSucceeded = statuses.every((status) => status === "succeeded");

  const tthButtonCover = tth?.result?.tracks?.items
    ?.slice(0, 3)
    .map((item) => item.track.album.images[0].url);

  useEffect(() => {
    getData();

    dispatch(fetchTTH(ONE_TOKEN));
    dispatch(fetchNewAlbums({ apiKey: RAPIDAPI_KEY }));
    dispatch(fetchIndexPlayList({ apiKey: RAPIDAPI_KEY }));
    dispatch(fetchTopArtists({ apiKey: RAPIDAPI_KEY }));
  }, []);

  // removeValue();

  useFocusEffect(
    useCallback(() => {
      if (
        name !== null &&
        new Date().getTime() > new Date(name?.exp * 1000).getTime()
      ) {
        removeValue();
        navigation.dispatch(StackActions.replace("Auth"));
      }
    }, [])
  );

  return (
    <SafeAreaView
      style={{ paddingTop: android ? 25 : 0 }}
      className="bg-main flex-1"
    >
      <View style={style.header}>
        <Typography size={19} style={style.headerGreet}>
          {stateOfDay()} {name?.name}!
        </Typography>
        <Image
          source={require("../../assets/Spotify-logo-dark.png")}
          style={style.headerLogo}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tthStatus === "succeeded" && (
          <View className="ml-[5%] my-6 ">
            <TodayHitsButton images={tthButtonCover} />
          </View>
        )}

        {allSucceeded && (
          <View className="ml-[5%]" style={{ marginBottom: !shown ? 65 : 0 }}>
            <Typography bold styles="text-white text-base -mb-4">
              Recommended for you
            </Typography>

            <Typography styles="text-white text-base mb-3 mt-5">
              New Albums
            </Typography>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={newAlbums?.content?.items}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => <NewAlbum item={item} />}
            />

            <PlayList title="Fresh New Musics" data={data.freshNewMusic} />
            <PlayList title="Sing Along" data={data.singAlong} />
            <PlayList title="Happy" data={data.happy} />
            <Typography styles="text-white text-base mb-3 mt-5">
              Popular Artists
            </Typography>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={artists?.artists}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => <Artist item={item} />}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexScreen;

const style = StyleSheet.create({
  header: {
    width: Sizing.screenBase.width,
    alignSelf: "center",
    ...Utils.flexRow,
    justifyContent: "space-between",
  },
  headerLogo: {
    ...Sizing.logoSize,
  },
  headerGreet: {
    color: Colors.neutral.white,
  },
});
