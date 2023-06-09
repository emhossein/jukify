import React, { useEffect } from "react";
import { View, SafeAreaView, TextInput, Platform } from "react-native";

import SearchIcon from "./../components/icons/SearchIcon";
import Typography from "./../components/Typography";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { useDispatch, useSelector } from "react-redux";
import { searchSpotify } from "../store/searchSlice";
import { RAPIDAPI_KEY } from "@env";
import BigList from "react-native-big-list";
import SearchIndex from "../components/Search/SearchIndex";
import useScreenDimensions from "../hooks/useDimension";

const SearchScreen = () => {
  const { search, searched, debouncedSearch } = useDebouncedSearch(500);
  const { height } = useScreenDimensions();
  const android = Platform.OS === "android";

  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.searchData);

  useEffect(() => {
    if (!data && searched !== "") {
      dispatch(searchSpotify({ apiKey: RAPIDAPI_KEY, term: searched }));
    }
  }, [searched]);

  return (
    <SafeAreaView
      style={{ paddingTop: android ? 25 : 0 }}
      className="flex-1 bg-main items-center"
    >
      <View className="flex-row items-center bg-accent w-[80%] mb-2 px-2 py-1 rounded-def">
        <SearchIcon iconColor="#A7A7A7" />
        <TextInput
          autoCapitalize="none"
          value={search}
          onChangeText={debouncedSearch}
          placeholder="What do you want to listen to?"
          placeholderTextColor="#A7A7A7"
          className="text-white ml-2 w-full"
        />
      </View>
      {status === "succeeded" ? (
        <BigList
          scrollEnabled={false}
          itemHeight={height}
          showsVerticalScrollIndicator={false}
          data={[data]}
          renderItem={({ item }) => <SearchIndex item={item} />}
        />
      ) : status === "loading" ? (
        <Typography bold styles="text-white">
          Loading...
        </Typography>
      ) : null}
    </SafeAreaView>
  );
};

export default SearchScreen;
