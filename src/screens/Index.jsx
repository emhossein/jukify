import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IndexScreen from "./IndexScreen";
import LyricsScreen from "./LyricsScreen";
import PlayListScreen from "./PlayListScreen";
import SearchScreen from "./SearchScreen";
import TTHScreen from "./TTHScreen";
import AlbumScreen from "./AlbumScreen";

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

export function HomeScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={IndexScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Lyrics"
        component={LyricsScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </HomeStack.Navigator>
  );
}

export function SearchBarScreen() {
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="PlayList"
        component={PlayListScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="TTHScreen"
        component={TTHScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="Album"
        component={AlbumScreen}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}
