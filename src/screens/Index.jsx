import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IndexScreen from "./IndexScreen";
import LyricsScreen from "./LyricsScreen";
import PlayListScreen from "./PlayListScreen";
import SearchScreen from "./SearchScreen";
import TTHScreen from "./TTHScreen";
import AlbumScreen from "./AlbumScreen";
import ArtistDetailScreen from "./ArtistDetailScreen";
import AuthScreen from "./AuthScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Outlines, Sizing } from "../styles";
import HomeIcon from "../components/icons/HomeIcon";
import SearchIcon from "../components/icons/SearchIcon";
import UserScreen from "./UserScreen";
import UserIcon from "../components/icons/UserIcon";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

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
      <HomeStack.Screen
        name="PlayList"
        component={PlayListScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TTHScreen"
        component={TTHScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Album"
        component={AlbumScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Artist"
        component={ArtistDetailScreen}
        options={{
          headerShown: false,
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
    </SearchStack.Navigator>
  );
}

export function AuthScreenStack() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}

export function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          width: Sizing.screenBase.width,
          left: "5%",
          bottom: "2%",
          backgroundColor: Colors.background.accent,
          borderTopColor: Colors.background.accent,
          borderRadius: Outlines.borderRadius.base,
          height: 53,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              iconColor={
                focused ? Colors.iconColors.active : Colors.iconColors.inactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchBarScreen}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <SearchIcon
              iconColor={
                focused ? Colors.iconColors.active : Colors.iconColors.inactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserScreen}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <UserIcon
              iconColor={
                focused ? Colors.iconColors.active : Colors.iconColors.inactive
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
