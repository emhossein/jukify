import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import store from "./src/store/index";
import Player from "./src/components/Player/Player";
import HomeIcon from "./src/components/icons/HomeIcon";
import SearchIcon from "./src/components/icons/SearchIcon";
import StickyPlayer from "./src/components/Player/StickyPlayer";
import { HomeScreen, SearchBarScreen } from "./src/screens/Index";
import { LogBox } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#333333",
                borderTopColor: "#333333",
                height: 53,
              },
            }}
          >
            <Tab.Screen
              name="HomeTab"
              component={HomeScreen}
              options={{
                tabBarLabelStyle: { display: "none" },
                tabBarIcon: ({ focused, color, size }) => (
                  <HomeIcon iconColor={focused ? "#1ED760" : "#D3D3D3"} />
                ),
              }}
            />
            <Tab.Screen
              name="SearchTab"
              component={SearchBarScreen}
              options={{
                tabBarLabelStyle: { display: "none" },
                tabBarIcon: ({ focused, color, size }) => (
                  <SearchIcon iconColor={focused ? "#1ED760" : "#D3D3D3"} />
                ),
              }}
            />
          </Tab.Navigator>
          <StickyPlayer />
          <Player />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
