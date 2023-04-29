import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import store from "./src/store/index";
import IndexScreen from "./src/screens/IndexScreen";
import Player from "./src/components/Player/Player";
import LyricsScreen from "./src/screens/LyricsScreen";
import PlayListScreen from "./src/screens/PlayListScreen";
import StickyPlayer from "./src/components/Player/StickyPlayer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={IndexScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Lyrics"
            component={LyricsScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="PlayList"
            component={PlayListScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <StickyPlayer />
        <Player />
      </NavigationContainer>
    </Provider>
  );
}
